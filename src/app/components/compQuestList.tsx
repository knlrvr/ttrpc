import { useMutation, useQuery } from 'convex/react';

import { useState } from 'react';

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel"

import { RxCheck, RxReload, RxUpdate } from 'react-icons/rx';
import { Button } from './ui/button';
import { DeleteQuest } from './deleteQuest';


export default function CompQuestList({
    params
}: {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    const quests = useQuery(api.campaigns.getQuests, { id: currentCampaign as Id<"campaigns"> });
    const completeQuest = useMutation(api.campaigns.questStatus)

    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    // Check if there are any completed quests
    const completedQuests = quests?.filter(quest => quest.completed);

    return (
        <>
            <div className="flex flex-col mt-4">
                {/* Check if there are any completed quests */}
                {completedQuests && completedQuests.length > 0 ? (
                    completedQuests.map(quest => (
                        <div key={quest._id} className="mb-4">
                            <div className="bg-neutral-300 dark:bg-[#222] bg-opacity-80 rounded-lg flex flex-col justify-between p-4 dark:shadow-md shadow-md text-neutral-400 dark:text-neutral-500">
                                <div className="flex flex-col"> 
                                    <span className="text-[#111] dark:text-neutral-100">{quest.title}</span>
                                    <span className="text-xs">{quest.type}</span>
                                </div>
                                <p className="flex grow mt-4 text-sm text-[#111] dark:text-neutral-100">{quest.body}</p>
                                <div className="flex flex-col text-sm space-y-2">

                                    <div className="flex justify-between items-center text-xs mt-6">
                                        <p className=" text-neutral-500 w-full">Assigned by</p>
                                        <span className='w-full text-right'>{quest.assigned}</span>
                                    </div>

                                    {quest.gpReward !== 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <p className=" text-neutral-500 w-full">GP Reward</p>
                                            <span>{quest.gpReward}</span>
                                        </div>
                                    )}
                                    
                                    {quest.invReward !== '' && (
                                        <div className="flex justify-between items-start gap-2 text-xs">
                                            <p className=" text-neutral-500 w-full">Item Reward</p>
                                            <span className="text-right">{quest.invReward}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <button type='submit' className="text-xs text-blue-500" aria-label='mark incomplete'
                                        onClick={() => {
                                            completeQuest({ 
                                                id: quest._id,
                                                completed: false,
                                            })
                                        }}
                                    >Mark Incomplete</button>
                                    <DeleteQuest questId={quest._id} setSelectedQuest={setSelectedQuest}/>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="italic text-neutral-500 text-sm">No completed quests to display!</p>
                )}
            </div>
        </>
    )
}
