import React from "react";
import { useSelector } from "react-redux";



export default function Home() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500 m-10 bg-green-400 border">
        Hello world!
      </h1>
      <h3>Welcome {currentUser?.username} </h3>
      
     
    </div>
  );
}
