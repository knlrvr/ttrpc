'use client'

import { useClerk } from "@clerk/clerk-react";

import { BsExclamationCircle } from "react-icons/bs";

export default function ProfilePage() {

  const { user } = useClerk();

    return (
      <div className="flex flex-col mt-1 pb-2 h-full justify-center items-center">
        
        {/* <div className="flex items-center gap-4">
          <Image 
            src={user?.imageUrl ?? ''}
            alt={`${user?.firstName}'s pfp`}
            width={1000}
            height={1000}
            className="h-14 w-14 rounded-full"
          />
          <span className="font-light text-lg">{user?.fullName}</span>
        </div> */}

        <div className="flex flex-col items-center gap-2">
          <BsExclamationCircle className=" text-red-500 text-lg" />
          <p className="text-neutral-500 font-mono text-xs text-center">
            This page is still under development, but will display an overview of your profile, including campaigns and characters!
            Please check back later for this update. 
          </p>
        </div>
      </div>
    );
  }