"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";

type SpecialsKey = "weeknights" | "lunch" | "happy" | "ten";

type SpecialsCategory = {
  key: SpecialsKey;
  label: string;
  description: string;
  badge: string;
  image: {
    src: string;
    alt: string;
    updatedText: string;
  };
};

const LOGOS = {
  wide: "/logos/capt%20als%20logo%20clean%20copy.PNG",
  anchor: "/logos/captain%20als%20anchor%20shirt%20heavy%20stroke.PNG",
  circle: "/logos/circle.PNG",
};

const LINKS = {
  website: "https://www.captainalsgulfport.com/",
  facebook: "https://www.facebook.com/captainals",
  instagram: "https://www.instagram.com/captainals_gulfport/",
  fullMenu: "https://www.captainalsgulfport.com/places-to-eat-in-gulfport-ms",
  brunchMenu: "https://www.captainalsgulfport.com/brunch",
  drinkMenu: "https://www.captainalsgulfport.com/water-front-bar-gulfport-ms",
};

const CATEGORIES: SpecialsCategory[] = [
  {
    key: "weeknights",
    label: "Weeknight Specials",
    description: "Tuesday seafood, Wednesday steak, and Thursday filet specials.",
    badge: "Featured",
    image: {
      src: "/specials/weeknights.PNG",
      alt: "Captain Al's Weeknight Specials graphic",
      updatedText: "Tue-Thu",
    },
  },
  {
    key: "lunch",
    label: "Daily Lunch Specials",
    description: "Rotating lunch plates, quick picks, and Gulf Coast favorites.",
    badge: "Lunch",
    image: {
      src: "/specials/lunch.jpg",
      alt: "Captain Al's Daily Lunch Specials graphic",
      updatedText: "Updated weekly",
    },
  },
  {
    key: "happy",
    label: "Happy Hour Specials",
    description: "Cocktail and bar specials for an easy stop after work.",
    badge: "Happy Hour",
    image: {
      src: "/specials/happy-hour.png",
      alt: "Captain Al's Happy Hour Specials graphic",
      updatedText: "Updated weekly",
    },
  },
  {
    key: "ten",
    label: "$10 Lunch Menu",
    description: "A weekly set of $10 lunch options with the details on the graphic.",
    badge: "$10 Menu",
    image: {
      src: "/specials/ten.png",
      alt: "Captain Al's Weekly $10 Lunch Menu graphic",
      updatedText: "Updated weekly",
    },
  },
];

function clampIndex(i: number) {
  if (i < 0) return 0;
  if (i > CATEGORIES.length - 1) return CATEGORIES.length - 1;
  return i;
}

function accentFor(key: SpecialsKey) {
  switch (key) {
    case "weeknights":
      return {
        active: "border-red-700 bg-red-700 text-white",
        subtle: "border-red-200 bg-red-50 text-red-950",
        button: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-700/25",
        border: "border-red-700",
        bar: "bg-red-700",
      };
    case "lunch":
      return {
        active: "border-emerald-700 bg-emerald-700 text-white",
        subtle: "border-emerald-200 bg-emerald-50 text-emerald-950",
        button: "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-700/25",
        border: "border-emerald-700",
        bar: "bg-emerald-700",
      };
    case "happy":
      return {
        active: "border-cyan-700 bg-cyan-700 text-white",
        subtle: "border-cyan-200 bg-cyan-50 text-cyan-950",
        button: "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-700/25",
        border: "border-cyan-700",
        bar: "bg-cyan-700",
      };
    case "ten":
      return {
        active: "border-amber-700 bg-amber-600 text-white",
        subtle: "border-amber-200 bg-amber-50 text-amber-950",
        button: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-600/25",
        border: "border-amber-600",
        bar: "bg-amber-600",
      };
  }
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.53 1.5-3.93 3.78-3.93 1.1 0 2.24.2 2.24.2v2.48H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Zm5.25-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  );
}

export default function CaptainAlsSpecialsLanding() {
  const [active, setActive] = useState<SpecialsKey>("weeknights");
  const touchStartX = useRef<number | null>(null);

  const activeIndex = useMemo(
    () => Math.max(0, CATEGORIES.findIndex((category) => category.key === active)),
    [active],
  );
  const activeCategory = CATEGORIES[activeIndex];
  const accent = accentFor(activeCategory.key);

  function setRelativeCategory(step: number) {
    const next = clampIndex(activeIndex + step);
    setActive(CATEGORIES[next].key);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;

    setRelativeCategory(dx < 0 ? 1 : -1);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
            <img src={LOGOS.anchor} alt="Captain Al's" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold">Captain Al&apos;s</div>
              <div className="truncate text-xs text-slate-300">Steak & Seafood</div>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={LINKS.website}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 md:inline-flex"
            >
              Website
            </a>
            <a
              href="#specials"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 sm:inline-flex"
            >
              Specials
            </a>
            <a
              href="tel:228-831-5751"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Call
            </a>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src="/specials/weeknights.PNG"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-sm"
        />
        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(330px,0.7fr)] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <img
              src={LOGOS.wide}
              alt="Captain Al's Steak & Seafood"
              className="mx-auto h-auto w-full max-w-[340px] object-contain sm:mx-0 sm:max-w-[560px]"
            />
            <div className="mt-6 inline-flex rounded-lg border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              Gulfport, Mississippi
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Check the specials before you head over.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:mt-4 sm:text-base sm:leading-7">
              The latest weeknight, lunch, happy hour, and $10 menu graphics are all here in one place.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#specials"
                className="rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                View Specials
              </a>
              <a
                href={LINKS.fullMenu}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Full Menu
              </a>
              <a
                href="tel:228-831-5751"
                className="rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Call to order
              </a>
            </div>
          </div>

          <div className="hidden rounded-lg border border-white/15 bg-white p-3 shadow-2xl shadow-slate-950/30 lg:block">
            <div className="flex items-center justify-between gap-4 px-1 pb-3">
              <div>
                <div className="text-sm font-semibold text-slate-950">Featured this week</div>
                <div className="mt-1 text-sm text-slate-600">Weeknight Specials</div>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-950">
                Tue-Thu
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img
                src="/specials/weeknights.PNG"
                alt="Captain Al's Weeknight Specials graphic"
                className="h-auto max-h-[58svh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden bg-white px-4 py-12 md:block">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <img src={LOGOS.anchor} alt="" aria-hidden="true" className="h-24 w-24 object-contain" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">What&apos;s on deck right now.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Tap through the active specials and use the call button when you are ready to order.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase text-slate-500">Dinner</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Weeknight specials</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">Seafood, steak, and filet nights Tuesday through Thursday.</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase text-slate-500">Lunch</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">$10 menu</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">Quick weekday plates when you want something easy.</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase text-slate-500">Bar</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Happy hour</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">See the current drink and bar specials in one tap.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="specials" className="bg-slate-100 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Current specials</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Tap a category below to switch graphics. On mobile, swipe the image or use the next and previous buttons.
              </p>
            </div>
            <a
              href="tel:228-831-5751"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100"
            >
              Call Captain Al&apos;s
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
            {CATEGORIES.map((category) => {
              const isActive = category.key === active;
              const cardAccent = accentFor(category.key);

              return (
                <button
                  key={category.key}
                  onClick={() => setActive(category.key)}
                  className={[
                    "min-h-[132px] rounded-lg border p-4 text-left shadow-sm transition",
                    isActive ? cardAccent.active : "border-slate-200 bg-white text-slate-950",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <div
                    className={[
                      "inline-flex rounded-lg border px-2 py-1 text-[11px] font-semibold",
                      isActive ? "border-white/30 text-white" : cardAccent.subtle,
                    ].join(" ")}
                  >
                    {category.badge}
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-5">{category.label}</div>
                  <div className={["mt-2 text-xs leading-5", isActive ? "text-white/85" : "text-slate-600"].join(" ")}>
                    {category.image.updatedText}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="hidden gap-3 lg:grid">
              {CATEGORIES.map((category) => {
                const isActive = category.key === active;
                const cardAccent = accentFor(category.key);

                return (
                  <button
                    key={category.key}
                    onClick={() => setActive(category.key)}
                    className={[
                      "rounded-lg border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                      isActive ? cardAccent.active : "border-slate-200 bg-white text-slate-950 hover:border-slate-300",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    <div className={["inline-flex rounded-lg border px-2 py-1 text-[11px] font-semibold", isActive ? "border-white/30 text-white" : cardAccent.subtle].join(" ")}>
                      {category.badge}
                    </div>
                    <div className="mt-3 text-sm font-semibold">{category.label}</div>
                    <div className={["mt-2 text-sm leading-6", isActive ? "text-white/85" : "text-slate-600"].join(" ")}>
                      {category.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <div
              className={["overflow-hidden rounded-lg border bg-white shadow-sm", accent.border].join(" ")}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-label="Specials viewer"
            >
              <div className={["h-2", accent.bar].join(" ")} />
              <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-base font-semibold text-slate-950">{activeCategory.label}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{activeCategory.description}</div>
                  </div>
                  <div className={["rounded-lg border px-3 py-1 text-xs font-semibold", accent.subtle].join(" ")}>
                    {activeCategory.image.updatedText}
                  </div>
                </div>

                <div className="flex gap-3 lg:hidden">
                  <button
                    onClick={() => setRelativeCategory(-1)}
                    disabled={activeIndex === 0}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setRelativeCategory(1)}
                    disabled={activeIndex === CATEGORIES.length - 1}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-5">
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img
                    src={activeCategory.image.src}
                    alt={activeCategory.image.alt}
                    loading="lazy"
                    className="h-auto max-h-[72svh] w-full object-contain"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Specials and pricing subject to change. See graphic for details.</div>
                  <a
                    href="tel:228-831-5751"
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-50"
                  >
                    Call to order
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-950">Menus and website</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              These open in a new tab so you can keep the specials page handy.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={LINKS.fullMenu}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Full Menu
              </a>
              <a
                href={LINKS.brunchMenu}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-50"
              >
                Brunch Menu
              </a>
              <a
                href={LINKS.drinkMenu}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-50"
              >
                Drink Menu
              </a>
              <a
                href={LINKS.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-50"
              >
                Captain Al&apos;s Website
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">Location</div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                1458 Magnolia St.
                <br />
                Gulfport, MS 39507
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">Hours</div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                Tue-Thu 11am-8pm
                <br />
                Fri-Sat 11am-9pm
                <br />
                Sun 11am-8pm, Mon Closed
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">Contact</div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                <a className="font-semibold underline underline-offset-4" href="tel:228-831-5751">
                  228-831-5751
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-slate-300 pb-24 pt-6 text-xs text-slate-500 sm:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-700">
                <img src={LOGOS.circle} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
                <div>Copyright {new Date().getFullYear()} Captain Al&apos;s</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Captain Al's on Facebook"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Captain Al's on Instagram"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
                >
                  <InstagramIcon />
                </a>
                <Link className="underline underline-offset-4" href="/privacy">
                  Privacy
                </Link>
                <Link className="underline underline-offset-4" href="/terms">
                  Terms
                </Link>
              </div>
            </div>
            <div className="mt-3">Specials, pricing, and hours are subject to change.</div>
          </footer>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <a
            href={LINKS.fullMenu}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Full Menu
          </a>
          <a
            href="tel:228-831-5751"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950"
          >
            Call
          </a>
        </div>
      </div>
    </main>
  );
}
