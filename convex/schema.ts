import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    img: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    joinedCamps: v.array(v.string()),
    ownedCamps: v.array(v.string())
  })
    .index('by_token', ['tokenIdentifier']),

    campaigns: defineTable({
        id: v.optional(v.id("campaigns")),
        members: v.array(
          v.object({ 
            playerId: v.string(), 
            playerName: v.string(), 
            playerImg: v.string(),
          })),
        ownerId: v.string(),
        ownerName: v.string(),
        ownerImg: v.string(),
        title: v.string(),
    }),

    characters: defineTable({
        campaignId: v.string(),
        combatTime: v.float64(),
        critHits: v.float64(),
        deaths: v.float64(),
        dmgDealt: v.float64(),
        dmgTaken: v.float64(),
        gameClass: v.string(),
        inGameDays: v.float64(),
        kills: v.float64(),
        ko: v.float64(),
        level: v.float64(),
        natOne: v.float64(),
        natTwenty: v.float64(),
        othersHpHealed: v.float64(),
        playerId: v.string(),
        playerImg: v.string(),
        playerName: v.string(),
        race: v.string(),
        selfHpHealed: v.float64(),
        sessions: v.float64(),
        spellsCast: v.float64(),
        time: v.float64(),
        title: v.string(),
    }),    

    quests: defineTable({
      campaignId: v.string(),
      title: v.string(),
      type: v.string(),
      body: v.string(),
      assigned: v.string(),
      gpReward: v.number(),
      invReward: v.string(),
      completed: v.boolean(),
    })
});