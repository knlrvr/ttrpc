import { useQuery } from 'convex/react';

import { Card, DonutChart } from "@tremor/react";
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';

export default function KillsChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    const characterData = character?.map((character) => ({
       name: character.title as string,
       kills: character.kills as number, 
    }))

    return (
        <Card className="w-full">
            {character !== undefined && ( 
            <DonutChart
                className=""
                data={characterData as []}
                category="kills"
                index="name"
                colors={[
                "orange",
                "red",
                "indigo",
                "green",
                "cyan",
                "amber",
                "blue",
                "pink",
                "teal",
                "yellow",
                ]}
            />
            )}
            <p className="text-xs text-neutral-500 flex justify-center mt-2">Total Kills</p>
        </Card>
    )
}