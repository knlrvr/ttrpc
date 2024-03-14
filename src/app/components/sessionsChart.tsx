import { useQuery } from 'convex/react';

import { DonutChart } from "@tremor/react";

import { Card } from './ui/card';
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';
import { BsSlash } from 'react-icons/bs';

export default function SessionsChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });

    const maxHoursCharacter = character?.reduce((max, character) => 
        character.sessions > max.sessions ? character : max, character[0]
    );

    return (
        <Card className="relative p-4 flex flex-col justify-between">
            {character !== undefined && maxHoursCharacter?.sessions !== undefined ? ( 
                <div className="text-5xl font-medium">
                    {maxHoursCharacter.sessions}
                </div>
            ) : (
                <div className="text-5xl font-medium">
                    0
                </div>
            )}
            <p className="text-sm flex justify-start mt-4 font-light">Total <br /> Sessions</p>

            <div className="absolute text-lg p-1 bg-orange-400 rounded-full text-[#111] -top-2 -left-2"><BsSlash/></div>
        </Card>
    )
}