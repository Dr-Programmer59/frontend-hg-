"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Button from "./button";
import Modal from "./modal";
import CustomLoginPage from "./login";
import MultiStepSignup from "./signup";
import ForgotPasswordPage from "./forgot-password";
import OTPVerification from "./otp-verification";
import { useSelector, UseSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("otp-verification");
  // @ts-ignore
  const { user } = useSelector(store => store.userReducer);
  const openModal = (
    type: "login" | "signup" | "otp-verification" | "forgot-password"
  ) => {
    setModalContent(type);
    setShowModal(true);
  };

  return (
    <div>
      <nav className="bg-transparent py-2 text-rubik">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* "/images/logo.png" */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                <Image
                  src={"/images/logo.png"}
                  alt={"Logo"}
                  className="h-[70px] md:h-[60px] xs:h-[50px] w-full"
                />
              </Link>
            </div>

            {/* Menu toggle button (visible on small screens) */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="text-white hover:text-primary focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Links (visible on larger screens) */}
            <div className="hidden sm:flex space-x-12 text-white ">
              {user?.role=="streamer"?
               
              <Link
                href="/dashboard"
                className="hover:text-primary hover:cursor-pointer font-[200] text-[20px] hover:text-[22px] duration-100"
              >
                Dashboard
              </Link>
              :""
              
              }
              <Link
                href="/channels"
                className="hover:text-primary hover:cursor-pointer font-[200] text-[20px] hover:text-[22px] duration-100"
              >
                Channels
              </Link>
              <Link
                href="/streams"
                className="hover:text-primary hover:cursor-pointer font-[200] text-[20px] hover:text-[22px] duration-100"
              >
                Streams
              </Link>
              <Link
                href="/why-us"
                className="hover:text-primary hover:cursor-pointer font-[200] text-[20px] hover:text-[22px] duration-100"
              >
                Why Us?
              </Link>
              <Link
                href="/plans"
                className="hover:text-primary hover:cursor-pointer font-[200] text-[20px] hover:text-[22px] duration-100"
              >
                Plans
              </Link>
            </div>

            {/* Buttons (visible on larger screens) */}
            {
              user?user.name
              :
              <div className="hidden sm:flex space-x-4">
              <button onClick={() => openModal("login")}>
                {
                  // @ts-ignore
                <Button name="Log In" />

                }
              </button>
              <button onClick={() => openModal("signup")}>
                { // @ts-ignore
                  <Button
                  name="Sign Up"
                  customClass="bg-white/10 text-white hover:bg-white/20 border-[#FCAD06] flex flex-row px-10 py-3 rounded-md justify-center items-center text-[#fff]"
                />}
              </button>
            </div>
            }
            
          </div>
        </div>

        {/* Mobile menu (visible on small screens) */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/channels"
                className="block  hover:text-primary hover:cursor-pointer transition duration-300 px-3 py-2"
              >
                Channels
              </Link>
              <Link
                href="/streams"
                className="block  hover:text-primary hover:cursor-pointer transition duration-300 px-3 py-2"
              >
                Streams
              </Link>
              <Link
                href="/why-us"
                className="block  hover:text-primary hover:cursor-pointer transition duration-300 px-3 py-2"
              >
                Why Us?
              </Link>
              <Link
                href="/plans"
                className="block  hover:text-primary hover:cursor-pointer transition duration-300 px-3 py-2"
              >
                Plans
              </Link>
            </div>

            <div className="px-2 pb-3 space-y-1">
              <button onClick={() => openModal("login")}>
                { // @ts-ignore
                  <Button
                  name="Log In"
                  customClass="block w-full bg-primary text-white px-3 py-2 rounded-md hover:cursor-pointer transition duration-300 "
                />}
              </button>
              <button onClick={() => openModal("signup")}>
               {
                 // @ts-ignore
                <Button
                  name="Sign Up"
                  customClass="block w-full bg-primary text-white px-3 py-2 rounded-md hover:cursor-pointer transition duration-300 bg-white/10 text-white hover:bg-white/20 border-[#FCAD06] flex flex-row px-10 py-3 rounded-md justify-center items-center"
                />}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal logic */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {modalContent === "login" && (
            <CustomLoginPage setModalContent={setModalContent} />
          )}
          {modalContent === "signup" && <MultiStepSignup />}
          {modalContent === "otp-verification" && (
            <OTPVerification setModalContent={setModalContent} />
          )}
          {modalContent === "forgot-password" && (
            <ForgotPasswordPage setModalContent={setModalContent} />
          )}
        </Modal>
      )}
    </div>
  );
}
