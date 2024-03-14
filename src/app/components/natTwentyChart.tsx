import { useQuery } from 'convex/react';

import { DonutChart } from "@tremor/react";
import { Card } from './ui/card';
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';

export default function NatTwentyChart({
    params
}: {
    params: { url: string }
}) {

  const currentCampaign = params.url;

    const character = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    const characterData = character?.map((character) => ({
       name: character.title as string,
       natTwenty: character.natTwenty as number, 
    }))

    return (
        <Card className="w-full flex flex-col items-center justify-center min-h-56">
            {character !== undefined && ( 
            <DonutChart
                className=""
                data={characterData as []}
                category="natTwenty"
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
            <p className="text-xs text-neutral-500 flex justify-center mt-2">Natural 20&apos;s</p>
        </Card>
    )
}