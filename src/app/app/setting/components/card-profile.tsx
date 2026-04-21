"use client";

import { LogOut, RefreshCw, RefreshCwOff, UserPen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/app-icon";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useSync } from "@/hooks/use-sync";
import { useUser } from "@/hooks/use-user";
import EditProfileModal from "./edit-profile-modal";

export default function CardProfile() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const { isOnline } = useOnlineStatus();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: user, isLoading } = useUser();
  const { sync, isSyncing } = useSync();

  if (!mounted || isLoading) {
    return (
      <div className="card bg-base-100 w-full sm:w-6/12 shadow-sm">
        <div className="skeleton h-32 w-full" />
        <div className="mx-auto w-32 h-32 relative -mt-16">
          <div className="skeleton w-32 h-32 rounded-full" />
        </div>
        <div className="flex flex-col items-center mt-2 gap-1">
          <div className="skeleton h-6 w-30" />
          <div className="skeleton h-6 w-40" />
          <div className="flex gap-4 justify-center items-center">
            <div className="skeleton h-6 w-20" />
            <div className="skeleton h-6 w-30" />
          </div>
        </div>
        <div className="mt-2">
          <div className="skeleton h-29 w-full" />
        </div>
        <div className="divider my-0" />
        <div className="skeleton h-18 w-full" />
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-full sm:w-6/12 shadow-sm">
      <figure className="h-32">
        <Image
          width={500}
          height={128}
          src="/background.jpg"
          alt="background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </figure>
      <div className="mx-auto w-32 h-32 relative -mt-16">
        {!user?.avatar_url ? (
          <div className="avatar avatar-placeholder">
            <div className="bg-base-300 text-base-content w-32 rounded-full">
              {user?.name ? (
                <span className="text-5xl">{user?.initialName}</span>
              ) : (
                <AppIcon width={64} height={64} />
              )}
            </div>
          </div>
        ) : (
          <div className="avatar">
            <div className="bg-base-300 ring-primary ring-offset-base-100 w-32 rounded-full ring-2 ring-offset-2">
              <Image
                src={user?.avatar_url}
                width={128}
                height={128}
                alt="avatar"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mt-2 gap-1">
        {user?.name && <h2 className="font-semibold">{user?.name}</h2>}
        <p className="text-gray-500">{user?.email}</p>
        <div className="flex gap-4 justify-center items-center">
          {user?.branch_name && (
            <div className="badge badge-primary">{user?.branch_name}</div>
          )}
          {user?.device_id && (
            <div className="badge badge-outline">{user?.device_id}</div>
          )}
        </div>
      </div>
      <div className="stats bg-base-200 mt-2">
        <div className="stat place-items-center">
          <div className="stat-title">Users</div>
          <div className="stat-value text-primary">40</div>
          <div className="stat-desc text-primary">↗︎ 20 (50%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Simulastion</div>
          <div className="stat-value text-secondary">1,200</div>
          <div className="stat-desc text-secondary">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="divider my-0" />
      <div className="flex gap-4 justify-center p-4 bg-base-300">
        <div className="[@media(hover:hover)]:tooltip" data-tip="Edit Profile">
          <button
            type="button"
            className="btn btn-outline btn-primary"
            onClick={() => modalRef.current?.showModal()}
          >
            <UserPen />
          </button>
          <EditProfileModal ref={modalRef} />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={sync}
          disabled={!isOnline || isSyncing}
        >
          {!isOnline ? (
            <RefreshCwOff />
          ) : (
            <RefreshCw className={isSyncing ? "animate-spin" : ""} />
          )}
          Sync
        </button>
        <div className="flex flex-1 gap-4 justify-end">
          <ThemeSwitcher />
          <LogoutButton className="btn-soft btn-error">
            <LogOut />
            Logout
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}
