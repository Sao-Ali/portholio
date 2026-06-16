import type { ReactNode } from "react";

export type NowUpdate = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: ReactNode;
};

export const nowUpdates: NowUpdate[] = [
  {
    slug: "june-15-2026",
    title: "Now: June 15, 2026",
    publishedAt: "2026-06-15",
    summary:
      "Wrapping up junior year, starting the Panasonic internship, and focusing on systems programming.",
    content: (
      <>
        <p>I just wrapped up finals week of my junior year here at UCI.</p>
        <p>
          I start my internship at Panasonic next Monday, June 22, and I am
          honestly excited to get back to work. I have been unemployed since
          January, and in that time I racked up some credit card debt. Not my
          favorite thing to admit, but it is what it is. I was burned out from
          working at a startup and did not want to pick up a part-time job, so
          now I am dealing with the consequences a little bit.
        </p>
        <p>
          This summer I want to focus on working, saving money for once, and
          paying that debt down. I am also a fully functioning adult now, in
          the very unglamorous sense that I pay rent and insurance, and both
          are not cheap. I want to save up to study abroad and travel too, but
          I think I need to take it one step at a time.
        </p>
        <p>
          For now the main thing is the internship. I want to do good work,
          learn as much as I can, and hopefully put myself in a position to
          get a return offer.
        </p>
        <p>
          I am also working through a Haskell book/project on sockets and
          pipes, which has been pulling me deeper into systems programming,
          networking, sockets, and pipes lol. I can feel myself drifting away
          from frontend and web dev in general. Not in a dramatic way, but
          more like I keep finding the lower-level stuff more interesting.
        </p>
        <p>Anyways, onwards to the future. Good things are ahead.</p>
      </>
    ),
  },
];

export function formatNowUpdateDate(dateInput: string): string {
  const iso = dateInput.includes("T") ? dateInput : `${dateInput}T00:00:00`;

  return new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getNowArchiveEntries() {
  return nowUpdates.map((update) => ({
    title: update.title,
    publishedAt: update.publishedAt,
    summary: update.summary,
    href: `/now#${update.slug}`,
  }));
}
