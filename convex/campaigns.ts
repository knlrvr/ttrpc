import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

import { Id } from './_generated/dataModel';

export const createCamp = mutation({
    args: {
        id: v.optional(v.id("campaigns")),
        title: v.string(),
        ownerId: v.string(),
        ownerName: v.string(),
        ownerImg: v.string(),
        members: v.array(
            v.object({
                playerId: v.string(),
                playerName: v.string(),
                playerImg: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const campId = await ctx.db.insert("campaigns", {
            id: args.id as Id<"campaigns">,
            title: args.title,
            ownerId: args.ownerId,
            ownerName: args.ownerName,
            ownerImg: args.ownerImg,
            members: args.members,
        });
        return campId;
    },
});

export const getCamps = query({
    handler: async (ctx) => {
        return ctx.db
        .query('campaigns')
        .order('desc')
        .collect();
    }
})

export const joinCamp = mutation({
    args: {
        id: v.id('campaigns'),
        newMembers: v.array(
            v.object({
                playerId: v.string(),
                playerName: v.string(),
                playerImg: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const { id, newMembers } = args;

        // Check if the campaign exists
        const existingCamp = await ctx.db.get(id);

        console.log(existingCamp);  // Add this line for debugging

        if (!existingCamp) {
            throw new Error(`Campaign with id ${id} not found`);
        }

        // Merge the existing and new members
        const updatedMembers = existingCamp.members
            ? [...existingCamp.members, ...newMembers]
            : newMembers;

        // Update the campaign with the new members
        const updatedCamp = await ctx.db.patch(id, {
            members: updatedMembers,
        });

        return updatedCamp;
    },
});
  
// Add a query to fetch user data
export const getUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        return ctx.db.get(args.id);
    },
});

export const getMembersInCamp = query({
    args: { playerId: v.string() },
    handler: async (ctx, args) => {
        const chars = await ctx.db
            .query('characters')
            .filter((q) => q.eq(q.field('playerId'), args.playerId ))
            .order('desc')
            .collect();
        return chars;
    }
})

export const getOwner = query({
    args: {
        id: v.id('campaigns'),
    },
    handler: async (ctx, args) => {
        // Fetch the campaign document by its ID
        const campaign = await ctx.db.get(args.id);

        if (!campaign) {
            throw new Error(`Campaign with id ${args.id} not found`);
        }

        // Extract and return the ownerId
        return campaign.ownerId;
    },
});

export const createQuest = mutation({
    args: {
        campaignId: v.string(),
        title: v.string(),
        type: v.string(),
        body: v.string(),
        assigned: v.string(),
        gpReward: v.optional(v.number()),
        invReward: v.optional(v.string()),

        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const questId = await ctx.db.insert("quests", {
            campaignId: args.campaignId,
            title: args.title ?? '',
            type: args.type ?? '',
            body: args.body ?? '',
            assigned: args.assigned ?? '',
            gpReward: args.gpReward ?? 0,
            invReward: args.invReward ?? '',
            completed: args.completed ?? false,
        });
    },
});

export const getQuests = query({
    args: {
        id: v.id('campaigns')
    },
    handler: async (ctx, args) => {
        const quests = await ctx.db
            .query('quests')
            .filter((q) => q.eq(q.field('campaignId'), args.id))
            .collect();

        return quests;
    }
});

export const questStatus = mutation({
    args: {
        id: v.id('quests'),
        completed: v.boolean()
    },
    handler: async (ctx, args) => {
        const { id } = args;
        const newStatus = await ctx.db
            .patch(id, {
                completed: args.completed,
            })
        return newStatus;
    }
});

export const deleteQuest = mutation({
    args: { id: v.id('quests') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})

export const leaveCamp = mutation({
    args: {
        id: v.id('campaigns'),
        memberToRemove: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, memberToRemove } = args;
        const existingCamp: {
            _id: Id<"campaigns">;
            members?: { playerId: string; playerName: string; playerImg: string; }[] | undefined;
        } | null = await ctx.db.get(id);

        if (!existingCamp || !existingCamp.members || existingCamp.members.length === 0) {
            // Handle case where existingCamp is null or has no members
            return id;
        }

        const updatedMembers = existingCamp.members.filter(
            (member) => member.playerId !== memberToRemove
        );

        // Use ctx.db.patch to update only the 'members' field
        await ctx.db.patch(id, {
            members: updatedMembers,
        });

        // Fetch the updated document after patching
        const updatedCamp: {
            _id: Id<"campaigns">;
        } | null = await ctx.db.get(id);

        return updatedCamp ? updatedCamp._id : id;
    },
});

export const delCamp = mutation({
    args: { id: v.id('campaigns') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})

