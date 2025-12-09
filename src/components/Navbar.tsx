import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true kalau token ada
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    alert("Berhasil logout!");
    window.location.href = "/";
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-fade-in-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white relative">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between w-full max-w-[1130px] py-4 md:py-[22px] mx-auto px-4 md:px-0">
        {/* Logo */}
        <Link to={`/`} className="z-50">
          <img
            src="/assets/images/icons/logo 1.png"
            alt="logo"
            className="w-32 md:w-auto"
          />
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden lg:flex items-center gap-[50px] w-fit animate-fade-in">
          <ul className="flex items-center gap-[50px] w-fit">
            <li className="hover:text-[#447cff]">
              <Link to={`/`}>Browse</Link>
            </li>
            <li className="hover:text-[#447cff]">
              <a href="">Popular</a>
            </li>
            <li className="hover:text-[#447cff]">
              <a href="">Categories</a>
            </li>
            <li className="hover:text-[#447cff]">
              <a href="">Events</a>
            </li>
            <li className="hover:text-[#447cff]">
              <Link to={`/`}>My Booking</Link>
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#0A2463] hover:bg-red-700 px-4 py-2 rounded-xl font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <li className="bg-[#0A2463] text-white px-4 py-2 rounded-xl font-semibold animate-bounce">
                  <a href="/login">Login</a>
                </li>
                <li className="border border-[#000929] px-4 py-2 rounded-xl font-semibold animate-bounce">
                  <a href="/Register">Register</a>
                </li>
              </>
            )}
          </ul>

          {/* Contact Us Button - Desktop */}
          <a
            href="#"
            className="flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5"
          >
            <img
              src="/assets/images/icons/call.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <span className="font-semibold">Contact Us</span>
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Contact Us Button - Mobile Only (Icon only) */}
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#000929]"
          >
            <img
              src="/assets/images/icons/call.svg"
              className="w-5 h-5"
              alt="icon"
            />
          </a>

          {/* Hamburger Menu Button */}
          <button
            className="hamburger-btn flex flex-col items-center justify-center w-10 h-10 rounded-lg border border-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 my-1.5 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Mobile Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="px-6 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to={`/`}
                  className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-lg hover:text-[#447cff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse
                </Link>
              </li>
              <li>
                <a
                  href=""
                  className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-lg hover:text-[#447cff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-lg hover:text-[#447cff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-lg hover:text-[#447cff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </a>
              </li>
              <li>
                <Link
                  to={`/`}
                  className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-lg hover:text-[#447cff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Booking
                </Link>
              </li>
            </ul>

            {/* Auth Buttons - Mobile */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#0A2463] hover:bg-red-700 px-4 py-3 rounded-xl font-semibold text-white mb-4"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block w-full text-center bg-[#0A2463] text-white px-4 py-3 rounded-xl font-semibold mb-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/Register"
                    className="block w-full text-center border border-[#000929] px-4 py-3 rounded-xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </a>
                </>
              )}
            </div>

            {/* Contact Info - Mobile */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0A2463]">
                  <img
                    src="/assets/images/icons/call.svg"
                    className="w-6 h-6 filter invert"
                    alt="icon"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contact Us</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>© 2024 OfficeSpace. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
