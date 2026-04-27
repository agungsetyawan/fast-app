"use client";

import { useRef, useState } from "react";
import {
  useUpdateUserAvatar,
  useUpdateUserName,
  useUser,
} from "@/hooks/useUser";
import { UserSchema } from "@/lib/validations/user";

interface EditProfileModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export default function EditProfileModal({ ref }: EditProfileModalProps) {
  const { data: user } = useUser();
  const { mutate: updateName, isPending: isNamePending } = useUpdateUserName();
  const { mutate: updateAvatar, isPending: isAvatarPending } =
    useUpdateUserAvatar();

  const [nameError, setNameError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isPending = isNamePending || isAvatarPending;

  const handleSubmit = (formData: FormData) => {
    const name = (formData.get("name") as string).trim();
    const avatar = formData.get("avatar") as File;

    const hasNameChange = name && name !== user?.name;
    const hasAvatarChange = avatar && avatar.size > 0;

    if (!hasNameChange && !hasAvatarChange) {
      ref.current?.close();
      return;
    }

    if (hasAvatarChange && !navigator.onLine) {
      setAvatarError("Upload avatar membutuhkan koneksi internet.");
      return;
    }

    if (hasNameChange) {
      updateName(name, {
        onSuccess: () => {
          if (!hasAvatarChange) {
            formRef.current?.reset();
            ref.current?.close();
          }
        },
      });

      formRef.current?.reset();
      ref.current?.close();
    }

    if (hasAvatarChange) {
      updateAvatar(avatar, {
        onSuccess: () => {
          formRef.current?.reset();
          ref.current?.close();
        },
      });
    }
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Profile</h3>

        <form ref={formRef} action={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                name="name"
                placeholder="Name"
                defaultValue={user?.name ?? ""}
                className={`input input-bordered w-full ${nameError ? "input-error" : ""}`}
                onBlur={handleNameBlur}
              />
              {nameError && <p className="label text-error">{nameError}</p>}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick your photo</legend>
              <input
                name="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={`file-input input-bordered w-full ${avatarError ? "file-input-error" : ""}`}
                onChange={handleFileChange}
              />
              <div className="label">Max size 1MB</div>
              {avatarError && <p className="label text-error">{avatarError}</p>}
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
