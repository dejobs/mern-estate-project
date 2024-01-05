import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 
        uppercase hover:opacity-95 disabled:opacity-80 "
        >update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-point">Delete</span>
        <span className="text-red-700 cursor-point">Sign out</span>
      </div>
    </div>
  );
}
