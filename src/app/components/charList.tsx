import React, { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

import { Button } from './ui/button';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTrigger,
} from "@/app/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/app/components/ui/accordion"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"

import { 
    BsDash, 
    BsPlus,
    BsPencilSquare, 
    BsTrash,
    BsBoxArrowLeft
} from 'react-icons/bs';

import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';

const getBorderColorLevel = (level: number): string => {
    if (level >= 1 && level <= 5) {
        return "border-red-400";
    } else if (level >= 6 && level <= 10) {
        return "border-red-600";
    } else if (level >= 11 && level <= 15) {
        return "border-red-700";
    } else {
        return "border-red-800";
    }
};

type RaceGroup = "Beastfolk" | "Draconian" | "Fae" | "Giantkin" | "Mech" | "Mundane" | "Planar" ;

const getBorderColorRace = (race:string): string => {
    const raceGroups: Record<RaceGroup, string> = {
        Beastfolk: "border-green-600",
        Draconian: "border-red-500",
        Fae: "border-purple-500",
        Giantkin: "border-orange-500",
        Mech: "border-[#222]",
        Mundane: "border-blue-400",
        Planar: "border-blue-500",
    };
    const raceToGroupMap: Record<string, RaceGroup> = {
        'Aarakocra': "Beastfolk",
        'Aasimar': "Planar",
        'Air Genasi': "Planar",
        'Astral Elf': "Fae",
        'Autognome': "Mech",
        'Bugbear': "Fae",
        'Centaur': "Beastfolk",
        'Changeling': "Fae",
        'Deep Gnome': "Giantkin",
        'Dragonborn': "Draconian",
        'Duergar': "Giantkin",
        'Dwarf': "Giantkin",
        'Earth Genasi': "Planar",
        'Eladrin': "Fae",
        'Elf': "Fae",
        'Fairy': "Fae",
        'Feral Tiefling': "Planar",
        'Firbolg': "Fae",
        'Fire Genasi': "Planar",
        'Giff': "Beastfolk", 
        'Githyanki': "Planar",
        'Githzerai': "Planar",
        'Gnome': "Giantkin",
        'Goblin': "Fae",
        'Goliath': "Giantkin",
        'Grung': "Beastfolk",
        'Hadozee': "Planar",
        'Half-Elf': "Fae",
        'Halfling': "Fae",
        'Half-Orc': "Giantkin",
        'Harengon': "Beastfolk",
        'Hobgoblin': "Fae",
        'Human': "Mundane",
        'Kalashtar': "Planar",
        'Kender': "Fae",
        'Kenku': "Beastfolk",
        'Kobold': "Draconian",
        'Leonin': "Beastfolk",
        'Lizardfolk': "Draconian",
        'Locathah': "Beastfolk",
        'Loxodon': "Beastfolk",
        'Minotaur': "Beastfolk",
        'Orc': "Giantkin",
        'Owlin': "Beastfolk",
        'Plasmoid': "Planar",
        'Satyr': "Fae",
        'Sea Elf': "Fae",
        'Shadar-kai': "Planar",
        'Shifter': "Beastfolk",
        'Simic Hybrid': "Beastfolk",
        'Tabaxi': "Beastfolk",
        'Tiefling': "Planar",
        'Thri-kreen': "Beastfolk",
        'Tortle': "Beastfolk",
        'Triton': "Planar",
        'Vedalken': "Planar",
        'Verdan': "Fae",
        'Warforged': "Mech",
        'Water Genasi': "Planar",
        'Yuan-ti': "Draconian",
    };
    const group = raceToGroupMap[race];
    const raceBorderColor = group ? raceGroups[group] : "border-gray-300";

    return raceBorderColor;
};

type ClassType = "Select Class" | "Artificer" | "Barbarian" | "Bard" | "Blood Hunter" | "Cleric" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";

const getBorderColorClass = (charClass: string): string => {
    const classBorderColors: Record<ClassType, string> = {
        'Select Class': 'border-gray-300',
        'Artificer': "border-amber-400",
        'Barbarian': "border-red-500",
        'Bard': "border-purple-500",
        'Blood Hunter': "border-red-800",
        'Cleric': "border-gray-500",
        'Druid': "border-emerald-500",
        'Fighter': "border-orange-500",
        'Monk': "border-blue-500",
        'Paladin': "border-yellow-400",
        'Ranger': "border-green-700",
        'Rogue': "border-stone-400",
        'Sorcerer': "border-red-600",
        'Warlock': "border-purple-700",
        "Wizard": "border-blue-800"
    };

    const classBorderColor = classBorderColors[charClass as ClassType] || "border-gray-300";
    return classBorderColor;
};
  
export default function CharList({
    params
} : { 
    params: {url: string }
}) {

    const { user } = useUser();

    const currentCampaign = params.url;

    const camps = useQuery(api.campaigns.getCamps)

    const char = useQuery(api.character.getCampCharacters, { campaignId: currentCampaign as Id<"campaigns"> });
    const updateChar = useMutation(api.character.updateChar); 

    const deleteChar = useMutation(api.character.deleteChar)
    const removeCharFromCamp = useMutation(api.character.removeCharFromCamp)

    const [playerId, setPlayerId] = useState<string>('');
    const [level, setLevel] = useState<number>(0);
    const [sessions, setSessions] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [dmgDealt, setDmgDealt] = useState<number>(0);
    const [dmgTaken, setDmgTaken] = useState<number>(0);
    const [critHits, setCritHits] = useState<number>(0);
    const [kills, setKills] = useState<number>(0);
    const [spellsCast, setSpellsCast] = useState<number>(0);
    const [othersHpHealed, setOthersHpHealed] = useState<number>(0);
    const [selfHpHealed, setSelfHpHealed] = useState<number>(0);
    const [deaths, setDeaths] = useState<number>(0);
    const [combatTime, setCombatTime] = useState<number>(0);
    const [natTwenty, setNatTwenty] = useState<number>(0);
    const [natOne, setNatOne] = useState<number>(0);
    const [ko, setKo] = useState<number>(0);
    const [inGameDays, setInGameDays] = useState<number>(0);

    return (
        <div className="">
        {char?.length !== undefined && char?.length > 0 && ( 
            <span className="text-xs text-neutral-500">Campaign Characters &mdash; </span>
        )}
            {char?.map(char => {
                
                return (
                    <Accordion type="single" collapsible className="w-full" key={char._id}>
                        <AccordionItem value={`item-1`}>
                            <AccordionTrigger>
                                <div className="font-light tracking-wide flex items-center space-x-2">
                                    <div className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-[#333] bg-opacity-80 dark:bg-opacity-80"></div>
                                    <span>{char.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col">
                                    {/* row 1 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className={`w-1/4 flex flex-col border-l-2 ${getBorderColorLevel(char.level)} px-2`}>
                                            <span className="text-neutral-500 text-xs">Level</span>
                                            <p className="text-lg">{char.level}</p>
                                        </div>
                                        <div className={`w-1/4 flex flex-col border-l-2 ${getBorderColorRace(char.race)} px-2`}>
                                            <span className="text-neutral-500 text-xs">Race</span>
                                            <p className="text-lg">{char.race}</p>
                                        </div>
                                        <div className={`w-1/4 flex flex-col border-l-2 ${getBorderColorClass(char.gameClass)} px-2`}>
                                            <span className="text-neutral-500 text-xs">Class</span>
                                            <p className="text-lg">{char.gameClass}</p>
                                        </div>
                                    </div>
                                    {/* row 2 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Sessions</span>
                                            <p className="text-lg">{char.sessions}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Time Played</span>
                                            <p className="text-lg">{char.time} hrs</p>
                                        </div>
                                        {/* fix XP lol */}
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">XP</span>
                                            <p className="text-lg">0</p>
                                        </div>
                                    </div>
                                    {/* row 3 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Dmg Taken</span>
                                            <p className="text-lg">{char.dmgTaken}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Dmg Dealt</span>
                                            <p className="text-lg">{char.dmgDealt}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Kills</span>
                                            <p className="text-lg">{char.kills}</p>
                                        </div>
                                    </div>
                                    {/* row 4 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Critical Hits</span>
                                            <p className="text-lg">{char.critHits}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">KO&apos;d</span>
                                            <p className="text-lg">{char.ko}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Deaths</span>
                                            <p className="text-lg">{char.deaths}</p>
                                        </div>
                                    </div>
                                    {/* row 5 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Spells <br />Cast</span>
                                            <p className="text-lg">{char.spellsCast}</p>
                                        </div>
                                        {/* weird stat, took it out but i might want it */}
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Turns Without <br /> Damage</span>
                                            <p className="text-lg">0</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Time In <br /> Combat</span>
                                            <p className="text-lg">{char.time}</p>
                                        </div>
                                    </div>
                                    {/* row 5 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">HP Healed <br /> (Others)</span>
                                            <p className="text-lg">{char.othersHpHealed}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">HP Healed <br /> (Self)</span>
                                            <p className="text-lg">{char.selfHpHealed}</p>
                                        </div>
                                        {/* add to char schema */}
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">In-game <br /> Days</span>
                                            <p className="text-lg">{char.inGameDays}</p>
                                        </div>
                                    </div>          
                                    {/* row 6 */}
                                    <div className="flex justify-between items-center pb-4">
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Nat 20&apos;s</span>
                                            <p className="text-lg">{char.natTwenty}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2">
                                            <span className="text-neutral-500 text-xs">Nat 1&apos;s</span>
                                            <p className="text-lg">{char.natOne}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col border-l border-neutral-500 px-2"></div>
                                    </div>                                                               
                                </div>
                            <div
                                key={char._id} 
                                className="w-full flex flex-col"
                            > 
                            <div className="my-4 flex items-center space-x-2 mr-1">
                                <Image
                                    src={char.playerImg}
                                    alt="player image"
                                    width={1000}
                                    height={1000}
                                    className="h-8 w-8 rounded-full"
                                />
                                <div className="flex flex-col space-y-0.5 w-3/4">
                                    <p className="text-xs text-neutral-500 uppercase">player</p>
                                    <span className="text-xs">{char.playerName}</span>
                                </div>
                                
                            </div>

                            {char.playerId === user?.id && (
                            <Sheet>
                                <div className="flex items-center space-x-6 mt-4 mb-4">
                                    <SheetTrigger>
                                        <BsPencilSquare className="w-full text-lg text-green-500" />
                                    </SheetTrigger>
                                    <Dialog>
                                        <DialogTrigger>
                                            <BsBoxArrowLeft className="text-blue-500 w-full text-xl" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This character will no longer be active in this campaign but can still be viewed in your character list.
                                            </DialogDescription>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <p className="text-sm">Close</p>
                                                </DialogClose>
                                                <Button type='submit' variant='outline'
                                                    onClick={() => {
                                                        removeCharFromCamp({
                                                            id: char._id,
                                                            playerId: user?.id ?? '',
                                                        })
                                                }}>
                                                    Remove
                                                </Button>
                                            </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>      
                                    <Dialog>
                                        <DialogTrigger>
                                            <BsTrash className="text-red-500 w-full text-lg" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete {char.title} and all of their data.
                                            </DialogDescription>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <p className="text-sm">Close</p>
                                                </DialogClose>
                                                <Button type='submit' variant='destructive'
                                                    onClick={() => {
                                                        deleteChar({
                                                            id: char._id
                                                        })
                                                    }}
                                                >
                                                    Delete Character
                                                </Button>
                                            </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>                                 
                                </div>
                                <SheetContent>
                                <SheetDescription>
                                    Editing {char.title}&apos;s information.
                                </SheetDescription>
                                <div className="text-[#111] dark:text-neutral-100">
                                    <form 
                                        onSubmit={e => {
                                            e.preventDefault();
                                            // exitEditMode(char._id);

                                            const id = char._id as Id<"characters">;

                                            updateChar({
                                                id: id,
                                                playerId: char.playerId,
                                                level: char.level  + level,
                                                sessions: char.sessions + sessions,
                                                time: char.time + time,
                                                dmgDealt: char.dmgDealt + dmgDealt,
                                                dmgTaken: char.dmgTaken + dmgTaken,
                                                critHits: char.critHits + critHits,
                                                kills: char.kills + kills,
                                                spellsCast: char.spellsCast + spellsCast,
                                                othersHpHealed: char.othersHpHealed + othersHpHealed,
                                                selfHpHealed: char.selfHpHealed + selfHpHealed,
                                                deaths: char.deaths + deaths,
                                                combatTime: char.combatTime + combatTime,
                                                natTwenty: char.natTwenty + natTwenty,
                                                natOne: char.natOne + natOne,
                                                ko: char.ko + ko,
                                                inGameDays: char.inGameDays + inGameDays,
                                            });

                                            // Reset state after submission
                                            setPlayerId('');
                                            setLevel(0);
                                            setSessions(0);
                                            setTime(0);
                                            setDmgDealt(0);
                                            setDmgTaken(0);
                                            setCritHits(0);
                                            setKills(0);
                                            setSpellsCast(0);
                                            setOthersHpHealed(0);
                                            setSelfHpHealed(0);
                                            setDeaths(0);
                                            setCombatTime(0);
                                            setNatTwenty(0);
                                            setNatOne(0);
                                            setKo(0);
                                            setInGameDays(0);
                                        }}
                                        className="flex flex-col w-full space-y-2"
                                    > 

                                    {/* maybe this needs to be it's own component? i feel like there's too much code lol */}

                                        <div className="flex justify-between pt-4 text-xs text-neutral-600 dark:text-neutral-300 tracking-wider uppercase">
                                            <p>Stat</p>
                                            <p>Add / Subtract</p>
                                        </div>                              
                            
                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Level</span>
                                                <p>{char.level}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setLevel(level => level - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{level}</span>
                                                    <button
                                                        onClick={() => setLevel(level => level + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Sessions</span>
                                                <p>{char.sessions}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setSessions(sessions => sessions - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{sessions}</span>
                                                    <button
                                                        onClick={() => setSessions(sessions => sessions + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Total Hours Played</span>
                                                <p>{char.time} hrs</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setTime(time => time - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{time}</span>
                                                    <button
                                                        onClick={() => setTime(time => time + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Damage Dealt</span>
                                                <p>{char.dmgDealt}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setDmgDealt(dmgDealt => dmgDealt - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{dmgDealt}</span>
                                                    <button
                                                        onClick={() => setDmgDealt(dmgDealt => dmgDealt + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Damage Taken</span>
                                                <p>{char.dmgTaken}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setDmgTaken(dmgTaken => dmgTaken - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{dmgTaken}</span>
                                                    <button
                                                        onClick={() => setDmgTaken(dmgTaken => dmgTaken + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Critical Hits</span>
                                                <p>{char.critHits}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setCritHits(critHits => critHits - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{critHits}</span>
                                                    <button
                                                        onClick={() => setCritHits(critHits => critHits + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Total Kills</span>
                                                <p>{char.kills}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setKills(kills => kills - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{kills}</span>
                                                    <button
                                                        onClick={() => setKills(kills => kills + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Spells Cast</span>
                                                <p>{char.spellsCast}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setSpellsCast(spellsCast => spellsCast - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{spellsCast}</span>
                                                    <button
                                                        onClick={() => setSpellsCast(spellsCast => spellsCast + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">HP Healed (others)</span>
                                                <p>{char.othersHpHealed}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setOthersHpHealed(othersHpHealed => othersHpHealed - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{othersHpHealed}</span>
                                                    <button
                                                        onClick={() => setOthersHpHealed(othersHpHealed => othersHpHealed + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">HP Healed (self)</span>
                                                <p>{char.selfHpHealed}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setSelfHpHealed(selfHpHealed => selfHpHealed - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{selfHpHealed}</span>
                                                    <button
                                                        onClick={() => setSelfHpHealed(selfHpHealed => selfHpHealed + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Deaths</span>
                                                <p>{char.deaths}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setDeaths(deaths => deaths - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{deaths}</span>
                                                    <button
                                                        onClick={() => setDeaths(deaths => deaths + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Times Unconscious</span>
                                                <p>{char.ko}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setKo(ko => ko - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{ko}</span>
                                                    <button
                                                        onClick={() => setKo(ko => ko + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                            
                                        {/* removed Xp */}

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Time In Combat</span>
                                                <p>{char.combatTime} min.</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setCombatTime(combatTime => combatTime - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{combatTime}</span>
                                                    <button
                                                        onClick={() => setCombatTime(combatTime => combatTime + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>       

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">In-game Days</span>
                                                <p>{char.inGameDays}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setInGameDays(inGameDays => inGameDays - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{inGameDays}</span>
                                                    <button
                                                        onClick={() => setInGameDays(inGameDays => inGameDays + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div> 

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Nat 20&apos;s rolled</span>
                                                <p>{char.natTwenty}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setNatTwenty(natTwenty => natTwenty - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{natTwenty}</span>
                                                    <button
                                                        onClick={() => setNatTwenty(natTwenty => natTwenty + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>          

                                        {/* block */}
                                        <div className="grid grid-cols-2 items-end">
                                            <div className="flex flex-col justify-end">
                                                <span className="col-span-2 text-xs text-neutral-500">Nat 1&apos;s rolled</span>
                                                <p>{char.natOne}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setNatOne(natOne => natOne - 1)}
                                                        className="border border-red-500 text-red-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsDash />
                                                    </button>
                                                    <span className="mx-auto px-2 min-w-12 text-center">{natOne}</span>
                                                    <button
                                                        onClick={() => setNatOne(natOne => natOne + 1)}
                                                        className="border border-green-500 text-green-500 rounded-full p-1 text-sm"
                                                        type="button"
                                                    >
                                                        <BsPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>     
 
                                        <div className="w-full flex justify-end py-4">
                                            <button type='submit'
                                                className="border border-neutral-500 rounded-full font-light text-sm py-1.5 px-6">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </SheetContent>
                        </Sheet>
                        )}
                    </div>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                )
            })}
        </div>
    );
}
