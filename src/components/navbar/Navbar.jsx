// import React from 'react'

import { Fragment, useContext,useState } from "react";
import myContext from "../../context/data/myContext";
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { Dialog, Transition } from '@headlessui/react'
import {useSelector} from 'react-redux'

const Navbar = () => {

  const [open, setOpen] = useState(false)

  const context = useContext(myContext);
  const {mode, toggleMode} = context;

  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user.user.email)
  const logout = () =>{
    localStorage.clear('user');
    window.location.href = "/";
  }
  const cartItems = useSelector((state)=>state.cart)
  return (
    <div className="bg-white sticky top-0 z-50" >
      {/* Mobile view  */}
       <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  {user ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div> : ""}

                  {user?.user?.email == import.meta.env.VITE_ADMIN_USER_EMAIL ?<div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin
                    </Link>
                  </div> : ""}

                  <div className="flow-root">
                   {user ? <a 
                      onClick={logout}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a> : <a 
                      onClick={()=>window.location.href="/login"}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Login
                    </a>}
                  </div>
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="data:image/jpeg;base64,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"
                        alt = "profile pic" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINoTD4G-n1SfeLoq9zy5I00T6qTuGacEiWg&usqp=CAU"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Desktop  */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1
                      className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      DG-Shop
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-gray-700 "
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    All Products
                  </Link>
                  {user ? <Link
                    to={"/order"}
                    className="text-sm font-medium text-gray-700 "
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Order
                  </Link> : ""}
                  {user?.user?.email === import.meta.env.VITE_ADMIN_USER_EMAIL ?<Link
                    to={"/dashboard"}
                    className="text-sm font-medium text-gray-700 "
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Admin
                  </Link> : ""}
 
                  {user ? <a
                    onClick={logout}
                    className="text-sm font-medium text-gray-700 cursor-pointer  "
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Logout
                  </a> : 
                  <a
                  onClick={()=>window.location.href="/login"}
                  className="text-sm font-medium text-gray-700 cursor-pointer  "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Login
                </a> }
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINoTD4G-n1SfeLoq9zy5I00T6qTuGacEiWg&usqp=CAU"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/jpeg;base64,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"
                      alt="Dan_Abromov"
                    />
                  </a>
                </div>

                {/* dark/light mode button */}
                <div className="flex lg:ml-6">
                  <button className="" onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === "light" ? (
                      <FiSun className="" size={30} />
                    ) : mode==="dark" ? (
                      <BsFillCloudSunFill size={30} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span
                      className="ml-2 text-sm font-medium text-gray-700 group-"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {cartItems.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
