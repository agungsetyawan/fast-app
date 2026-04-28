import { toast } from "sonner";
import { updateUserName } from "@/lib/actions/client/profile";
import { queryClient } from "@/lib/query/client";
import { mutationKeys, queryKeys } from "@/lib/query/keys";

let isMutationDefaultsRegistered = false;

type MutationDefaultRegistration = {
  register: () => void;
};

const mutationDefaultRegistrations: MutationDefaultRegistration[] = [
  // Tambahkan default mutation baru di sini agar offline mutation bisa dipulihkan setelah app restart.
  {
    register: () => {
      queryClient.setMutationDefaults(mutationKeys.updateUser, {
        mutationFn: updateUserName,
        networkMode: "always",
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: queryKeys.user });
          toast.success("Nama berhasil diperbarui");
        },
        onError: (err: Error) => {
          if (err.message === "offline") return;
          toast.error(err.message);
        },
      });
    },
  },
];

export function registerMutationDefaults() {
  if (isMutationDefaultsRegistered) return;

  for (const { register } of mutationDefaultRegistrations) {
    register();
  }

  isMutationDefaultsRegistered = true;
}
