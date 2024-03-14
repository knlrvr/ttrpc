import { useQuery } from 'convex/react';

import { DonutChart } from "@tremor/react";

import { Card } from './ui/card';
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';
import { PiSunHorizon } from 'react-icons/pi';

export default function DaysChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });

    const maxDaysCharacter = character?.reduce((max, character) => 
        character.inGameDays > max.inGameDays ? character : max, character[0]
    );

    return (
        <Card className="relative p-4 flex flex-col justify-between">
            {character !== undefined && maxDaysCharacter?.inGameDays !== undefined ? ( 
                <div className="text-5xl font-medium">
                    {maxDaysCharacter.inGameDays}
                </div>
            ) : (
                <div className="text-5xl font-medium">
                    0
                </div>
            )}
            <p className="text-sm flex justify-start mt-4 font-light">In-game <br /> Days</p>

            <div className="absolute text-lg p-1 bg-blue-500 rounded-full text-[#111] -top-2 -left-2"><PiSunHorizon /></div>
        </Card>
    )
}