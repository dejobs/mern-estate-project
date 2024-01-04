import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
 
  

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
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return
      }
      setError(null)
      navigate("/sign-in")
    } catch (err) {
      setError(err.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
    
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          className="border p-3 rounded-lg focus:outline-none indent-3"
          onChange={handleChange}
        />
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
         {loading ? "loading" :  "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      <div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
