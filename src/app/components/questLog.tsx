'use client'

import { RxArrowLeft } from "react-icons/rx";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"
  

import { BsPlusLg } from 'react-icons/bs';
import CompQuestList from './compQuestList';

export function QuestLog({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url;

  return (
    <div className="mb-8">
        <Sheet>
            <SheetTrigger>
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
                    bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90
                    px-4 py-2 gap-2
                ">
                    <RxArrowLeft />
                    <p>Open Quest Log</p>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetDescription>
                        Completed Quests 
                    </SheetDescription>
                </SheetHeader>
                <CompQuestList params={{ url: currentCampaign }}/>
            </SheetContent>
        </Sheet>
    </div>
  )
}