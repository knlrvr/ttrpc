import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react"

import Image from "next/image";

export default function MembersList({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url

    const char = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    const camp = useQuery(api.campaigns.getCamps)

    const currentCampOwnerImg = camp?.find((c) => c._id === currentCampaign)?.ownerImg;

    const filteredChars = char?.filter(
        (character) => currentCampOwnerImg !== character.playerImg
    );

    return (
        <>
            <div className="flex flex-col">
                {currentCampOwnerImg && (
                    <div className="flex flex-col">
                        <span className="ml-1 text-xs text-neutral-500">GM &mdash;</span>
                        <Image
                            src={currentCampOwnerImg}
                            alt="campaign owner image"
                            width={1000}
                            height={1000}
                            className="h-12 w-12 rounded-full border-4 border-neutral-100 dark:border-border"
                        />
                    </div>
                )}

            <span className="ml-1 text-xs text-neutral-500 mt-6">Members &mdash;</span>
            <div className="flex -space-x-4 mt-1">
                {filteredChars?.map((char) => (
                        <div key={char.playerId} className="">
                            <Image
                                src={char.playerImg}
                                alt="player image"
                                width={1000}
                                height={1000}
                                className="h-12 w-12 rounded-full border-4 border-neutral-100 dark:border-border"
                            />
                        </div>
                ))}
            </div>
        </div>
        </>
    )
}