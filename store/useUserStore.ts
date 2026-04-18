import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),
  setSession: (session) => set({ session, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () => set({ user: null, session: null, isLoading: false }),
}));

export default useUserStore;
