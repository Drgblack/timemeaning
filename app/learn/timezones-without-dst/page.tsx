import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Timezones That Don't Observe DST: The Stable Regions and Why They Confuse Everyone Else — TimeMeaning",
  description: "Major regions with fixed UTC offsets, and why coordination with them shifts twice a year anyway.",
};

export default function TimezonesWithoutDstPage() {
  return (
    <LearnArticle
      title="Timezones That Don't Observe DST: The Stable Regions and Why They Confuse Everyone Else"
      date="February 2026"
    >
      <p>
        Daylight Saving Time is not universal. A significant portion of the world's population lives in regions that maintain a fixed UTC offset year-round. For people in DST-observing regions, these stable zones are a frequent source of confusion — the offset that was correct last month may appear to have changed, when in fact it is the DST-observing region that shifted.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Major regions that do not observe DST</h2>
      
      <p>
        <strong>Japan (<span className="font-mono text-sm">UTC+9</span>):</strong> Japan has not observed DST since 1952. The offset is fixed year-round. Japan is a common source of confusion for US-based teams because the gap between US timezones and Japan changes by one hour twice a year — but the change is always on the US side.
      </p>
      
      <p>
        <strong>China (<span className="font-mono text-sm">UTC+8</span>):</strong> All of China operates on a single timezone year-round with no DST. The fixed offset makes China one of the more predictable major timezones for scheduling purposes, despite the political complexity of a single zone spanning geographic ranges that would naturally cover five.
      </p>
      
      <p>
        <strong>India (<span className="font-mono text-sm">UTC+5:30</span>):</strong> Fixed year-round. The half-hour offset is itself a source of confusion for UTC arithmetic but the stability eliminates DST-related errors.
      </p>
      
      <p>
        <strong>Most of Africa:</strong> The majority of African countries do not observe DST. Morocco is a notable exception — it observes DST and also suspends DST during Ramadan, making its offset particularly complex to track.
      </p>
      
      <p>
        <strong>Most of Southeast Asia:</strong> Thailand (<span className="font-mono text-sm">UTC+7</span>), Vietnam (<span className="font-mono text-sm">UTC+7</span>), Singapore (<span className="font-mono text-sm">UTC+8</span>), Indonesia (multiple fixed zones), Malaysia (<span className="font-mono text-sm">UTC+8</span>), and the Philippines (<span className="font-mono text-sm">UTC+8</span>) are all fixed year-round.
      </p>
      
      <p>
        <strong>Iceland (<span className="font-mono text-sm">UTC+0</span>):</strong> Iceland observes GMT year-round and does not move to BST in summer. This means that for part of the year Iceland has the same offset as the UK, and for the other part it is one hour behind.
      </p>
      
      <p>
        <strong>Most of the Middle East:</strong> Saudi Arabia (<span className="font-mono text-sm">UTC+3</span>), UAE (<span className="font-mono text-sm">UTC+4</span>), Qatar (<span className="font-mono text-sm">UTC+3</span>), Kuwait (<span className="font-mono text-sm">UTC+3</span>) are fixed. Iran (<span className="font-mono text-sm">UTC+3:30</span>) is a notable exception that does observe DST.
      </p>
      
      <p>
        <strong>Arizona, United States (<span className="font-mono text-sm">UTC−7</span>):</strong> Arizona does not observe DST and remains on Mountain Standard Time year-round. The exception within Arizona is the Navajo Nation, which does observe DST — creating a situation where different parts of the same state are on different offsets for part of the year.
      </p>
      
      <p>
        <strong>Hawaii, United States (<span className="font-mono text-sm">UTC−10</span>):</strong> Fixed year-round as Hawaii-Aleutian Standard Time.
      </p>
      
      <p>
        <strong>Saskatchewan, Canada (<span className="font-mono text-sm">UTC−6</span>):</strong> Does not observe DST, remaining on Central Standard Time year-round.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Why stable zones confuse DST-observing regions</h2>
      
      <p>
        If you are in London and you have a regular call with a colleague in Tokyo every Monday at 10:00 your time, that call is at 18:00 Tokyo time in winter (when London is <span className="font-mono text-sm">UTC+0</span>) and at 18:00 Tokyo time in summer (when London is <span className="font-mono text-sm">UTC+1</span>). Wait — Tokyo's time has not changed, but the offset between you has. Your colleague is effectively one hour earlier in your day during British Summer Time, even though their clock has not moved.
      </p>
      
      <p>
        This is the stable-zone confusion. The offset between a DST-observing region and a non-DST region changes twice a year, even though only one side of the pair has moved. People in the stable zone experience their counterparts' schedules as shifting. People in the shifting zone often do not realise they are the ones who moved.
      </p>
      
      <div className="bg-assumptions-bg border-l-4 border-primary p-4 rounded-r-md my-6">
        <p className="mb-0">
          <strong>The practical consequence:</strong> if you coordinate regularly with colleagues in Japan, India, China, or the Gulf states, your standing meeting times need to be reviewed every time <em>your</em> clocks change — not theirs.
        </p>
      </div>
    </LearnArticle>
  );
}
