import { NextResponse } from 'next/server';

const blogArticles = [
  {
    title: 'The CST Trap: How a Single Abbreviation Can Be 13 Hours Off',
    slug: 'cst-trap',
    description: 'Two time zones share the abbreviation CST — Central Standard Time and China Standard Time — and the difference between them is fourteen hours.',
    pubDate: 'Sun, 01 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'The DST No Man\'s Land: Why March and November Break International Teams',
    slug: 'dst-no-mans-land',
    description: 'The US and Europe change clocks on different days, creating a multi-week window where timezone offsets are temporarily different.',
    pubDate: 'Thu, 05 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'Why Search Engines Lie to You About Time',
    slug: 'search-engines-lie',
    description: 'Google resolves ambiguous timezone abbreviations silently, based on your IP address, without telling you which interpretation it assumed.',
    pubDate: 'Tue, 10 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'The 3pm IST Disaster: A Story About a Missed Pitch',
    slug: '3pm-ist-disaster',
    description: 'A composite fiction about two professionals who read "IST" and understood it differently — with real-world consequences.',
    pubDate: 'Sun, 15 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'Hall of Confusion: The Worst Timezone Abbreviations',
    slug: 'hall-of-confusion',
    description: 'A curated exhibition of the most confusing timezone abbreviations in active use, ranked by their potential for misunderstanding.',
    pubDate: 'Fri, 20 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'The Meeting That Happened Twice: A DST Horror Story',
    slug: 'meeting-happened-twice',
    description: 'When clocks fall back, a 1:30am meeting can occur twice. Here is what happens when nobody notices.',
    pubDate: 'Wed, 25 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'Why "End of Day" Is Never What You Think',
    slug: 'end-of-day',
    description: 'The phrase "end of day" means different things to different people — and none of them are midnight.',
    pubDate: 'Sat, 28 Feb 2026 00:00:00 +0000',
  },
  {
    title: 'The Timestamp That Broke the Build',
    slug: 'timestamp-broke-build',
    description: 'A developer story about what happens when you store local times without timezone information.',
    pubDate: 'Sun, 01 Mar 2026 00:00:00 +0000',
  },
  {
    title: 'Noon in Two Places at Once: The International Date Line',
    slug: 'international-date-line',
    description: 'It can be the same time but different days on either side of the Date Line. Here is why that matters.',
    pubDate: 'Mon, 02 Mar 2026 00:00:00 +0000',
  },
  {
    title: 'The Calendar Invite That Moved Itself',
    slug: 'calendar-invite-moved',
    description: 'Why your recurring meeting shifts by an hour twice a year — and what to do about it.',
    pubDate: 'Tue, 03 Mar 2026 00:00:00 +0000',
  },
];

export async function GET() {
  const baseUrl = 'https://timemeaning.com';
  
  const rssItems = blogArticles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${article.pubDate}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${article.slug}</guid>
      <category>Blog</category>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TimeMeaning Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Articles on timezone confusion, scheduling errors, and the hidden complexity of time.</description>
    <language>en-gb</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>TimeMeaning</generator>
    <image>
      <url>${baseUrl}/og-default.png</url>
      <title>TimeMeaning Blog</title>
      <link>${baseUrl}/blog</link>
    </image>${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
