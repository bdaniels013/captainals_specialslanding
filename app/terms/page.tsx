import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-950">
      <Link className="text-sm font-semibold text-slate-600 underline underline-offset-4" href="/">
        Back to specials
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-4 text-sm leading-6 text-slate-700">
        By submitting a form on this site, you agree that Captain Al&apos;s may contact you about specials, offers, and giveaway
        updates using the phone number or email address you provide.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Messages</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Marketing text messages may be recurring. Consent is not a condition of purchase. Message and data rates may apply.
        Reply STOP to cancel and HELP for help.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Specials</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Specials, pricing, availability, and hours are subject to change. The graphics on the specials page are provided for
        convenience and may be updated at any time.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Giveaway</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        The monthly gift card drawing is subject to the posted giveaway rules. No purchase is necessary to enter or win.
      </p>
      <p className="mt-8 text-xs leading-5 text-slate-500">
        These starter terms are provided for launch readiness and should be reviewed by counsel for your exact business practices.
      </p>
    </main>
  );
}
