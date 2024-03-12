'use client' 

import Link from "next/link";

import { SignInButton, useClerk, useSession } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import ToggleTheme from "./components/utils/toggleTheme";

import { BsArrowRight } from "react-icons/bs";

export default function Home() {

  const { session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-neutral-100 dark:bg-[#111] dark:text-neutral-100 p-4">
        <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-40px)]">
          
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-light tracking-wider">TTRPCompanion</h1>
            <ToggleTheme />
          </div>

          <div className="flex flex-col items-center space-y-8 max-w-xl mx-auto">

            <Link href="https://www.github.com/knlrvr/ttrpcompanion" target="_blank"
              className="group w-fit border border-neutral-500 px-4 py-1 rounded-full flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-neutral-500">View Latest Release Notes</span>
              <BsArrowRight className="group-hover:translate-x-1 duration-300"/>
            </Link>

            <p className="text-xl md:text-3xl text-center font-light">
              <span className="font-semibold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-red-700 dark:from-blue-400 dark:to-red-600">TTRPCompanion &mdash;</span>
              <br /> Connecting players to their characters like never before.
            </p>

            <p className="text-center text-base md:text-lg text-neutral-500">
              TTRPCompanion is an all-in-one tracker for your tabletop adventures. Keep tabs on stats specific to the campaign, party, individual characters, and even the players themselves! 
            </p>
          </div> 

          <div className="flex justify-between md:justify-evenly">
            {session && (
              <button onClick={() => router.push('/dashboard')}>
                <p className="cursor-pointer border border-[#111] dark:border-white px-4 py-1 rounded-full hover:border-blue-400 hover:text-blue-400 dark:hover:border-blue-500 duration-300 text-sm md:text-base"
                > Go To Dashboard </p>
              </button>
            )}
            {!session && (
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <p className="cursor-pointer border border-[#111] dark:border-white px-4 py-1 rounded-full hover:border-blue-400 hover:text-blue-400 dark:hover:border-blue-500 duration-300 text-sm md:text-base"
              > Get Started &mdash; It&apos;s Free </p>
            </SignInButton>
            )}
            <Link href="https://www.github.com/knlrvr/ttrpcompanion" target="_blank"
              className="border border-neutral-500 text-neutral-500 px-4 py-1 rounded-full hover:border-red-400 hover:text-red-400 duration-300 text-sm md:text-base">
              Learn More
            </Link>
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
