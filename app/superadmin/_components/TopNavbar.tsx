"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ADMIN_PROFILE_UPDATED_EVENT,
  defaultAdminProfile,
  initialsFromName,
  readAdminProfile,
} from "./adminProfileStorage";

type NotificationItem = {
  id: number;
  title: string;
  time: string;
  unread: boolean;
};

export function TopNavbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(defaultAdminProfile);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: "New creator application submitted", time: "2m ago", unread: true },
    { id: 2, title: "3 posts waiting for approval", time: "12m ago", unread: true },
    { id: 3, title: "Monthly revenue report is ready", time: "1h ago", unread: false },
  ]);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );

  useEffect(() => {
    function syncAdminProfile() {
      setAdminProfile(readAdminProfile());
    }

    syncAdminProfile();
    window.addEventListener("storage", syncAdminProfile);
    window.addEventListener(ADMIN_PROFILE_UPDATED_EVENT, syncAdminProfile);

    return () => {
      window.removeEventListener("storage", syncAdminProfile);
      window.removeEventListener(ADMIN_PROFILE_UPDATED_EVENT, syncAdminProfile);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function openNotifications() {
    setIsNotificationsOpen((prev) => !prev);
    setNotifications((prev) =>
      prev.map((item) => (item.unread ? { ...item, unread: false } : item)),
    );
  }

  return (
    <header className="sticky top-0 z-20 mb-8 border-b border-black/5 bg-[#efefef]/95 px-4 py-3 backdrop-blur sm:px-5 md:py-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-xl border border-black/10 bg-white/70 p-2.5 text-slate-600 transition hover:bg-white md:hidden"
          aria-label="Open sidebar menu"
        >
          <MenuIcon />
        </button>

        <div className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-full bg-white/50 px-4 text-slate-400 md:max-w-[52vw]">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search campaigns, creators..."
            className="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3.5">
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={openNotifications}
              className="relative rounded-full p-3.5 text-slate-500 transition hover:bg-black/5 hover:text-slate-700"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
              aria-haspopup="menu"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-14 z-40 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <button
                    type="button"
                    onClick={() => setNotifications([])}
                    className="text-xs font-medium text-slate-500 hover:text-slate-700"
                  >
                    Clear all
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="rounded-xl bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
                    No new notifications
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {notifications.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-black/5 bg-slate-50 px-3 py-2.5"
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-1 h-2 w-2 rounded-full ${item.unread ? "bg-[#e76e59]" : "bg-slate-300"}`}
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-700">{item.title}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{item.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="h-10 w-px bg-black/10" />

          <div className="relative" ref={profileRef}>
            <Link
              href="/superadmin/profile"
              className="flex items-center gap-2 rounded-2xl border border-transparent px-2 py-1.5 transition hover:border-black/10 hover:bg-white/50"
            >
              <div className="hidden text-right sm:block">
                <p className="text-[15px] font-semibold text-slate-800">{adminProfile.name}</p>
                <p className="text-sm text-slate-500">Admin</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5071ff] to-[#5ec7ff] text-sm font-semibold text-white">
                {adminProfile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={adminProfile.avatarUrl}
                    alt={adminProfile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initialsFromName(adminProfile.name)
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function iconWrapper(path: ReactNode) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {path}
    </svg>
  );
}

function MenuIcon() {
  return iconWrapper(
    <>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function SearchIcon() {
  return iconWrapper(
    <>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function BellIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5a4 4 0 0 0-4 4v3.2L6.7 14a1 1 0 0 0 .8 1.6h9a1 1 0 0 0 .8-1.6L16 12.2V9a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
