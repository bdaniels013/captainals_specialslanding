import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-950">
      <Link className="text-sm font-semibold text-slate-600 underline underline-offset-4" href="/">
        Back to specials
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-6 text-slate-700">
        Captain Al&apos;s collects the contact information you submit, including phone number, name, email address, and your selected
        specials preference, so we can send specials updates and administer the monthly gift card drawing.
      </p>
      <h2 className="mt-8 text-lg font-semibold">How we use your information</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        We use your information to send marketing text messages and emails, notify giveaway winners, respond to customer
        questions, and improve our specials updates. Consent to marketing messages is not a condition of purchase.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Text messages</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Message and data rates may apply. Reply STOP to cancel text messages and HELP for help. After you opt out, we may retain
        limited information needed to honor your request.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Sharing</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        We do not sell your personal information. We may share information with service providers that help operate our
        messaging, email, giveaway, hosting, or analytics systems.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Contact</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        For privacy questions, call{" "}
        <a className="font-semibold underline underline-offset-4" href="tel:228-831-5751">
          228-831-5751
        </a>
        .
      </p>
      <p className="mt-8 text-xs leading-5 text-slate-500">
        This starter policy is provided for launch readiness and should be reviewed by counsel for your exact business practices.
      </p>
    </main>
  );
}
