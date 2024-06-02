'use client'

import React, { useState } from "react";
import Link from 'next/link'

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { 
    PiSquaresFour,
    PiTent,
    PiUsers,
    PiUser,
    PiArrowLineLeft
} from "react-icons/pi";

import { BsChevronBarLeft } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi"; 

import ToggleTheme from "./utils/toggleTheme";
import { UserButton } from "@clerk/clerk-react";

const headerItems = [
    { label: 'Dashboard', icon: <PiSquaresFour />, href: '/dashboard' },
    { label: 'Campaigns', icon: <PiTent />, href: '/dashboard/campaigns' },
    { label: 'Characters', icon: <PiUsers />, href: '/dashboard/characters' },
    // { label: 'Profile', icon: <PiUser />, href: '/dashboard/profile' },
]

// type Campaign = RouterOutputs["campaign"]["getAll"][0];


const Header = () => {

    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
      const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

    let path = usePathname();
    if (path?.includes("/")) {
      path = '/';
    }

  return (
    <>
        <div className="relative z-[999]">

            {/* put in div?? */}
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="fixed my-[1.465rem] ml-4 inline-flex items-center text-sm text-[#222] dark:text-white rounded-lg sm:hidden focus:outline-none z-[999]"
                onClick={toggleSidebar}
            >
                <span className="sr-only">Open sidebar</span>
                <HiOutlineMenuAlt2 
                    className="text-neutral-200 text-lg" 
                />
            </button>
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 w-full sm:w-64 h-screen transition-transform ${
                isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
                }`}
                aria-label="Sidebar"
            >
                {/* <button
                    className="sm:hidden absolute top-2 right-2 p-2 text-[#333] dark:text-neutral-200 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
                    onClick={handleCloseSidebar}
                >
                    <span className="sr-only">Close sidebar</span>
                    <BsChevronBarLeft 
                        className="" />
                </button> */}

                {/* Sidebar content here */}
                <nav className="mt-[4.05rem] hide-scroll sm:border-r border-neutral-500 flex h-full flex-col pt-4 p-4 bg-neutral-100 dark:bg-[#111] dark:text-neutral-100 w-full sm:w-64">
                    <ul className="flex flex-col space-y-4 mb-8">
                        {headerItems.map((item) => (
                            <li key={item.href} className="group">
                                <Link href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center group-hover:bg-blue-500 p-2 rounded-lg">
                                    {/* {path === item.href && (
                                        <motion.span layoutId="highlight"
                                            className=""
                                        />
                                    )} */}
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-lg ml-4 font-light">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="h-auto w-full grow"></div>

                    <div className="mt-4 flex justify-between items-end">
                        <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <p className="text-xs font-mono text-neutral-500">v.3.0.0</p>
                        </div>
                        <ToggleTheme />
                    </div>

                </nav>
            </aside>
        </div>
    </>
  )
}

export default Header