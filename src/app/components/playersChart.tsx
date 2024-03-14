import { useQuery } from 'convex/react';

import { DonutChart } from "@tremor/react";

import { Card } from './ui/card';
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
        <Card className="relative p-4 flex flex-col justify-between">
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
        </Card>
    )
}