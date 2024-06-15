import {FaSearch} from "react-icons/fa";
import {NavLink, useNavigate, Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CiLight} from "react-icons/ci";
import {MdDarkMode} from "react-icons/md";
import {Bars3BottomRightIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {Navbar} from "flowbite-react";

function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const path = useLocation().pathname;

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
      <Navbar fluid className="bg-transparent ">
        <Navbar.Brand>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500 dark:text-white">Fortitude</span>
              <span className="text-slate-700 dark:text-white">Estate</span>
            </h1>
          </Link>
        </Navbar.Brand>
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
          <button className="flex items-center w-7 h-7 rounded-full ml-auto ">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <button
          className="self-center inline md:hidden mr-3 ml-auto"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            <CiLight className="text-lg text-white" />
          ) : (
            <MdDarkMode className="text-base" />
          )}
        </button>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <button
            className="self-center hidden md:block "
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? (
              <CiLight className="text-xl text-white" />
            ) : (
              <MdDarkMode className="text-xl" />
            )}
          </button>
          {currentUser && (
            <>
              <Navbar.Link active={path === "/"} className="">
                <Link to="/" className=" text-slate-700 dark:text-white  ">
                  <span className="text-base">Home</span>
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/about"}>
                <Link
                  to="/about"
                  className=" text-slate-700 dark:text-white align-middle"
                >
                  <span className="text-base">About</span>
                </Link>
              </Navbar.Link>
            </>
          )}

          {currentUser ? (
            <Navbar.Link active={path === "/profile"}>
              <Link to="/profile" className=" text-slate-700 dark:text-white ">
                <span>
                  <img
                    className="rounded-full h-7 w-7 object-cover object-center"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </span>
              </Link>
            </Navbar.Link>
          ) : (
            <Navbar.Link active={path === "/sign-in"}>
              <Link to="/sign-in" className=" text-slate-700 dark:text-white ">
                <span className="text-base"> Sign In</span>
              </Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;

/**
 import {FaSearch} from "react-icons/fa";
import {NavLink, useNavigate, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CiLight} from "react-icons/ci";
import {MdDarkMode} from "react-icons/md";
import {Bars3BottomRightIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {Navbar} from "flowbite-react";

function Header() {
  const {currentUser} = useSelector((state) => state.user);
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
      <Navbar className="bg-transparent ">
        <Navbar.Brand>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500 dark:text-white">Fortitude</span>
              <span className="text-slate-700 dark:text-white">Estate</span>
            </h1>
          </Link>

        </Navbar.Brand>
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

        <div
          className="self-center  "
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            <CiLight className="text-lg text-white" />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {currentUser && (
            <>
              <Navbar.Link>
                <Link to="/" className=" text-slate-700 dark:text-white  ">
                  Home
                </Link>
              </Navbar.Link>
              <Navbar.Link>
                <Link to="/about" className=" text-slate-700 dark:text-white">
                  About
                </Link>
              </Navbar.Link>

              {currentUser ? (
                <Navbar.Link>
                  <Link
                    to="/profile"
                    className=" text-slate-700 dark:text-white "
                  >
                    <img
                      className="rounded-full h-7 w-7 object-cover object-center"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  </Link>
                </Navbar.Link>
              ) : (
                <Navbar.Link>
                  <Link
                    to="/sign-in"
                    className=" text-slate-700 dark:text-white "
                  >
                    Sign In
                  </Link>
                </Navbar.Link>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;

 */

/**
 import {FaSearch} from "react-icons/fa";
import {NavLink, useNavigate, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CiLight} from "react-icons/ci";
import {MdDarkMode} from "react-icons/md";
import {Bars3BottomRightIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {Navbar} from "flowbite-react";

function Header() {
  const {currentUser} = useSelector((state) => state.user);
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
      <Navbar className="bg-transparent ">
        <Navbar.Brand>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500 dark:text-white">Fortitude</span>
              <span className="text-slate-700 dark:text-white">Estate</span>
            </h1>
          </Link>
        </Navbar.Brand>
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

        <div
          className="self-center  "
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            <CiLight className="text-lg text-white" />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {currentUser && (
            <>
              <Navbar.Link>
                <Link to="/" className=" text-slate-700 dark:text-white  ">
                  Home
                </Link>
              </Navbar.Link>
              <Navbar.Link>
                <Link to="/about" className=" text-slate-700 dark:text-white">
                  About
                </Link>
              </Navbar.Link>

              {currentUser ? (
                <Navbar.Link>
                  <Link
                    to="/profile"
                    className=" text-slate-700 dark:text-white "
                  >
                    <img
                      className="rounded-full h-7 w-7 object-cover object-center"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  </Link>
                </Navbar.Link>
              ) : (
                <Navbar.Link>
                  <Link
                    to="/sign-in"
                    className=" text-slate-700 dark:text-white "
                  >
                    Sign In
                  </Link>
                </Navbar.Link>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
 */
