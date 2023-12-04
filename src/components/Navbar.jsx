import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Disclosure } from '@headlessui/react';

const initialDarkToggle = document.documentElement.className.includes("dark");

export const Navbar = () => {
  const [darkToggle, setDarkToggle] = useState(initialDarkToggle);

  useEffect(() => {
    if (darkToggle) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkToggle]);

  return (
    <Disclosure as="nav" className="border border-gray-200 dark:bg-gray-700 dark:border-none">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            </div>
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <NavLink to="/" className="flex flex-shrink-0 items-center">
                <h2 className='px-3 py-2 text-2xl font-bold text-black dark:text-white'>
                  Where in the world?
                </h2>
              </NavLink>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button onClick={() => setDarkToggle(!darkToggle)} className="text-black dark:text-white inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  Dark Mode
              </button>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  )
}
