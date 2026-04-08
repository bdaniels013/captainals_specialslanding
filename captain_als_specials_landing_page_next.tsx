"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";

type SpecialsKey = "weeknights" | "lunch" | "happy" | "ten" | "chef";

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
  {
    key: "chef",
    label: "Chef's Specials",
    description: "Limited features from the kitchen, available while they last.",
    badge: "Chef's Picks",
    image: {
      src: "/specials/chef.jpg",
      alt: "Captain Al's Chef's Specials graphic",
      updatedText: "Updated as released",
    },
  },
];

function clampIndex(i: number) {
  if (i < 0) return 0;
  if (i > CATEGORIES.length - 1) return CATEGORIES.length - 1;
  return i;
}

function normalizePhone(raw: string) {
  return raw.replace(/\D/g, "");
}

function accentFor(key: SpecialsKey) {
  switch (key) {
    case "weeknights":
      return {
        active: "border-red-700 bg-red-700 text-white",
        subtle: "border-red-200 bg-red-50 text-red-950",
        button: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-700/25",
        ring: "focus:ring-red-700/25",
        border: "border-red-700",
        bar: "bg-red-700",
      };
    case "lunch":
      return {
        active: "border-emerald-700 bg-emerald-700 text-white",
        subtle: "border-emerald-200 bg-emerald-50 text-emerald-950",
        button: "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-700/25",
        ring: "focus:ring-emerald-700/25",
        border: "border-emerald-700",
        bar: "bg-emerald-700",
      };
    case "happy":
      return {
        active: "border-cyan-700 bg-cyan-700 text-white",
        subtle: "border-cyan-200 bg-cyan-50 text-cyan-950",
        button: "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-700/25",
        ring: "focus:ring-cyan-700/25",
        border: "border-cyan-700",
        bar: "bg-cyan-700",
      };
    case "ten":
      return {
        active: "border-amber-700 bg-amber-600 text-white",
        subtle: "border-amber-200 bg-amber-50 text-amber-950",
        button: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-600/25",
        ring: "focus:ring-amber-600/25",
        border: "border-amber-600",
        bar: "bg-amber-600",
      };
    case "chef":
      return {
        active: "border-rose-700 bg-rose-700 text-white",
        subtle: "border-rose-200 bg-rose-50 text-rose-950",
        button: "bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-700/25",
        ring: "focus:ring-rose-700/25",
        border: "border-rose-700",
        bar: "bg-rose-700",
      };
  }
}

export default function CaptainAlsSpecialsLanding() {
  const [active, setActive] = useState<SpecialsKey>("weeknights");
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeIndex = useMemo(
    () => Math.max(0, CATEGORIES.findIndex((category) => category.key === active)),
    [active],
  );
  const activeCategory = CATEGORIES[activeIndex];
  const accent = accentFor(activeCategory.key);
  const touchStartX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;

    const next = clampIndex(activeIndex + (dx < 0 ? 1 : -1));
    setActive(CATEGORIES[next].key);
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3500);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const consent = fd.get("consent") === "on";
    const phone = normalizePhone(String(fd.get("phone") ?? ""));

    if (!consent) {
      showToast("Please check the consent box to enter and receive updates.");
      return;
    }

    if (phone.length < 10) {
      showToast("Please enter a valid phone number.");
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone,
      consent,
      categoryPreference: activeCategory.key,
      source: "captain-als-specials-landing",
      giveaway: {
        enabled: true,
        incentive: "$100 Gift Card Monthly Drawing",
      },
    };

    try {
      setSubmitting(true);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Submission failed");
      }

      showToast("You're entered. Watch for a text soon.");
      form.reset();
      setFormOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      showToast(message);
    } finally {
      setSubmitting(false);
    }
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
              href="#specials"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 sm:inline-flex"
            >
              Specials
            </a>
            <a
              href="tel:228-831-5751"
              className="hidden rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:inline-flex"
            >
              Call
            </a>
            <button
              onClick={() => setFormOpen(true)}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Enter to Win
            </button>
          </div>
        </div>
      </header>

      {toast ? (
        <div className="fixed left-1/2 top-20 z-[80] w-[92%] max-w-md -translate-x-1/2">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl shadow-slate-950/20">
            {toast}
          </div>
        </div>
      ) : null}

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src="/specials/weeknights.PNG"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-sm"
        />
        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(330px,0.7fr)] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <img src={LOGOS.wide} alt="Captain Al's Steak & Seafood" className="h-auto w-full max-w-[560px] object-contain" />
            <div className="mt-8 inline-flex rounded-lg border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              Gulfport, Mississippi
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Specials worth planning dinner around.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Browse current specials, join the updates list, and enter the monthly $100 gift card drawing.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFormOpen(true)}
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Enter to Win
              </button>
              <a
                href="#specials"
                className="rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                View Specials
              </a>
              <a href="tel:228-831-5751" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10">
                Call to order
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white p-3 shadow-2xl shadow-slate-950/30">
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

      <section className="bg-white px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <img src={LOGOS.anchor} alt="" aria-hidden="true" className="h-24 w-24 object-contain" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Get the best stuff before you show up.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Weekly specials, happy hour updates, and limited chef features in one place. Join the list and we will text the
              latest drops.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setFormOpen(true)}
                className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/25"
              >
                Get specials by text
              </button>
              <a
                href="tel:228-831-5751"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100"
              >
                Call Captain Al&apos;s
              </a>
            </div>
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
              <div className="text-xs font-semibold uppercase text-slate-500">Giveaway</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">$100 gift card</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">One entry per phone number per month. No purchase necessary.</div>
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
                Choose a category to pull up the latest graphic. Swipe the image on mobile to move between categories.
              </p>
            </div>
            <button
              onClick={() => setFormOpen(true)}
              className={["rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2", accent.button].join(" ")}
            >
              Enter to Win
            </button>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
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
                    <div className={["mt-1 text-sm leading-6", isActive ? "text-white/85" : "text-slate-600"].join(" ")}>
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
              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <div className="text-base font-semibold text-slate-950">{activeCategory.label}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{activeCategory.description}</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className={["rounded-lg border px-3 py-1 text-xs font-semibold", accent.subtle].join(" ")}>
                    {activeCategory.image.updatedText}
                  </div>
                  <button
                    onClick={() => setFormOpen(true)}
                    className={["rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2", accent.button].join(" ")}
                  >
                    Get specials
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-5">
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img
                    src={activeCategory.image.src}
                    alt={activeCategory.image.alt}
                    loading="lazy"
                    className="h-auto max-h-[76svh] w-full object-contain"
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
                <div className="mt-2 text-xs text-slate-500">Reply STOP to unsubscribe from texts.</div>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-slate-300 pb-24 pt-6 text-xs text-slate-500 sm:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-700">
                <img src={LOGOS.circle} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
                <div>Copyright {new Date().getFullYear()} Captain Al&apos;s</div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link className="underline underline-offset-4" href="/privacy">
                  Privacy
                </Link>
                <Link className="underline underline-offset-4" href="/terms">
                  Terms
                </Link>
                <Link className="underline underline-offset-4" href="/giveaway-rules">
                  Giveaway Rules
                </Link>
              </div>
            </div>
            <div className="mt-3">
              No purchase necessary. Must be 18+. One entry per phone number per month. Winner notified by text or email. Msg &
              data rates may apply. Consent is not a condition of purchase.
            </div>
          </footer>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0 text-xs leading-tight text-slate-700">
            <span className="block truncate font-semibold text-slate-950">Win a $100 gift card</span>
            <span className="block truncate text-[11px] text-slate-500">Enter monthly, get specials by text</span>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className={["shrink-0 rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2", accent.button].join(" ")}
          >
            Enter
          </button>
        </div>
      </div>

      {formOpen ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-end bg-slate-950/70 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Enter to win form"
          onClick={() => !submitting && setFormOpen(false)}
        >
          <div
            className="w-full rounded-t-lg border border-slate-200 bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-lg sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={["-mx-5 -mt-5 mb-4 h-2 rounded-t-lg sm:-mx-6 sm:-mt-6", accent.bar].join(" ")} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-tight text-slate-950">Enter to win $100 monthly</div>
                <div className="mt-1 text-sm text-slate-600">You&apos;ll also get weekly specials updates.</div>
              </div>
              <button
                onClick={() => !submitting && setFormOpen(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-950" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(228) 555-0123"
                    className={["mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2", accent.ring].join(" ")}
                    disabled={submitting}
                  />
                  <div className="mt-2 text-[11px] text-slate-500">One entry per phone number per month.</div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-950" htmlFor="name">
                    Name (optional)
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Blake"
                    className={["mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2", accent.ring].join(" ")}
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-950" htmlFor="email">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    className={["mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2", accent.ring].join(" ")}
                    disabled={submitting}
                  />
                </div>
              </div>

              <label className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <input
                  name="consent"
                  type="checkbox"
                  className={["mt-1 h-4 w-4 rounded border-slate-300 text-slate-950", accent.ring].join(" ")}
                  required
                  disabled={submitting}
                />
                <span className="text-xs leading-5 text-slate-700">
                  I agree to receive recurring marketing text messages and emails from Captain Al&apos;s. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to cancel, HELP for help.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className={[
                  "w-full rounded-lg px-5 py-3 text-sm font-semibold disabled:opacity-60 focus:outline-none focus:ring-2",
                  accent.button,
                ].join(" ")}
              >
                {submitting ? "Submitting..." : "Enter to win + get specials"}
              </button>

              <div className="text-[11px] leading-5 text-slate-500">
                No purchase necessary. Must be 18+. Winner notified by text or email. See giveaway rules.
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
