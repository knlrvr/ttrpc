import { useClerk } from '@clerk/clerk-react';
import React, { useState } from 'react'

import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';

import { Id } from '../../../convex/_generated/dataModel';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'
import { BsPlusLg } from 'react-icons/bs';
import { Button } from './ui/button';

export default function NewCampaign() {

    const { user } = useClerk();

    const [title, setTitle] = useState<string>('');
    const [campaignId, setCampaignId] = useState<string>('')


    const createCamp = useMutation(api.campaigns.createCamp);

    const joinCamp = useMutation(api.campaigns.joinCamp);

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
                        bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 
                        px-4 py-2 sm:px-3 lg:px-8 gap-2
                        '>
                        <p>New Campaign</p>
                        <BsPlusLg />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add or Join A New Campaign</DialogTitle>
                        <DialogDescription>
                            Enter the title for your new campaign.
                        </DialogDescription>
                        <form 
                            onSubmit={e => {
                                e.preventDefault();
                                createCamp({
                                    title: title,
                                    ownerId: user?.id ?? '',
                                    ownerName: user?.fullName ?? '',
                                    ownerImg: user?.imageUrl ?? '',
                                    members: [{
                                        playerId: user?.id ?? '',
                                        playerName: user?.fullName ?? '',
                                        playerImg: user?.imageUrl ?? '',
                                    }],
                                });
                            setTitle('');
                            }}
                            className="w-full flex flex-col justify-start"
                            >
                            <div className="flex flex-col justify-start space-y-2 text-neutral-500 text-xs mt-4">
                                <label htmlFor='New Campaign'
                                    className="ml-5">
                                    New Campaign Title
                                </label>
                                <input 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)}
                                    className="container bg-transparent rounded-full w-full placeholder:text-neutral-500 mr-3 ml-1 px-4 py-2 text-sm border border-[#333]"
                                    required
                                    placeholder='Campaign Title'
                                />
                            </div>
                            <div className="mt-4 ml-1">
                                <Button type='submit' variant='neutral'>
                                    Add
                                </Button>
                            </div>
                        </form>
                        <form 
                            onSubmit={e => {
                                e.preventDefault();
                                joinCamp({
                                    id: campaignId as Id<"campaigns">,
                                    newMembers: [{
                                        playerId: user?.id ?? '',
                                        playerImg: user?.imageUrl ?? '',
                                        playerName: user?.fullName ?? ''
                                    }],
                                    })
                                setCampaignId('');
                            }}
                            className="w-full flex flex-col justify-start"
                            >
                            <div className="flex flex-col justify-start space-y-2 text-neutral-500 text-xs mt-4">
                                <label htmlFor='New Campaign'
                                    className="ml-5">
                                        Join With Campaign ID
                                </label>
                                <input 
                                    value={campaignId} 
                                    onChange={e => setCampaignId(e.target.value)}
                                    className="container bg-transparent rounded-full w-full placeholder:text-neutral-500 mr-3 ml-1 px-4 py-2 text-sm border border-[#333]"
                                    required
                                    placeholder='Campaign ID'
                                />
                            </div>
                            <div className="mt-4 ml-1">
                                <Button type='submit' variant='successful'>
                                        Join
                                </Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog> 
      </div>
    )
}