import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLadlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLadlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className=" flex flex-col gap-2 mt-5">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full border rounded-lg p-3"
            name="message"
            id="message"
            value={message}
            placeholder="Enter your message here"
            rows={2}
            onChange={handleInput}
          ></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} 
          className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95">
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
