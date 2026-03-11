export const ADMIN_PROFILE_STORAGE_KEY = "hibiso-admin-profile";
export const ADMIN_PROFILE_UPDATED_EVENT = "hibiso-admin-profile-updated";

export type AdminProfileState = {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string | null;
};

export const defaultAdminProfile: AdminProfileState = {
  name: "Sara Jean",
  role: "Super Admin",
  email: "sara.jean@hibiadmin.com",
  phone: "+880 17 0000 0000",
  bio: "Leads admin operations, moderation policy, and growth analytics.",
  avatarUrl: null,
};

export function readAdminProfile(): AdminProfileState {
  if (typeof window === "undefined") {
    return defaultAdminProfile;
  }

  const raw = window.localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
  if (!raw) {
    return defaultAdminProfile;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AdminProfileState>;
    return {
      ...defaultAdminProfile,
      ...parsed,
    };
  } catch {
    return defaultAdminProfile;
  }
}

export function writeAdminProfile(profile: AdminProfileState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(ADMIN_PROFILE_UPDATED_EVENT));
}

export function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "SA";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}
