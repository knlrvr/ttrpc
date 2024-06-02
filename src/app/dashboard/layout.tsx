'use client'

import Header from "../components/sidenav";

import { useSession } from "@clerk/clerk-react";
import SignInError from "../components/signInError";

import useStoreUserEffect from "../components/utils/useStoreUser";
import Nav from "../components/nav";

export default function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { url: string }
}) {

    const {isLoaded, isSignedIn} = useSession();
    const userId = useStoreUserEffect();

    const currentCampaign = params.url;

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
        <div className="flex flex-col min-h-screen relative">
            <div className="">
                <Nav />
                <Header />
            </div>
            <div className="mt-16 sm:mt-14 sm:ml-64 flex-grow dark:text-neutral-100 bg-neutral-100 dark:bg-[#111] p-4 sm:p-6">
                {children}
            </div>
        </div>
        )}
        </>
    )
}