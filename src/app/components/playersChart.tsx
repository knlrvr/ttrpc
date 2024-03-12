import { useQuery } from 'convex/react';

import { Card, DonutChart } from "@tremor/react";
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';
import { PiUsers } from 'react-icons/pi';

export default function PlayersChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });

    const totalChar = character?.length;

    return (
        <div className="bg-neutral-200 dark:bg-[#222] rounded-lg p-2 pt-8 h-fit relative">
            {character !== undefined ? ( 
                <div className="text-5xl font-medium">
                    {totalChar}
                </div>
            ) : (
                <div className="text-5xl font-medium">
                    0
                </div>
            )}
            <p className="text-sm flex justify-start mt-4 font-light">Total <br /> Players</p>

            <div className="absolute text-lg p-1 bg-blue-300 rounded-full text-[#111] -top-2 -left-2"><PiUsers /></div>
        </div>
    )
}