import { useMutation, useQuery } from 'convex/react';

import { useState } from 'react';

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel"

import { RxCheck, RxTrash } from 'react-icons/rx';
import { Button } from './ui/button';
import { DeleteQuest } from './deleteQuest';


export default function CompQuestList({
    params
}: {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    const quests = useQuery(api.campaigns.getQuests, { id: currentCampaign as Id<"campaigns"> });
    const completeQuest = useMutation(api.campaigns.completeQuest)

    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    // Check if there are any completed quests
    const completedQuests = quests?.filter(quest => quest.completed);

    return (
        <>
            <span className="text-neutral-500 text-xs">Completed Quests &mdash;</span>
            <div className="flex flex-col pt-2 pb-8">
                {/* Check if there are any completed quests */}
                {completedQuests && completedQuests.length > 0 ? (
                    completedQuests.map(quest => (
                        <div key={quest._id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center">
                                <RxCheck className="text-green-500 text-lg" />
                                <p className="text-sm">{quest.title}</p>
                            </div>
                            <DeleteQuest questId={quest._id} setSelectedQuest={setSelectedQuest} />
                        </div>
                    ))
                ) : (
                    <p className="italic text-neutral-500 text-sm">No completed quests to display!</p>
                )}
            </div>
        </>
    )
}
