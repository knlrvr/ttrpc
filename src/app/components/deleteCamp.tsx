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
import { useClerk, useSession } from '@clerk/clerk-react';

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
               <p className="text-red-500 border border-red-500 rounded-full px-6 py-1 text-sm hover:bg-red-500 hover:text-[#111] duration-200">Delete Campaign</p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Clicking delete will permanently delete this campaign and all of its data.
                    </DialogDescription>
                    <div className="flex justify-evenly pt-6">
                        <DialogClose>
                            <p className="border py-1 px-6 rounded-full border-[#111] hover:bg-[#111] hover:text-neutral-100 dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-[#111] duration-200">Close</p>
                        </DialogClose>
                        <button 
                            className="border border-red-500 text-red-500 py-1 px-6 rounded-full hover:bg-red-500 hover:text-red-950 duration-200"
                            onClick={() => {
                                deleteCamp({
                                id: currentCampaign as Id<"campaigns">,
                                })
                                router.push('/dashboard/campaigns')
                            }}
                        >Delete</button>
                        </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>   
        )}
        </>        
    )
}
