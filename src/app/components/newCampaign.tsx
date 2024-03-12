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
                    <div className="flex items-center group space-x-2 px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-blue-950">
                        <BsPlusLg />
                        <p className="text-sm font-light">New Campaign</p>
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
                                <button type='submit'
                                    className="border border-green-500 text-green-500 py-1 px-6 rounded-full hover:bg-green-500 hover:text-green-950 duration-200"
                                >
                                    Add
                                </button>
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
                                <button type='submit'
                                    className="border border-blue-500 text-blue-500 py-1 px-6 rounded-full hover:bg-blue-500 hover:text-blue-950 duration-200"
                                >
                                        Join
                                </button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog> 
      </div>
    )
}