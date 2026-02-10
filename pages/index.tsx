import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
              <span className="text-sm font-bold">AI</span>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-900">
                AI Vision Analyzer
              </div>
              <div className="text-xs text-slate-500">
                Next.js • FastAPI • Clerk • OpenAI Vision
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-800">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/analyze"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium transition-colors hover:bg-indigo-700"
              >
                Go to Analyzer
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                AI-powered image understanding
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Understand images instantly with AI-powered vision.
              </h1>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Upload an image and get a detailed description of objects, colors,
                mood, and notable features in seconds — secured with authentication
                and tiered usage limits.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <SignedOut>
                  <SignInButton>
                    <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium transition-colors hover:bg-indigo-700">
                      Get started
                    </button>
                  </SignInButton>

                  <a
                    href="#features"
                    className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-slate-900 font-medium transition-colors hover:bg-slate-50"
                  >
                    View features
                  </a>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/analyze"
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium transition-colors hover:bg-indigo-700"
                  >
                    Analyze an image
                  </Link>

                  <a
                    href="#pricing"
                    className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-slate-900 font-medium transition-colors hover:bg-slate-50"
                  >
                    See pricing
                  </a>
                </SignedIn>
              </div>

              {/* Small badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-600">
                {[
                  "JWT-protected API",
                  "Free & Premium tiers",
                  "FastAPI backend",
                  "OpenAI Vision",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side visual */}
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 to-slate-900 p-8 text-white">
              <div className="text-sm font-medium opacity-90">
                Example output
              </div>

              <div className="mt-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <p className="text-sm leading-relaxed">
                  “A soft pink invitation design with floral accents and elegant
                  typography. The layout features roses along the border and a
                  pastel gradient background…”
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                  <div className="font-semibold">Secure</div>
                  <div className="mt-1 opacity-90">Clerk authentication</div>
                </div>
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                  <div className="font-semibold">Fast</div>
                  <div className="mt-1 opacity-90">Optimized API flow</div>
                </div>
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                  <div className="font-semibold">Accurate</div>
                  <div className="mt-1 opacity-90">Vision-capable model</div>
                </div>
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                  <div className="font-semibold">Tiered</div>
                  <div className="mt-1 opacity-90">Free vs Premium</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Features</h2>
              <p className="mt-1 text-slate-600">
                Everything you need for a clean AI vision demo app.
              </p>
            </div>
            <Link
              href="/analyze"
              className="hidden sm:inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 font-medium transition-colors hover:bg-slate-50"
            >
              Open Analyzer →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Detailed descriptions",
                body: "Rich summaries including objects, scene context, and notable features.",
              },
              {
                title: "Secure access",
                body: "Clerk authentication with JWT verification on the backend.",
              },
              {
                title: "Tiered usage",
                body: "Free tier: 1 analysis per session. Premium: unlimited analyses.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Pricing</h2>
          <p className="mt-1 text-slate-600">
            Simple tiers to demonstrate usage limits.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Free</h3>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-100">
                  $0
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                  1 analysis per session
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                  Standard processing
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                  Basic support
                </li>
              </ul>

              <div className="mt-6">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-white font-medium transition-colors hover:bg-slate-800">
                      Sign in to try
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/analyze"
                    className="block w-full rounded-lg bg-slate-900 px-5 py-2.5 text-center text-white font-medium transition-colors hover:bg-slate-800"
                  >
                    Start analyzing
                  </Link>
                </SignedIn>
              </div>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Premium</h3>
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  $9.99/mo
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                  Unlimited analyses
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                  Priority processing
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                  Priority support
                </li>
              </ul>

              <div className="mt-6">
                <button
                  className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium transition-colors hover:bg-indigo-700"
                  type="button"
                >
                  Upgrade (demo)
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  This is a demo button for the assignment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} AI Vision Analyzer</p>
            <p className="text-slate-400">
              Built with Next.js (Pages Router), FastAPI, Clerk, and OpenAI.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
