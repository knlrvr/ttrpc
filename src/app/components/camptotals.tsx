
import DaysChart from "./daysChart";
import HoursChart from "./hoursChart";
import PlayersChart from "./playersChart";
import SessionsChart from "./sessionsChart";

export default function CampTotals({
    params
} : {
    params: { url: string }
}) {

    const currentCampaign = params.url; 
    
    return (
        <div className="flex flex-col space-y-2 mb-8">
            <span className="text-xs text-neutral-500">Campaign Totals &mdash; </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 ml-2">
                <SessionsChart params={{ url: currentCampaign }} />
                <HoursChart params={{ url: currentCampaign }} />
                <PlayersChart params={{ url: currentCampaign }} />
                <DaysChart params={{ url: currentCampaign }} /> 

            </div>
        </div>
    )
}