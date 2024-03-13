import { Dispatch, SetStateAction } from 'react'; // Import Dispatch and SetStateAction types

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

import { 
    RxTrash,
    RxCheckCircled 
} from "react-icons/rx";

import { deleteQuest } from "../../../convex/campaigns";

import { Id } from '../../../convex/_generated/dataModel';
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

interface DeleteQuestProps {
    questId: string;
    setSelectedQuest: Dispatch<SetStateAction<any>>;
}

export function DeleteQuest({ questId, setSelectedQuest }: DeleteQuestProps) {

    const deleteQuest = useMutation(api.campaigns.deleteQuest)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RxTrash className="text-red-500 text-xl cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
          This action cannot be undone. Clicking delete will permanently delete this quest from the campaign.
          </DialogDescription>
        </DialogHeader>
        <div className="">

        </div>
        <DialogFooter>
            <DialogTrigger>
                <p className="text-sm">Cancel</p>
            </DialogTrigger>
          <Button type="submit" variant='destructive'
            onClick={() => {
                deleteQuest({ id: questId as Id<'quests'> })
                setSelectedQuest(null);
            }}  
          >Delete Quest</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
