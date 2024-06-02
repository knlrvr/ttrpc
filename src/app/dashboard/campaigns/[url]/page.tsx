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

import ActiveQuestList from "@/app/components/activeQuestList";
import CompQuestList from "@/app/components/compQuestList";
import { QuestLog } from "@/app/components/questLog";

export default function CampaignDetailsPage({
    params
} : {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    return (
      <div className="">

        <div className="pb-8">
        <MembersList params={{ url: currentCampaign }} />
        </div>

        {/* CHARTS BABYYYYY */}
        {/* Camp Totals */}
        <CampTotals params={{ url: currentCampaign }}/>

        {/* Party Totals */}
        <PartyTotals params={{ url: currentCampaign }} />

        {/* Quest Creator & Active Quest List */}
        <div className="flex flex-col">
          <ActiveQuestList params={{ url: currentCampaign }} />
          
          <div className="flex justify-between items-center">
            <CreateQuest params={{ url: currentCampaign }} />
            <QuestLog params={{ url: currentCampaign }} />
          </div>
        </div>
        

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