import { useQuery } from 'convex/react';

import { Card, DonutChart } from "@tremor/react";
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';
import { BsClock } from 'react-icons/bs';

export default function HoursChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    // const characterData = character?.map((character) => ({
    //    name: character.title as string,
    //    time: character.time as number, 
    // }))

    const maxHoursCharacter = character?.reduce((max, character) => 
        character.time > max.time ? character : max, character[0]
    );

    return (
        <div className="bg-neutral-200 dark:bg-[#222] rounded-lg p-2 pt-8 h-fit relative">
            {character !== undefined && maxHoursCharacter?.time !== undefined ? ( 
                <div className="text-5xl font-medium">
                    {maxHoursCharacter.time}
                </div>
            ) : (
                <div className="text-5xl font-medium">
                    0
                </div>
            )}
            <p className="text-sm flex justify-start mt-4 font-light">Hours <br /> Played</p>

            <div className="absolute text-lg p-1 bg-red-400 rounded-full text-[#111] -top-2 -left-2"><BsClock /></div>
        </div>
    )
}