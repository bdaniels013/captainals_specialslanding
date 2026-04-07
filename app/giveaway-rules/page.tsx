import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-950">
      <Link className="text-sm font-semibold text-slate-600 underline underline-offset-4" href="/">
        Back to specials
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Giveaway Rules</h1>
      <p className="mt-4 text-sm leading-6 text-slate-700">
        Captain Al&apos;s monthly gift card drawing awards one $100 Captain Al&apos;s gift card to an eligible entrant each month.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Eligibility</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Open to legal residents of the United States who are 18 years of age or older. Employees, owners, and immediate family
        members of Captain Al&apos;s are not eligible.
      </p>
      <h2 className="mt-8 text-lg font-semibold">How to enter</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Submit the specials signup form with a valid phone number and consent to receive updates. Limit one entry per phone
        number per month. No purchase is necessary.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Winner selection</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        One winner will be selected at random from eligible entries after the end of each month. The winner will be notified by
        text message or email and may be required to respond within a reasonable time to claim the prize.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Prize</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        The prize is one $100 Captain Al&apos;s gift card. Prize is not redeemable for cash and may not be transferred or substituted,
        except at Captain Al&apos;s discretion.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Sponsor</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Captain Al&apos;s, 1458 Magnolia St., Gulfport, MS 39507. Questions may be directed to{" "}
        <a className="font-semibold underline underline-offset-4" href="tel:228-831-5751">
          228-831-5751
        </a>
        .
      </p>
      <p className="mt-8 text-xs leading-5 text-slate-500">
        These starter rules are provided for launch readiness and should be reviewed by counsel for your exact promotion.
      </p>
    </main>
  );
}
