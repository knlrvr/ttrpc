import ToggleTheme from "./utils/toggleTheme";
import Link from "next/link";

import { BsArrowRight } from "react-icons/bs";

import { SignInButton } from "@clerk/clerk-react";

import { FcHighPriority } from "react-icons/fc";

export default function SignInError() {
    return (
        <div className="bg-neutral-100 dark:bg-[#111] dark:text-neutral-100 p-4">
        <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-40px)]">
          
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-light tracking-wider">TTRPCompanion</h1>
            <ToggleTheme />
          </div>

          <div className="flex flex-col items-center space-y-8 max-w-xl mx-auto">


            <p className="text-xl md:text-3xl text-center font-light mt-24">
              <span className="font-semibold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-red-700 dark:from-blue-400 dark:to-red-600">TTRPCompanion &mdash;</span>
              <br /> Connecting players to their characters like never before.
            </p>

            <p className="text-center text-lg md:text-xl text-neutral-500">
                <span className="text-5xl flex justify-center"> <FcHighPriority /></span> <br/>
                Uh oh! It looks like you aren&apos;t signed in! <br/> Please sign in to access TTRPCompanion.
            </p>
          </div> 

          <div className="flex justify-center mb-24">
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <p className="cursor-pointer border border-[#111] dark:border-white px-4 py-1 rounded-full hover:border-blue-400 hover:text-blue-400 dark:hover:border-blue-500 duration-300 text-sm md:text-base"
              > Sign In Now </p>
            </SignInButton>
          </div>

          <div className="mt-24 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-green-500"></div>
              
              <span className="hidden md:block text-xs text-neutral-500">All Systems Operational.</span>
              <span className="block md:hidden text-xs text-neutral-500">Online</span>
            </div>

            <div className="flex items-center text-xs text-neutral-500">
              <p>&copy; TTRPCompanion. All Rights Reserved.</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
  