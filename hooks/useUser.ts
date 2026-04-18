"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";

export const useUser = () => {
  const store = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    user: isHydrated ? store.user : null,
    session: isHydrated ? store.session : null,
    isLoading: isHydrated ? store.isLoading : true,
    setUser: store.setUser,
    clearAuth: store.clearAuth,
    isHydrated,
  };
};
