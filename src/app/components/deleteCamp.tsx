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
import { useClerk, useSession } from '@clerk/clerk-react';

import { Button } from './ui/button';

export default function DeleteCamp({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url;
    const router = useRouter();

    const { user } = useClerk();

    const deleteCamp = useMutation(api.campaigns.delCamp)

    const camps = useQuery(api.campaigns.getCamps);
    const isOwner = camps?.find(camp => camp._id === currentCampaign)?.ownerId === user?.id;


    return (
        <>
        {isOwner && (
        <Dialog>
            <DialogTrigger>
               <span className="text-xs text-red-500">Delete Campaign</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Clicking delete will permanently delete this campaign and all of its data.
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose>
                            <p className="text-sm">Close</p>
                        </DialogClose>
                        <Button type='submit' variant='destructive'
                            onClick={() => {
                                deleteCamp({
                                id: currentCampaign as Id<"campaigns">,
                            })
                            router.push('/dashboard/campaigns')
                        }}
                        >Delete Campaign</Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>   
        )}
        </>        
    )
}
