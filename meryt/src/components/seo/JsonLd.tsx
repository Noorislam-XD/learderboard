import { Contestant } from "@/src/types";

interface ProfileJsonLdProps {
  contestant: Contestant;
  url: string;
}

export function ProfileJsonLd({ contestant, url }: ProfileJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url,
    name: contestant.name,
    url,
    description: contestant.bio,
    image: `${url}/opengraph-image`,
    jobTitle: contestant.tags[0] ?? "Researcher",
    affiliation: {
      "@type": "EducationalOrganization",
      name: contestant.university,
    },
    nationality: {
      "@type": "Country",
      name: contestant.country,
    },
    award: contestant.achievements.map(a => a.title),
    sameAs: contestant.socials.map(s => s.url).filter(u => u !== "#"),
    identifier: {
      "@type": "PropertyValue",
      name: "NI Score",
      value: contestant.niScore,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

export function LeaderboardJsonLd({ url }: { url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "MERYT Global Verified Talent Rankings",
    description: "A dataset of 28,400+ verified talent profiles ranked by the NI Score — a proof-of-work identity graph across five pillars.",
    url,
    creator: {
      "@type": "Organization",
      name: "MERYT",
      url: "https://meryt.app",
    },
    license: "https://meryt.app/terms",
    isAccessibleForFree: true,
    keywords: ["talent rankings", "NI Score", "verified credentials", "leaderboard", "merit", "proof of work"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MERYT",
    url: "https://meryt.app",
    logo: "https://meryt.app/opengraph-image",
    description: "Global verified talent ranking platform powered by the NI Score. Not social credit scoring.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@meryt.app",
      contactType: "customer service",
    },
    sameAs: [
      "https://twitter.com/merytapp",
      "https://github.com/merytapp",
      "https://linkedin.com/company/meryt",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MERYT",
    url: "https://meryt.app",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://meryt.app/search?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
