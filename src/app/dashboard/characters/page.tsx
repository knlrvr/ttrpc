'use client'

import CreateUserCharacter from "@/app/components/createUserChar";

import { useClerk } from "@clerk/clerk-react";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import UserCharList from "@/app/components/userCharList";

export default function CharPage() {

  const { user } = useClerk();
  const playerId = user?.id ?? '';

  const char = useQuery(api.character.getUserChars, { playerId: playerId});

    return (
      <div>
        <UserCharList />

        <CreateUserCharacter />
      </div>
    );
  }