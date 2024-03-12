'use client'

import Header from "../components/sidenav";

import { useSession } from "@clerk/clerk-react";
import SignInError from "../components/signInError";

import useStoreUserEffect from "../components/utils/useStoreUser";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {

    const {isLoaded, isSignedIn} = useSession();
    const userId = useStoreUserEffect();

    if (!isLoaded) {
        return null;
    }
    if (!isSignedIn) {
        return (
            <SignInError />
        );
    }

    return (
        <>
        {userId && isSignedIn && (
        <div className="flex min-h-screen relative">
            <div className="absolute">
                <Header />
            </div>
            <div className="sm:ml-64 flex-grow bg-neutral-100 bg-opacity-70 dark:bg-[#222] dark:bg-opacity-20 dark:text-neutral-100 w-full my-2 mx-2 sm:mr-2 rounded-xl px-3 py-2 mt-14 sm:mt-2">
                {children}
            </div>
        </div>
        )}
        </>
    )
}