import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold">AI Vision Analyzer</div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/analyze"
                className="rounded-lg bg-slate-900 px-4 py-2 text-white"
              >
                Go to Analyzer
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-16 rounded-2xl bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight">
            Understand images instantly with AI-powered vision.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Upload an image and get a detailed description of objects, colors,
            mood, and notable features in seconds.
          </p>

          <div className="mt-6 flex gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-white">
                  Get started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/analyze"
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-white"
              >
                Analyze an image
              </Link>
            </SignedIn>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Features</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Detailed descriptions",
                body: "Get rich summaries including key objects and scene context.",
              },
              {
                title: "Secure access",
                body: "Authentication via Clerk with JWT verification in the backend.",
              },
              {
                title: "Tiered usage",
                body: "Free tier: 1 analysis per session. Premium: unlimited analyses.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Free</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                <li>1 analysis per session</li>
                <li>Basic image descriptions</li>
                <li>Standard support</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Premium</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                <li>Unlimited analyses</li>
                <li>Priority processing</li>
                <li>Priority support</li>
              </ul>
              <p className="mt-4 text-slate-600">$9.99/month</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
