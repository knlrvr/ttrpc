'use client'

import { useState } from "react";
import { useMutation, useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { useClerk, useSession } from "@clerk/clerk-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"

export default function CreateUserCharacter({}) {

    const { user } = useClerk();

    const playerId = user?.id;

    const [title, setTitle] = useState<string>('');
    const [level, setLevel] = useState<number>(0);
    const [race, setRace] = useState<string>('');
    const [gameClass, setGameClass] = useState<string>('');

    const createChar = useMutation(api.character.createChar)

    const charClassOptions = [
      'Select Class',
      'Artificer',
      'Barbarian', 
      'Bard',
      'Blood Hunter',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Rogue',
      'Sorcerer',
      'Warlock',
      'Wizard'
  ]
  
  const charRaceOptions = [
      'Select Race',
      'Aarakocra',            // beastfolk
      'Aasimar',              // planar
      'Air Genasi',           // planar
      'Astral Elf',           // fae
      'Autognome',            // mech
      'Bugbear',              // fae
      'Centaur',              // beastfolk
      'Changeling',           // fae
      'Deep Gnome',           // giantkin
      'Dragonborn',           // draconian
      'Duergar',              // giantkin
      'Dwarf',                // giantkin
      'Earth Genasi',         // planar
      'Eladrin',              // fae
      'Elf',                  // fae
      'Fairy',                // fae
      'Feral Tiefling',       // planar
      'Firbolg',              // fae
      'Fire Genasi',          // planar
      'Giff',                 // beastfolk
      'Githyanki',            // planar
      'Githzerai',            // planar
      'Gnome',                // giantkin
      'Goblin',               // fae
      'Goliath',              // giantkin
      'Grung',                // beastfolk
      'Hadozee',              // planar
      'Half-Elf',             // fae
      'Halfling',             // fae
      'Half-Orc',             // giantkin
      'Harengon',             // beastfolk
      'Hobgoblin',            // fae
      'Human',                // mundane
      'Kalashtar',            // planar
      'Kender',               // fae
      'Kenku',                // beastfolk
      'Kobold',               // draconian
      'Leonin',               // beastfolk
      'Lizardfolk',           // draconian
      'Locathah',             // beastfolk
      'Loxodon',              // beastfolk
      'Minotaur',             // beastfolk
      'Orc',                  // giantkin
      'Owlin',                // beastfolk
      'Plasmoid',             // planar
      'Satyr',                // fae
      'Sea Elf',              // fae
      'Shadar-kai',           // planar
      'Shifter',              // beastfolk
      'Simic Hybrid',         // beastfolk
      'Tabaxi',               // beastfolk
      'Tiefling',             // planar
      'Thri-kreen',           // beastfolk
      'Tortle',               // beastfolk
      'Triton',               // planar
      'Vedalken',             // planar
      'Verdan',               // fae
      'Warforged',            // mech
      'Water Genasi',         // planar
      'Yuan-ti'               // draconian
  ]

    return (
        <div>
        <Accordion type="single" collapsible className="w-full mt-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>Add New Character</AccordionTrigger>
            <AccordionContent>
            <form 
              onSubmit={e => {
                e.preventDefault();
                createChar({
                  campaignId: '',
                  playerId: user?.id ?? '',
                  playerName: user?.fullName ?? '',
                  playerImg: user?.imageUrl ?? '',
                  title: title,
                  level: level,
                  race: race,
                  gameClass: gameClass,
                  sessions: 0,
                  time: 0,
                  dmgDealt: 0,
                  dmgTaken: 0,
                  critHits: 0,
                  kills: 0,
                  spellsCast: 0,
                  othersHpHealed: 0,
                  selfHpHealed: 0,
                  deaths: 0,
                  combatTime: 0,
                  natTwenty: 0,
                  natOne: 0,
                  ko: 0,
                  inGameDays: 0,
              });
              setTitle('');
              setLevel(0);
              setRace('');
              setGameClass('');
              }}
              className="flex flex-col space-y-2.5 px-2"
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor='level'
                  className="text-xs uppercase text-neutral-500">
                  Name
                </label>
                <input 
                  value={title} 
                  type="text"
                  onChange={e => setTitle(e.target.value)}
                  className="container bg-transparent rounded-full w-full placeholder:text-neutral-500 px-4 py-2 text-sm"
                  required
                  placeholder='Character Name'
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor='level'
                  className="text-xs uppercase text-neutral-500">
                  Level
                </label>
                <input 
                  value={level} 
                  type="number"
                  onChange={e => setLevel(e.target.valueAsNumber)}
                  className="container bg-transparent rounded-full w-full placeholder:text-neutral-500 px-4 py-2 text-sm"
                  required
                  placeholder='Character Level'
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor='race'
                  className="text-xs uppercase text-neutral-500">
                  race
                </label>
                <select 
                  id="race"
                  className="rounded-full px-2 py-1 w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500 text-[#222] dark:text-white"
                  value={race}
                  onChange={(e) => setRace(e.currentTarget.value)}
                >
                  {charRaceOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor='class'
                  className="text-xs uppercase text-neutral-500"
                > class </label>
                <select
                  id="class"
                  className="rounded-full px-2 py-1 w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500 text-[#222] dark:text-white"
                  value={gameClass}
                  onChange={(e) => setGameClass(e.currentTarget.value)}
                >
                  {charClassOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex justify-end">
                <button type='submit'
                  className="border border-neutral-500 rounded-full font-light text-sm py-1.5 px-6">
                    Save
                </button>
              </div>
            </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
}