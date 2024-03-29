'use client'

import { Card } from "@/app/components/ui/card";
import { useClerk } from "@clerk/clerk-react";
import Link from "next/link";

import { 
  PiSquaresFour,
  PiTent,
  PiUsers,
  PiUser,
  PiArrowLineLeft,
  PiGear
} from "react-icons/pi";

export default function Dashboard() {

    const { user } = useClerk();

    return (
      <div className="flex flex-col">
        <div className="pb-12">
          <p className="text-2xl sm:text-3xl md:text-4xl">
            Hello, <br /> 
            <span className="text-4xl sm:text-5xl md:text-6xl">
              {user?.fullName}
            </span>
          </p>
          <p className="text-neutral-500 font-light tracking-wider text-lg sm:text-xl my-2">
            Welcome back to TTRPCompanion!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="md:col-span-2 p-4 py-8 flex justify-between items-center">
            <Link href="/dashboard/campaigns" className="w-full h-full flex items-center justify-between">
              <div className="flex flex-col font-light">
                <p className="text-2xl mb-2">Campaigns</p>
                <p className="text-neutral-500 text-sm tracking-wide w-3/4">View your active campaigns and create or join new campaigns.</p>
              </div>
              <PiTent className="text-3xl" />
            </Link>
          </Card>

          <Card className="md:col-span-2 p-4 py-8 flex justify-between items-center">
            <Link href="/dashboard/characters" className="w-full h-full flex items-center justify-between">
              <div className="flex flex-col font-light">
                <p className="text-2xl mb-2">Characters</p>
                <p className="text-neutral-500 text-sm tracking-wide w-3/4">View your active & inactive characters or create a new character.</p>
              </div>
              <PiUsers className="text-3xl" />
            </Link>
          </Card>

        </div>
      </div>
    );
  }