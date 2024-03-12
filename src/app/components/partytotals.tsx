
import DeathsChart from "@/app/components/deathsChart";
import DmgDealtChart from "@/app/components/dmgDealtChart";
import DmgTakenChart from "@/app/components/dmgTakenChart";
import KillsChart from "@/app/components/killsChart";
import NatOneChart from "@/app/components/natOneChart";
import NatTwentyChart from "@/app/components/natTwentyChart";

export default function PartyTotals({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url;
    
    return (
        <div className="flex flex-col space-y-2 mb-8">
            <span className="text-xs text-neutral-500">Party Totals &mdash; </span>
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 ">
                <DmgDealtChart params={{ url: currentCampaign }} />
                <DmgTakenChart params={{ url: currentCampaign }} />
                <KillsChart params={{ url: currentCampaign }} />
                <DeathsChart params={{ url: currentCampaign }} />
                <NatTwentyChart params={{ url: currentCampaign}} />
                <NatOneChart params={{ url: currentCampaign }} />
            </div>
        </div>
    )
}