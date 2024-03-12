import { useQuery } from 'convex/react';

import { Card, DonutChart } from "@tremor/react";
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
        <div className="bg-neutral-200 dark:bg-[#222] rounded-lg p-2 pt-8 h-fit relative">
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
        </div>
    )
}