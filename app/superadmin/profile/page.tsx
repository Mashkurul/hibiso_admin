"use client";

import { useState } from "react";
import {
  defaultAdminProfile,
  readAdminProfile,
  writeAdminProfile,
} from "../_components/adminProfileStorage";

export default function AdminProfilePage() {
  const [initialProfile] = useState(() => readAdminProfile());
  const [name, setName] = useState(initialProfile.name);
  const [role, setRole] = useState(initialProfile.role);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [bio, setBio] = useState(initialProfile.bio);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialProfile.avatarUrl);
  const [notice, setNotice] = useState("");

  function persistProfile(nextAvatarUrl: string | null = avatarUrl) {
    writeAdminProfile({
      name,
      role,
      email,
      phone,
      bio,
      avatarUrl: nextAvatarUrl,
    });
  }

  function onPickAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const nextAvatarUrl = typeof reader.result === "string" ? reader.result : null;
      setAvatarUrl(nextAvatarUrl);
      writeAdminProfile({
        name,
        role,
        email,
        phone,
        bio,
        avatarUrl: nextAvatarUrl,
      });
      setNotice("");
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    persistProfile();
    setNotice("Profile updated successfully.");
  }

  return (
    <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
        <h1 className="text-[30px] font-semibold tracking-tight text-slate-800">Admin Profile</h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Manage your profile details, identity photo, and account contact information.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
          <h2 className="text-lg font-semibold text-slate-800">Profile Picture</h2>
          <div className="mt-4 flex flex-col items-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#f8f9fb]">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Admin avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-semibold text-slate-500">SJ</span>
              )}
            </div>
            <label className="mt-4 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
              Upload New Photo
              <input type="file" accept="image/*" onChange={onPickAvatar} className="hidden" />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
          <h2 className="text-lg font-semibold text-slate-800">Profile Details</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-sm text-slate-600">
              Full Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
            </label>
            <label className="text-sm text-slate-600">
              Role
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
            </label>
            <label className="text-sm text-slate-600">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
            </label>
            <label className="text-sm text-slate-600">
              Phone
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
            </label>
          </div>

          <label className="mt-3 block text-sm text-slate-600">
            Bio
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
            />
          </label>

          {notice && (
            <p className="mt-3 rounded-xl border border-[#d9f1e2] bg-[#effcf3] px-3 py-2 text-xs font-semibold text-[#2d8f4d]">
              {notice}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={saveProfile}
              className="rounded-xl bg-[linear-gradient(135deg,#2f7ef7,#5b9bff)] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(47,126,247,0.28)] transition hover:brightness-105"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setName(defaultAdminProfile.name);
                setRole(defaultAdminProfile.role);
                setEmail(defaultAdminProfile.email);
                setPhone(defaultAdminProfile.phone);
                setBio(defaultAdminProfile.bio);
                setAvatarUrl(null);
                writeAdminProfile(defaultAdminProfile);
                setNotice("Profile reset to defaults.");
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
