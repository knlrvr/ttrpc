import React, { useState } from 'react'

import { 
    PiEye,
    PiEyeClosed
} from "react-icons/pi";

import { RxCopy } from "react-icons/rx";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  

export default function ShowCamp({
    params
} : {
    params: { url: string }
}) {

    const [isHidden, setIsHidden] = useState<boolean>(true);

    const copyCamp = () => {
        navigator.clipboard.writeText(params.url)
    }

    return (
        <div className="my-8">
            {isHidden ? (
                <div className="flex space-x-2">
                    <button onClick={() => setIsHidden(false)}>
                        <PiEyeClosed className="text-lg" />
                    </button>
                    <p className="text-xs text-neutral-500">Campaign ID hidden</p>
                </div>
            ) : (
                <div className="flex space-x-2 justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsHidden(true)}>
                            <PiEye className="text-lg" />
                        </button>
                        <p className="text-xs text-neutral-500">{params.url}</p>
                    </div>
                    <Popover>
                        <PopoverTrigger><RxCopy onClick={() => copyCamp()}/></PopoverTrigger>
                        <PopoverContent>
                            <p className="text-sm">Campaign ID successfully copied!</p>
                        </PopoverContent>
                    </Popover>
                </div>
            )}


            <p className="mt-2 text-xs text-neutral-400">Share this Campaign ID with other users who wish to join your campaign!</p>
        </div>
    )
}