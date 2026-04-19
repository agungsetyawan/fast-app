import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getUser,
  updateUserAvatar,
  updateUserName,
} from "@/lib/actions/profile";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}

export function useUpdateUserName() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"], // key ini yang di-persist untuk offline queue
    mutationFn: updateUserName,
    onMutate: async (name) => {
      // Optimistic update — UI langsung update tanpa tunggu server
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const prev = queryClient.getQueryData(["user"]);
      // biome-ignore lint/suspicious/noExplicitAny: <>
      queryClient.setQueryData(["user"], (old: any) => ({ ...old, name }));
      return { prev };
    },
    onError: (err, _, context) => {
      // Rollback kalau gagal
      queryClient.setQueryData(["user"], context?.prev);
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Nama berhasil diperbarui");
    },
  });
}

export function useUpdateUserAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    // Tidak pakai mutationKey — tidak di-queue saat offline
    mutationFn: updateUserAvatar,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Avatar berhasil diperbarui");
    },
  });
}
