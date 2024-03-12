import React, { useState } from 'react'

import { 
    PiEye,
    PiEyeClosed
} from "react-icons/pi";

export default function ShowCamp({
    params
} : {
    params: { url: string }
}) {

    const [isHidden, setIsHidden] = useState<boolean>(true);
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
                <div className="flex space-x-2">
                    <button onClick={() => setIsHidden(true)}>
                        <PiEye className="text-lg" />
                    </button>
                    <p className="text-xs text-neutral-500">{params.url}</p>
                </div>
            )}
            <p className="mt-2 text-xs text-neutral-400">Share this Campaign ID with other users who wish to join your campaign!</p>
        </div>
    )
}