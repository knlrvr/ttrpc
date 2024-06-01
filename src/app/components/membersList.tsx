import { useClerk } from "@clerk/clerk-react";
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react"

import Image from "next/image";

export default function MembersList({
    params
} : {
    params: { url: string }
}) {

    const { user } = useClerk();

    const currentCampaign = params.url

    const char = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    const camp = useQuery(api.campaigns.getCamps)

    const currentCampOwnerImg = camp?.find((c) => c._id === currentCampaign)?.ownerImg;

    const filteredChars = char?.filter(
        (character) => currentCampOwnerImg !== character.playerImg
    );

    const members = camp?.find((c) => c._id === currentCampaign)?.members;

    return (
        <>
            <div className="flex -space-x-4 mt-1">
                {members !== undefined && members.length > 0 ? (
                    members.map(member => {
                        return (
                            <Image
                                key={member.playerId}
                                src={member.playerImg}
                                alt={`${member.playerName}'s pfp`}
                                width={1000}
                                height={1000}
                                className="w-12 h-12 rounded-full border-4 border-neutral-200 dark:border-[#111]"
                            />
                        )})
                    
                ) : (
                    <p>hey but again</p>
                )}
            </div>
        </>
    )
}