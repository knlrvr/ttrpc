'use client'

import Link from "next/link";

import CharList from "@/app/components/charList";
import { BsArrowLeft } from "react-icons/bs";

import PartyTotals from "@/app/components/partytotals";
import CampTotals from "@/app/components/camptotals";

import DeleteCamp from "@/app/components/deleteCamp";
import ShowCamp from "@/app/components/showCamp";


import LeaveCamp from "@/app/components/leaveCamp";

import MembersList from "@/app/components/membersList";
import { CreateQuest } from "@/app/components/createQuest";
import QuestList from "@/app/components/questList";

export default function CampaignDetailsPage({
    params
} : {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    return (
      <div>
        <Link href='/dashboard/campaigns'
          className="group text-xs flex items-center space-x-2 text-neutral-500 mb-8 hover:text-blue-500 duration-200">
            <BsArrowLeft className="text-sm group-hover:-translate-x-1 duration-200" />
            <p>Back to Campaigns</p>
        </Link>

        <div className="pb-8">
        <MembersList params={{ url: currentCampaign }} />
        </div>

        {/* CHARTS BABYYYYY */}
        {/* Camp Totals */}
        <CampTotals params={{ url: currentCampaign }}/>

        {/* Party Totals */}
        <PartyTotals params={{ url: currentCampaign }} />

        {/* Quest Creator & Active Quest List */}
        <QuestList params={{ url: currentCampaign }} />
        <CreateQuest params={{ url: currentCampaign }} />
        

        {/* List of Characters */}
        <CharList params={{ url: currentCampaign }} />

        {/* Create a Character */}
        {/* <CreateCharacter params={{ url: currentCampaign }}/> */}


        <ShowCamp params={{ url: currentCampaign }} />

        <div className="flex items-center space-x-4 pt-8 pb-2">
          <DeleteCamp params={{ url: currentCampaign }}/>
          {/* temp disable */}
          <LeaveCamp params={{ url: currentCampaign }} />
        </div>

      </div>
  )
}