"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/profile";

export default function EditProfileModal({ ref, initialData }: any) {
  const [state, formAction, isPending] = useActionState(updateUser, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
      ref.current?.close();
    }
    if (state?.error) {
      toast.error(state?.message);
    }
  }, [state, ref]);

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Profile</h3>

        <form action={formAction} className="space-y-4 mt-4">
          <div className="form-control">
            <fieldset className="fieldset">
              <input
                name="name"
                placeholder="Name"
                defaultValue={state?.enteredValues?.name ?? initialData?.name}
                className={`input input-bordered w-full ${state?.errors?.name ? "input-error" : ""}`}
              />
              {state?.errors?.name && (
                <p className="label text-error">{state.errors.name[0]}</p>
              )}
            </fieldset>
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        {/** biome-ignore lint/a11y/useButtonType: <> */}
        <button>close</button>
      </form>
    </dialog>
  );
}
