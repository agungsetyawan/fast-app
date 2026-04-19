"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/profile";
import { UserSchema } from "@/lib/validations/user";

interface InitialData {
  name?: string;
  avatar_url?: string;
}

interface EditProfileModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  initialData: InitialData;
}

export default function EditProfileModal({
  ref,
  initialData,
}: EditProfileModalProps) {
  const [state, formAction, isPending] = useActionState(updateUser, null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
      ref.current?.close();
    }
    if (state?.errors) {
      toast.error(state.message);
    }
  }, [state, ref]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = UserSchema.pick({ name: true }).safeParse({
      name: e.target.value,
    });
    if (!result.success) {
      setNameError(result.error.flatten().fieldErrors.name?.[0] ?? null);
      return;
    }
    setNameError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = UserSchema.pick({ avatar: true }).safeParse({
      avatar: file,
    });
    if (!result.success) {
      setAvatarError(result.error.flatten().fieldErrors.avatar?.[0] ?? null);
      e.target.value = "";
      return;
    }

    setAvatarError(null);
  };

  // Gabungkan error dari server dan client, prioritaskan client error
  const nameErrorMessage = nameError ?? state?.errors?.name?.[0] ?? null;
  const avatarErrorMessage = avatarError ?? state?.errors?.avatar?.[0] ?? null;

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Profile</h3>

        <form ref={formRef} action={formAction} className="space-y-4 mt-4">
          <div className="form-control">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                name="name"
                placeholder="Name"
                defaultValue={state?.enteredValues?.name ?? initialData?.name}
                className={`input input-bordered w-full ${nameErrorMessage ? "input-error" : ""}`}
                onBlur={handleNameChange}
              />
              {nameErrorMessage && (
                <p className="label text-error">{nameErrorMessage}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick your photo</legend>
              <input
                name="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={`file-input input-bordered w-full ${
                  avatarErrorMessage ? "file-input-error" : ""
                }`}
                onChange={handleFileChange}
              />
              <label className="label" htmlFor="avatar">
                Max size 1MB
              </label>
              {avatarErrorMessage && (
                <p className="label text-error">{avatarErrorMessage}</p>
              )}
            </fieldset>
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending || !!avatarError || !!nameError}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        {/* biome-ignore lint/a11y/useButtonType: <> */}
        <button>close</button>
      </form>
    </dialog>
  );
}
