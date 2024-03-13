import { useMutation, useQuery } from 'convex/react';

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel"

import { RxCheck } from 'react-icons/rx';


export default function CompQuestList({
    params
}: {
    params: {url: string}
}) {

    const currentCampaign = params.url;

    const quests = useQuery(api.campaigns.getQuests, { id: currentCampaign as Id<"campaigns"> });
    const completeQuest = useMutation(api.campaigns.completeQuest)


    return (
        <>
            <span className="text-neutral-500 text-xs">Completed Quests &mdash;</span>
            <div className="flex flex-col pt-2 pb-8">
                {quests?.map((quest) => (   
                    <div key={quest._id}>
                        {quest.completed === true && (
                            <div className="flex items-center gap-2">
                                <RxCheck className="text-green-500" />
                                <p>{quest.title}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}