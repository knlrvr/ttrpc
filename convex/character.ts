import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createChar = mutation({
    args: {
        campaignId: v.optional(v.string()),
        playerId: v.optional(v.string()),
        playerName: v.string(),
        playerImg: v.string(),
        title: v.string(),
        level: v.number(),
        race: v.string(),
        gameClass: v.string(),
        sessions: v.number(),
        time: v.number(),
        dmgDealt: v.number(),
        dmgTaken: v.number(),
        critHits: v.number(),
        kills: v.number(),
        spellsCast: v.number(),
        othersHpHealed: v.number(),
        selfHpHealed: v.number(),
        deaths: v.number(),
        combatTime: v.number(),
        natTwenty: v.number(),
        natOne: v.number(),
        ko: v.number(),
        inGameDays: v.number(),
    },
    handler: async (ctx, args) => {
        const charId = await ctx.db.insert("characters", {
            campaignId: args.campaignId ?? '',
            playerId: args.playerId ?? '',
            playerName: args.playerName,
            playerImg: args.playerImg,
            title: args.title,
            level: args.level,
            race: args.race,
            gameClass: args.gameClass,
            sessions: args.sessions,
            time: args.time,
            dmgDealt: args.dmgDealt,
            dmgTaken: args.dmgTaken,
            critHits: args.critHits,
            kills: args.kills,
            spellsCast: args.spellsCast,
            othersHpHealed: args.othersHpHealed,
            selfHpHealed: args.selfHpHealed,
            deaths: args.deaths,
            combatTime: args.combatTime,
            natTwenty: args.natTwenty,
            natOne: args.natOne,
            ko: args.ko,
            inGameDays: args.inGameDays,
        });
    },
});

export const getCampCharacters = query({
    args: {campaignId: v.id("campaigns")},
    handler: async (ctx, args) => {
        const chars = await ctx.db
            .query('characters')
            .filter((q) => q.eq(q.field("campaignId"), args.campaignId ))
            .order('asc')
            .collect();
        return chars;
    }
})

export const getUserChars = query({
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

export const updateChar = mutation({
    args: { 
        id: v.id('characters'),
        playerId: v.string(),
        level: v.number(),
        sessions: v.number(),
        time: v.number(),
        dmgDealt: v.number(),
        dmgTaken: v.number(),
        critHits: v.number(),
        kills: v.number(),
        spellsCast: v.number(),
        othersHpHealed: v.number(),
        selfHpHealed: v.number(),
        deaths: v.number(),
        combatTime: v.number(),
        natTwenty: v.number(),
        natOne: v.number(),
        ko: v.number(),
        inGameDays: v.number(),
    },
    handler: async (ctx, args) => {
        const { id } = args;
        const newStats = await ctx.db
        .patch(id, { 
            playerId: args.playerId,
            level: args.level,
            sessions: args.sessions,
            time: args.time,
            dmgDealt: args.dmgDealt,
            dmgTaken: args.dmgTaken,
            critHits: args.critHits,
            kills: args.kills,
            spellsCast: args.spellsCast,
            othersHpHealed: args.othersHpHealed,
            selfHpHealed: args.selfHpHealed,
            deaths: args.deaths,
            combatTime: args.combatTime,
            natTwenty: args.natTwenty,
            natOne: args.natOne,
            ko: args.ko,
            inGameDays: args.inGameDays,
        })
        return newStats;
    }
})

export const assignCharToCampaign = mutation({
    args: { 
        id: v.id('characters'),
        campaignId: v.string(),
    },
    handler: async (ctx, args) => {
        const { id } = args;
        const newStats = await ctx.db
            .patch(id, { 
                campaignId: args.campaignId,
            })
        return newStats;
    }
})


export const removeCharFromCamp = mutation({
    args: {
        id: v.id('characters'),
        playerId: v.string(),
    },
    handler: async (ctx, args) => {
        const { id } = args;
        const character = await ctx.db.get(id);

        if (character?.playerId === args.playerId) {
            // Update the character to remove the campaignId
            const updatedCharacter = await ctx.db.patch(id, {
                campaignId: '', // Set campaignId to an empty string to remove from the campaign
            });

            return updatedCharacter;
        } else {
            throw new Error('Invalid player ID');
        }
    },
});

export const deleteChar = mutation({
    args: { id: v.id('characters') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})