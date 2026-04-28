import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getUser,
  updateUserAvatar,
  updateUserName,
} from "@/lib/actions/client/profile";
import { mutationKeys, queryKeys } from "@/lib/query/keys";
import type { User } from "@/lib/types/user";

export function useUser() {
  return useQuery<User>({
    queryKey: queryKeys.user,
    queryFn: getUser,
  });
}

export function useUpdateUserName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.updateUser,
    mutationFn: updateUserName,
    networkMode: "always",
    onMutate: async (name) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user });
      const prev = queryClient.getQueryData<User>(queryKeys.user);
      queryClient.setQueryData<User>(queryKeys.user, (old) =>
        old ? { ...old, name } : old,
      );
      return { prev };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.user, context?.prev);
      toast.error(err.message);
    },
    onSuccess: async (data) => {
      if (data.queued) {
        toast.info("Tersimpan, akan disinkronkan saat online");
        return;
      }
      await queryClient.invalidateQueries({ queryKey: queryKeys.user });
      toast.success("Nama berhasil diperbarui");
    },
  });
}

export function useUpdateUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAvatar,
    onError: (err) => toast.error(err.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user });
      toast.success("Avatar berhasil diperbarui");
    },
  });
}
