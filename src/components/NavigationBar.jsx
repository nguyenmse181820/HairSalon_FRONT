import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/coiffure-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeadphonesSimple,
  faMagnifyingGlass,
  faUser,
  faCalendar,
  faBell,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../css/NavigationBar.css";
import { UserContext } from "../main.jsx";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { user } = useContext(UserContext);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <div className="sticky-container fixed w-full z-10 bg-white">
        <div className="top-header-row flex items-center px-4 pt-3">
          <div className="left-container w-1/2 flex space-x-5 font-montserrat text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon
                className="cursor-pointer hover:scale-110 transition-transform duration-200 pr-1"
                icon={faHeadphonesSimple}
              />
              <a className="hidden lg:inline-block" href="/contact">
                {" "}
                Contact us
              </a>
            </div>
          </div>
          <div className="right-container w-1/2 flex justify-end space-x-5 font-montserrat text-sm">
            <div className="flex items-center">
              <div className="flex items-center">
                <Link
                  to="/account"
                >
                  <FontAwesomeIcon className="cursor-pointer hover:scale-110 transition-transform duration-200" icon={faUser} />
                  <span className="hidden lg:inline-block pl-1">My Account</span>
                </Link>
              </div>

            </div>
            {user?.isLoggedIn && (
              <div className="flex items-center">
                <Link
                  to="/appointment">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-110 transition-transform duration-200 pr-1"
                    icon={faCalendar}
                  />
                  <span className="hidden lg:inline-block">
                    My Appointment
                  </span>
                </Link>
              </div>)}
          </div>
        </div>
        <div className="middle-header-row flex items-center justify-center">
          <Link className="w-1/4 lg:w-1/5" to="/">
            <img src={Logo} alt="Logo Coiffure" />
          </Link>
        </div>

        <div className="menubar">
          <ul className="hidden lg:flex justify-center items-center space-x-[7rem] list-none pt-2">
            {[
              { name: 'BOOKING', link: '/booking/service' },
              { name: 'STYLIST', link: '/blog-stylist' },
              { name: 'REWARD', link: '/reward' },
              { name: 'CONTACT', link: '/contact' },
              { name: 'ABOUT US', link: '/about-us' }
            ].map((menuItem, i) => (
              <li
                key={i}
                className="nav-link font-normal text-sm cursor-pointer"
              >
                <a href={menuItem.link}>{menuItem.name}</a>
              </li>
            ))}
          </ul>

          <div className="flex justify-end pr-5 text-2xl">
            <FontAwesomeIcon
              className="lg:hidden cursor-pointer hover:rotate-90 transition-transform duration-500 ease-in-out"
              icon={faBars}
              onClick={toggleMenu}
            />
          </div>

          <div
            className={`fixed inset-0 bg-white p-8 transform ${menuOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-500 ease-in-out`}
          >
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                className="cursor-pointer hover:rotate-90 transition-transform duration-500 ease-in-out"
                onClick={toggleMenu}
              />
            </div>
            <div>
              <div className="flex items-center justify-center">
                <img className="w-1/2 mb-12" src={Logo} alt="Logo Coiffure" />
              </div>
            </div>
            <ul className="flex flex-col items-center space-y-8 text-xl">
              {[
                { name: 'BOOKING', link: '/booking/service' },
                { name: 'STYLIST', link: '/blog-stylist' },
                { name: 'REWARD', link: '/reward' },
                { name: 'CONTACT', link: '/contact' },
                { name: 'ABOUT US', link: '/about-us' }
              ].map((menuItem, i) => (
                <li
                  key={i}
                  className="nav-link font-normal text-sm cursor-pointer"
                >
                  <a href={menuItem.link}>{menuItem.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <hr className="border border-gray-300" />
    </header>
  );
};

export default NavigationBar;
