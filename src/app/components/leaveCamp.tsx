import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useClerk } from '@clerk/clerk-react';

export default function LeaveCamp({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url;

    const router = useRouter();

    const { user } = useClerk();

    const char = useQuery(api.character.getUserChars, { playerId: user?.id ?? ' '})
    const leaveCamp = useMutation(api.campaigns.leaveCamp)
    const removeChar = useMutation(api.character.removeCharFromCamp)

    const isOwner = useQuery(api.campaigns.getOwner, { id: currentCampaign as Id<'campaigns'> })

    const isMember = useQuery(api.campaigns.getMembersInCamp, { playerId: user?.id ?? ''})
    
    return (
        <>
        {isMember && user?.id != isOwner && ( 
            <Dialog>
                <DialogTrigger>
                <p className="text-blue-500 border border-blue-500 rounded-full px-6 py-1 text-sm hover:bg-blue-500 hover:text-[#111] duration-200">Leave Campaign</p>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            You won&apos;t be able to view this campaign unless you join again.
                        </DialogDescription>
                        <div className="flex justify-evenly pt-6">
                            <DialogClose>
                                <p className="border py-1 px-6 rounded-full border-[#111] hover:bg-[#111] hover:text-neutral-100 dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-[#111] duration-200">Close</p>
                            </DialogClose>
                            {char?.map((char) => (
                                <button key={char._id}
                                className="border border-blue-500 text-blue-500 py-1 px-6 rounded-full hover:bg-blue-500 hover:text-red-950 duration-200"
                                onClick={() => {
                                    leaveCamp({
                                        id: currentCampaign as Id<"campaigns">,
                                        memberToRemove: user?.id ?? '',
                                    });
                                    removeChar({
                                        id: char._id,
                                        playerId: user?.id ?? '',
                                    });
                                    router.push('/dashboard/campaigns')
                                }}
                                >Leave</button>
                            ))}
                            </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog> 
            )}
        </>       
    )
}