import "../index.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  showListingStart,
  showListingSucsess,
  showListingFailure,
  deleteListingStart,
  deleteListingSucsess,
  deleteListingFailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link, NavLink } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { TiUserDeleteOutline } from "react-icons/ti";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userUpdate, setUserUpdate] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (err) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUserUpdate(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      console.log("user deleted");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleUserSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListngs = async () => {
    try {
      dispatch(showListingStart());
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(showListingFailure());
        return;
      }
      dispatch(showListingSucsess());
      setUserListings(data);
    } catch (error) {
      dispatch(showListingFailure());
    }
  };

  const handleListingsDelete = async (listingId) => {
    try {
      dispatch(deleteListingStart())
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteListingFailure())
        return;
      }
      dispatch(deleteListingSucsess())
      setUserListings((prevState) =>
        prevState.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
      dispatch(deleteListingFailure())
    }
  };



  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7 dark:text-white">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center dark:border dark:border-slate-500"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload (image must be less than 2mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Image successfully upload!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={handleChange}
          className="border rounded-lg p-3 indent-3 outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 
        uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed dark:text-white dark:bg-sky-500"
        >
          {loading ? "loading..." : "update"}
        </button>
        <NavLink
          to={"/create-listing"}
          className="bg-green-700 p-3 rounded-lg
         text-white text-center uppercase hover:opacity-95"
        >
          create listing
        </NavLink>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="flex items-center gap-1 font-semibold text-red-700 cursor-pointer dark:text-white"
        >
          Delete <TiUserDeleteOutline className="text-base" />
        </span>
        <span
          onClick={handleUserSignout}
          className="flex items-center gap-1 font-semibold text-red-700 cursor-pointer dark:text-white"
        >
          Sign out <GoSignOut className="text-xs" />
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {userUpdate && "User is updated successfully!"}
      </p>
      <button
        disabled={loading}
        onClick={handleShowListngs}
        className="text-green-700 dark:font-semibold dark:text-green-400 w-full"
      >
        {loading ? "Loading Listings..." : "Show Listings"}
      </button>
      <p className="text-red-700 mt-5 ">{error && "Error showing listings"}</p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-center text-2xl dark:text-slate-200">Your Listings</h1>
          {userListings.map((listing, index) => (
            <div
              key={listing._id}
              className="flex flex-row gap-3 flex-wrap justify-between items-center  p-3 border rounded-lg dark:bg-gray-300"
            >
              <NavLink to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </NavLink>
              <NavLink
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold truncate hover:underline"
              >
                <span>{listing.name}</span>
              </NavLink>
              <div className="flex flex-col gap-2">
                <button disabled={loading}
                  onClick={() => handleListingsDelete(listing._id)}
                  className="text-red-700"
                >
                  Delete
                </button>
                <NavLink to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">Edit</button>
                </NavLink>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


