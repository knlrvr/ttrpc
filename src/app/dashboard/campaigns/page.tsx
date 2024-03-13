'use client'
import React, { useState } from 'react'

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

import { useClerk } from '@clerk/clerk-react';
import Link from 'next/link';
import NewCampaign from '@/app/components/newCampaign';

export default function CampaignsPage() {

  const { user } = useClerk();

  const camps = useQuery(api.campaigns.getCamps)

  return (
    <div className="flex flex-col space-y-8 mt-2">

      <NewCampaign />

      <div className="pt-2 flex flex-col space-y-2">
        <span className="text-xs text-neutral-500">Campaigns &mdash;</span>
        {camps?.map(camp => {
          const isMember = camp.members.some(member => member.playerId === user?.id);
          return (
            <div key={camp._id}>
              {isMember && (
                <Link href={`/dashboard/campaigns/${camp._id}`}
                  key={camp._id} 
                  className="my-2 py-8 flex flex-col tracking-wide first:mt-0 mt-4 p-4 rounded-lg bg-neutral-50 dark:bg-[#222] dark:bg-opacity-50 shadow-md"> 
                    <span className="text-xl">{camp.title}</span>
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
