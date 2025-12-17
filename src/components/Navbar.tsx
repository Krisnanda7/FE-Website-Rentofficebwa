import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    alert("Berhasil logout!");
    window.location.href = "/";
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".hamburger-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMenuOpen]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white relative z-30">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between w-full max-w-[1130px] py-3 md:py-[22px] mx-auto px-4 md:px-0 gap-4 md:gap-10">
        {/* Logo */}
        <Link to={`/`} className="z-30">
          <img
            src="/assets/images/icons/logo 1.png"
            alt="logo"
            className="w-24 sm:w-28 md:w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-[50px]">
            <li className="hover:text-[#447cff]">
              <Link to={`/`}>Browse</Link>
            </li>
            <li className="hover:text-[#447cff]">
              <a href="#citybrowse">Categories</a>
            </li>
            <li className="hover:text-[#447cff]">
              <Link to={`/check-booking`}>Check Booking</Link>
            </li>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#0A2463] hover:bg-red-600 px-4 py-2 rounded-xl font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <li className="bg-[#0A2463] text-white px-5 py-2 rounded-xl font-semibold">
                  <a href="/login">Login</a>
                </li>
                <li className="border border-[#000929] px-5 py-2 rounded-xl font-semibold">
                  <a href="/Register">Register</a>
                </li>
              </>
            )}

            <a
              href="#"
              className="flex items-center gap-2 rounded-full border border-[#000929] py-2 px-5"
            >
              <img src="/assets/images/icons/call.svg" className="w-5 h-5" />
              <span className="font-semibold">Contact Us</span>
            </a>
          </ul>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 lg:hidden">
          <a className="w-9 h-9 flex items-center justify-center rounded-full border border-[#000929]">
            <img src="/assets/images/icons/call.svg" className="w-4 h-4" />
          </a>

          <button
            className="hamburger-btn w-10 h-10 flex flex-col items-center justify-center rounded-lg border border-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "bg-black/50 opacity-100" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Mobile Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <p className="text-lg font-semibold">Menu</p>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Menu Content */}
          <div className="px-5 py-4 overflow-y-auto h-[calc(100%-70px)]">
            <ul className="space-y-2">
              {["Browse", "Popular", "Categories", "Check Booking"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Check Booking" ? "/check-booking" : "/"}
                      className="block py-3 px-4 rounded-xl hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="mt-8 border-t pt-6">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#0A2463] text-white py-3 rounded-xl font-semibold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block w-full text-center bg-[#0A2463] text-white py-3 rounded-xl font-semibold mb-3"
                  >
                    Login
                  </a>
                  <a
                    href="/Register"
                    className="block w-full text-center border border-gray-300 py-3 rounded-xl font-semibold"
                  >
                    Register
                  </a>
                </>
              )}
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#fffff] !border-2 !border-[#0A2463]">
                  <img
                    src="/assets/images/icons/call.svg"
                    className="w-6 h-6 invert"
                  />
                </div>
                <div>
                  <p className="font-semibold">Contact Us</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              © 2024 OfficeSpace
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
