'use client'

import { useState } from 'react'

import { useMutation, useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";

import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

import { BsPlusLg } from 'react-icons/bs';

export function CreateQuest({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url;

    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [assigned, setAssigned] = useState<string>('');
    const [gpReward, setGpReward] = useState<number>(0);
    const [invReward, setInvReward] = useState<string>('');

    const questTypeOptions = [
        'Select Quest Type',
        'Bounty',
        'Defense',
        'Delivery',
        'Destroy',
        'Discuss',
        'Escort',
        'Fetch',
        'Gather',
        'Investigation',
        'Kill',
        'Protect',
        'Survival'
    ];

    const createQuest = useMutation(api.campaigns.createQuest);

  return (
    <div className="mb-8">
        <Dialog>
        <DialogTrigger asChild>
            <div className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
                bg-blue-500 text-neutral-50 hover:bg-blue-500/90 dark:bg-blue-900 dark:text-neutral-50 dark:hover:bg-blue-900/90
                px-4 py-2 gap-2
            ">
                <p>New Quest</p>
                <BsPlusLg />
            </div>        
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Create Quest</DialogTitle>
            <DialogDescription>
                Add the details below for the quest you&apos;d like to create.
            </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col space-y-4"
                onSubmit={e => {
                    e.preventDefault();
                    createQuest({
                        campaignId: currentCampaign,
                        title: title,
                        type: type,
                        body: body,
                        assigned: assigned,
                        gpReward: gpReward,
                        invReward: invReward,
                        completed: false,
                    })
                    setTitle('');
                    setType('');
                    setBody('');
                    setAssigned('');
                    setGpReward(0);
                    setInvReward('');
                }}
            >
            
                <div className="flex flex-col gap-1">
                    <label htmlFor='questTitle' className="text-xs text-neutral-400 dark:text-neutral-600">Quest Title</label>
                    <input
                        id="questTitle"
                        type='text'
                        className='bg-transparent px-1 border border-neutral-500 rounded-md placeholder:text-neutral-300 dark:placeholder:text-neutral-600'
                        placeholder='Quest Title'
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='questType' className="text-xs text-neutral-400 dark:text-neutral-600">Quest Type</label>
                    <select
                        id='questType'
                        className='bg-transparent px-1 border border-neutral-500 rounded-md'
                        value={type}
                        onChange={(e) => setType(e.currentTarget.value)}
                    >
                        {questTypeOptions?.map((option, index) => (
                            <option key={index} value={option}
                                className="">
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='questBody' className="text-xs text-neutral-400 dark:text-neutral-600">Quest Description</label>
                    <textarea
                        id="questBody"
                        className='bg-transparent px-1 border border-neutral-500 rounded-md placeholder:text-neutral-300 dark:placeholder:text-neutral-600'
                        placeholder='Quest Description'
                        value={body}
                        rows={5}
                        onChange={(e) => setBody(e.currentTarget.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='assigned' className="text-xs text-neutral-400 dark:text-neutral-600">Assigned By</label>
                    <input
                        id="assigned"
                        type='text'
                        className='bg-transparent px-1 border border-neutral-500 rounded-md placeholder:text-neutral-300 dark:placeholder:text-neutral-600'
                        placeholder='Assigned by'
                        value={assigned}
                        onChange={(e) => setAssigned(e.currentTarget.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='gpReward' className="text-xs text-neutral-400 dark:text-neutral-600">GP Reward <em>(Optional)</em></label>
                    <input
                        id="gpReward"
                        type='number'
                        min={0}
                        max={999999}
                        className='bg-transparent px-1 border border-neutral-500 rounded-md placeholder:text-neutral-300 dark:placeholder:text-neutral-600'
                        placeholder='0'
                        value={gpReward}
                        onChange={(e) => setGpReward(e.currentTarget.valueAsNumber)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='invReward' className="text-xs text-neutral-400 dark:text-neutral-600">Inventory Reward <em>(Optional)</em></label>
                    <input
                        id="invReward"
                        type='text'
                        className='bg-transparent px-1 border border-neutral-500 rounded-md placeholder:text-neutral-300 dark:placeholder:text-neutral-600'
                        placeholder='Item'
                        value={invReward}
                        onChange={(e) => setInvReward(e.currentTarget.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogTrigger>
                        <p className="text-sm">Cancel</p>
                    </DialogTrigger>
                    <Button type="submit" variant='successful'>Save Quest</Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}
