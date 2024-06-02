import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb"

import { UserButton } from "@clerk/clerk-react";
import Header from "./sidenav";

export default function Nav() {

    let path = usePathname();

    let currentPath = '/dashboard'
    if(path.includes('/campaign')) {
        currentPath = '/campaign'
    };
    if(path.includes('/characters')) {
        currentPath = '/characters'
    };


    // get camp name for breadcrumbs (: 

    return (
        <>
        <div className="text-neutral-500 px-6 py-4 border-b border-neutral-500 w-full flex items-center justify-between fixed z-[999] bg-neutral-100 dark:bg-[#111]">
            <Breadcrumb>
                <BreadcrumbList className="ml-6 sm:ml-0">
                    <BreadcrumbItem className="">
                        <BreadcrumbLink href="/dashboard">TTRPC</BreadcrumbLink>
                    </BreadcrumbItem>
                    {path.includes('/campaigns') && (
                        <BreadcrumbItem className="">
                            <BreadcrumbSeparator className="" />
                            <BreadcrumbLink href='/dashboard/campaigns' className="">
                                Campaigns
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )} 
                    {path.includes('/characters') && (
                        <BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbLink href='/dashboard/characters'>&nbsp;&nbsp;Characters</BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    {/* camp name */}
                    {/* {path.includes('/campaigns/') && (      
                        <BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><em>curr</em></BreadcrumbItem>
                        </BreadcrumbItem>
                    )} */}
                </BreadcrumbList>
            </Breadcrumb>
            <UserButton />
        </div>
        
        </>
    )
}
  
  