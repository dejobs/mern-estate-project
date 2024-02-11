import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md dark:bg-slate-700 ">
      <div className="flex justify-between items-center mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500 dark:text-white">Fortitude</span>
            <span className="text-slate-700 dark:text-white">Estate</span>
          </h1>
        </NavLink>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center "
        >
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent indent-2 rounded-md focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <nav className="MOBILE-MENU ">
          <section className="MOBILE-MENU sm:hidden">
            <div
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
            {isNavOpen ? <XMarkIcon className="size-7 dark:text-slate-400" /> : <Bars3BottomRightIcon className="size-7 dark:text-slate-400" />}
            </div>
            <div className={` ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>

              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col gap-2  justify-between min-h-[200px]">
                <NavLink to="/">
                  <li className="text-slate-700 dark:text-white border-b border-gray-400  uppercase ">
                    Home
                  </li>
                </NavLink>
                <NavLink to="/about">
                  <li className=" text-slate-700 dark:text-white  border-b border-gray-400 uppercase ">
                    About
                  </li>
                </NavLink>
                <NavLink to="/profile">
                  {currentUser ? (
                    <img
                      className="rounded-full h-7 w-7 object-cover border-b border-gray-400  "
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  ) : (
                    <li className="text-slate-700 dark:text-white  border-b border-gray-400  uppercase  ">
                      Sign in
                    </li>
                  )}
                </NavLink>
              </ul>
            </div>
          </section>
        </nav>
        <ul className="DESKTOP-MENU  gap-4 hidden sm:flex">
          <li
            className="self-center"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? (
              <CiLight className="text-lg text-white" />
            ) : (
              <MdDarkMode className="text-lg" />
            )}
          </li>

          <NavLink to="/">
            <li className="hidden sm:inline text-slate-700 dark:text-white hover:underline ">
              Home
            </li>
          </NavLink>
          <NavLink to="/about">
            <li className="hidden sm:inline text-slate-700 dark:text-white hover:underline ">
              About
            </li>
          </NavLink>
          <NavLink to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover hidden sm:inline"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline hidden sm:inline ">
                Sign in
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Header;

// npm install @heroicons/react for
