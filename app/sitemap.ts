import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://timemeaning.com'
  
  return [
    // Main pages
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/learn`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/examples`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/developers`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/stats`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/hall-of-confusion`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/glossary`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/changelog`, changeFrequency: 'weekly', priority: 0.4 },
    
    // Learning Centre articles
    { url: `${baseUrl}/learn/ambiguous-timezone-abbreviations`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/learn/bulletproof-time`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/learn/dst-shift-dates`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/learn/iso-8601-for-humans`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/learn/managers-guide-async`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/why-military-time-isnt-enough`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/understanding-utc-offsets`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/developer-log-timestamps`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/how-the-resolver-thinks`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/timezones-without-dst`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/aviation-zulu-time`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/international-date-line`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/learn/nautical-time-zones`, changeFrequency: 'yearly', priority: 0.7 },
    
    // Blog articles
    { url: `${baseUrl}/blog/cst-trap`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/dst-no-mans-land`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/search-engines-lie`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/3pm-ist-disaster`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/stop-asking-what-time`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/log-file-limbo`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/history-of-messy-time`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/timezone-anxiety`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/death-of-the-dropdown`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/blog/universal-time-vs-human-time`, changeFrequency: 'yearly', priority: 0.7 },
    
    // Insights
    { url: `${baseUrl}/insights/ist-most-dangerous-abbreviation`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/insights/march-gap`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/insights/logs-never-lie-clocks-do`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/insights/cost-of-timezone-ambiguity`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/insights/zulu-time-civilian-use`, changeFrequency: 'yearly', priority: 0.7 },
    
    // Tools
    { url: `${baseUrl}/tools/quiz`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/meeting-cost`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/ambiguity-audit`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/overlap`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/dst-map`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/lookup`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/tools/time-dilation`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/tools/unix-birthday`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/tools/speedrun`, changeFrequency: 'yearly', priority: 0.7 },
    
    // Live Status pages
    { url: `${baseUrl}/is/bst`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/edt`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/cest`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/aedt`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/nzdt`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/pdt`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/ist-dst`, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${baseUrl}/is/wst`, changeFrequency: 'yearly', priority: 0.5 },
    
    // Legal
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
