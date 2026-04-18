"use client";

import { CloudSync, LogOut, UserPen } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { AppIcon } from "@/components/app-icon";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import EditProfileModal from "../components/edit-profile-modal";

export default function CardProfile({ user }: any) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="card bg-base-100 w-full sm:w-6/12 shadow-sm">
      <figure className="h-32">
        {/** biome-ignore lint/performance/noImgElement: <> */}
        <img
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="mx-auto w-32 h-32 relative -mt-16">
        {!user?.profile_photo_url ? (
          <div className="avatar avatar-placeholder">
            <div className="bg-base-300 text-base-content w-32 rounded-full">
              {user?.name ? (
                <span className="text-5xl">{user?.initialName}</span>
              ) : (
                <AppIcon width={32} height={32} />
              )}
            </div>
          </div>
        ) : (
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring-2 ring-offset-2">
              <Image src={user?.profile_photo_url} alt="Profile" />
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
      <div className="stats">
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
      <div className="divider"></div>
      <div className="flex gap-4 justify-center mb-4 px-4">
        <div className="tooltip" data-tip="Edit Profile">
          <button
            type="button"
            className="btn btn-outline btn-primary"
            onClick={() => modalRef.current?.showModal()}
          >
            <UserPen />
          </button>
          <EditProfileModal ref={modalRef} initialData={user} />
        </div>
        <button type="button" className="btn btn-primary ">
          <CloudSync />
          Sync
        </button>
        <div className="flex flex-1 gap-4 justify-end">
          <ThemeSwitcher />
          <LogoutButton className="btn-soft btn-error">
            <LogOut /> Logout
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}
