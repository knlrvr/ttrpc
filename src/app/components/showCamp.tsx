import React, { useState, useEffect } from 'react'

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

    // Set time for camp ID to be visible
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!isHidden) {
            timeoutId = setTimeout(() => {
                setIsHidden(true);
            }, 5000); // 5 seconds in milliseconds
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isHidden]);

    return (
        <div className="mt-16 mb-8">
            {isHidden ? (
                <div className="flex space-x-2">
                    <button onClick={() => setIsHidden(false)}>
                        <PiEyeClosed className="text-lg" />
                    </button>
                    <p className="text-xs text-neutral-500 border border-neutral-500 rounded-md px-2 py-1">Campaign ID hidden</p>
                </div>
            ) : (
                <div className="flex space-x-2 justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsHidden(true)}>
                            <PiEye className="text-lg" />
                        </button>
                        <div className="flex items-center gap-2 border border-neutral-500 rounded-md px-2 py-1 text-neutral-500">
                            <p className="text-xs">{params.url}</p>
                            <Popover>
                                <PopoverTrigger>
                                    <RxCopy onClick={() => {
                                        copyCamp();
                                    }}/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p className="text-sm">Campaign ID successfully copied!</p>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            )}


            {/* <p className="mt-2 text-xs text-neutral-400">Share this Campaign ID with other users who wish to join your campaign!</p> */}
        </div>
    )
}