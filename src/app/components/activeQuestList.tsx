import { useMutation, useQuery } from 'convex/react';

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel"

import { DeleteQuest } from './deleteQuest';
import { useState } from 'react';
import { RxCheckCircled } from 'react-icons/rx';

export default function ActiveQuestList({
    params
}: {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    const quests = useQuery(api.campaigns.getQuests, { id: currentCampaign as Id<"campaigns"> });
    const completeQuest = useMutation(api.campaigns.completeQuest)

    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    // Check if there are any active quests
    const activeQuests = quests?.filter(quest => !quest.completed);

    return (
        <>
            <span className="text-neutral-500 text-xs">Active Quests &mdash;</span>
            <div className="pb-8 pt-2">
                {/* Check if there are any active quests */}
                {activeQuests && activeQuests.length > 0 ? (
                    activeQuests.map(quest => (   
                        <div key={quest._id} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-[#222] bg-opacity-80 rounded-lg flex flex-col justify-between p-4 shadow-md min-h-72">
                                <div className="flex flex-col"> 
                                    <span className="">{quest.title}</span>
                                    <span className="text-neutral-500 text-xs">{quest.type}</span>
                                </div>
                                <p className="flex grow mt-4 text-sm">{quest.body}</p>
                                <div className="flex flex-col text-sm">
                                    {quest.gpReward !== 0 && (
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-neutral-500 w-full">GP Reward</p>
                                            <span>{quest.gpReward}</span>
                                        </div>
                                    )}
                                    
                                    {quest.invReward !== '' && (
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-xs text-neutral-500 w-full">Item Reward</p>
                                            <span className="text-right">{quest.invReward}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <button type='submit' className="text-xl text-green-500" aria-label='mark complete'
                                        onClick={() => {
                                            completeQuest({ 
                                                id: quest._id,
                                                completed: true,
                                            })
                                        }}
                                    ><RxCheckCircled /></button>
                                    <DeleteQuest questId={quest._id} setSelectedQuest={setSelectedQuest}/>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="italic text-neutral-500 text-sm">No active quests at this time!</p>
                )}
            </div>
        </>
    )
}
