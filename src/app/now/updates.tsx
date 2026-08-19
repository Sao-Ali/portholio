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
    slug: "august-18-2026",
    title: "Now: August 18, 2026",
    publishedAt: "2026-08-18",
    summary:
      "Looking back on a year and a half with the vRack team, wrapping things up, and getting ready for the next thing.",
    content: (
      <>
        <p>
          it&apos;s kind of crazy that i&apos;ve been with the vRack team for about a
          year and a half now. i joined last summer, and at the time i mostly
          just wanted to learn as much as i could and see what working on a
          real team was like.
        </p>
        <p>
          i got a lot more than that. i&apos;ve been able to work with Kubernetes,
          Go, MongoDB, and a bunch of other things that felt pretty foreign to
          me when i first started. i feel like i can actually look at a system
          now and have a better idea of how all the pieces are supposed to fit
          together.
        </p>
        <p>
          Kubernetes has probably been the biggest one. there was a moment
          where i took down our cluster in Mumbai, which was obviously not a
          great feeling. i remember being pretty stressed about it, but i also
          learned a lot from having to help build it back up and fix what went
          wrong. it made Kubernetes feel a lot less abstract after that.
        </p>
        <p>
          i think the bigger thing i&apos;m taking away is the habits i picked up
          from the team. asking better questions, taking my time before making
          a change, and not treating something as done just because it works on
          my machine. there are a lot of small things like that which are easy
          to miss when you are learning on your own.
        </p>
        <p>
          i&apos;ve also realized that i really want to keep working with this kind
          of stuff. i like being close to the infrastructure, figuring out why
          something broke, and getting a better understanding of the systems
          behind an app. i still have a lot to learn, but now i know where i
          want to keep going.
        </p>
        <p>
          i know this sounds like a goodbye message, and i guess it kind of
          is. i just found out that they do not have headcount for a full-time
          role, so after a year and a half with the team, i&apos;m interviewing and
          applying elsewhere. it&apos;s a little sad, but i&apos;m grateful for the time
          i got there. hopefully i can find a place where i can keep working
          with Kubernetes. back to grinding LeetCode i guess.
        </p>
      </>
    ),
  },
  {
    slug: "july-23-2026",
    title: "Now: July 23, 2026",
    publishedAt: "2026-07-23",
    summary:
      "A little over halfway through the Panasonic internship, working with the vRack team, and hoping to learn a lot more Kubernetes.",
    content: (
      <>
        <p>
          i&apos;m a little over halfway through my internship at Panasonic now.
        </p>
        <p>
          i actually wanted to update this page after my first day, but the
          first day was so hectic that i could not even think about writing
          anything here yet. everything moved fast, and for a while the
          internship felt pretty different from what i expected.
        </p>
        <p>
          there was a lot going on with my manager and team situation at the
          start. i got placed on a team that was not really a software
          engineering team, and honestly i was kind of bummed out. part of me
          just wanted to finish the original project quickly and move on.
        </p>
        <p>
          but i think it worked out. i&apos;m currently working with a different
          team now, the vRack team, and i really enjoy the people around me.
          they work with a lot of modern technology that i want to spend the
          rest of the internship exploring more seriously.
        </p>
        <p>
          their backend is in Go, they use Kubernetes, and they are one of the
          few teams i have seen that is actually full stack instead of being
          split into separate frontend, backend, and infrastructure groups. i
          really like that. it feels like a place where i could learn how the
          whole system fits together instead of only touching one small part of
          it.
        </p>
        <p>
          i also think the team has a bright future. the manager seems like a
          good guy, and the people i work with seem genuinely excited about
          what they are building. that makes a big difference.
        </p>
        <p>
          for now i&apos;m still finishing up my original internship project, but
          i&apos;m really hoping to get an extension and eventually a full-time
          offer with the vRack team. i would love to keep learning more about
          Kubernetes and keep building with them.
        </p>
      </>
    ),
  },
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
        {/* <p>
            I am also working through a Haskell book/project on sockets and
            pipes, which has been pulling me deeper into systems programming,
            networking, sockets, and pipes lol. I can feel myself drifting away
            from frontend and web dev in general. Not in a dramatic way, but
            more like I keep finding the lower-level stuff more interesting.
          </p> */}
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
    href: `/now/${update.slug}`,
  }));
}
