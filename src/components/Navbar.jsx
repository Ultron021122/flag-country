import { NavLink } from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

export function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 sm:items-stretch sm:justify-start">
                <NavLink to="/" className="flex flex-shrink-0 items-center">
                    <h2 className='px-3 py-2 text-xl text-bold text-white'>
                        Where in the world?
                    </h2>
                </NavLink>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <p className='px-3 py-2 text-bold text-white'>
                    Dark Mode
                </p>
              </div>
            </div>
          </div>
        </>
    </Disclosure>
  )
}
