'use client'
import React, { useState } from 'react'

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

import { useClerk } from '@clerk/clerk-react';
import Link from 'next/link';
import NewCampaign from '@/app/components/newCampaign';
import { Card } from '@/app/components/ui/card';

export default function CampaignsPage() {
  const { user } = useClerk();
  const camps = useQuery(api.campaigns.getCamps);

  return (
    <div className="flex flex-col space-y-8 mt-2">
      <NewCampaign />
      
      <div className="flex flex-col space-y-2">
        <span className="text-xs text-neutral-500">Campaigns &mdash;</span>
        {camps && camps.length > 0 ? (
          camps.map(camp => {
            const isMember = camp.members.some(member => member.playerId === user?.id);
            return (
              <Card key={camp._id} className="py-6 px-4">
                {isMember && (
                  <Link
                    href={`/dashboard/campaigns/${camp._id}`}
                    key={camp._id} 
                    className="w-full h-full"> 
                      <span className="text-xl">{camp.title}</span>
                  </Link>
                )}
              </Card>
            );
          })
        ) : (
          <p className="italic text-neutral-500 text-sm">No active campaigns to display! Add one now!</p>
          )}
      </div>
    </div>
  );
}

