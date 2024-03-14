import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useClerk } from '@clerk/clerk-react';
import { Button } from './ui/button';

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
                    <div className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
                        bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90                        px-4 py-2 gap-2
                    ">
                        <p>Leave Campaign</p>
                    </div>                  
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            You won&apos;t be able to view this campaign unless you join again.
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose>
                                <p className="text-sm">Close</p>
                            </DialogClose>
                            {char?.map((char) => (
                                <Button key={char._id} variant='destructive'
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
                                >Leave</Button>
                            ))}
                            </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog> 
            )}
        </>       
    )
}