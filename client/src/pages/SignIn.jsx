import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import {signInstart, signInSuccess, signInFailure} from "../redux/user/userSlice"

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInstart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (err) {
      dispatch(signInFailure(err.message))
    } 
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          className="border p-3 rounded-lg focus:outline-none indent-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="border p-3 rounded-lg focus:outline-none indent-3"
          onChange={handleChange}
        />
        <button disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg
         uppercase hover:opacity-95 disabled:opacity-80"
        >
         {loading ? "loading" :  "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up"  >
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

