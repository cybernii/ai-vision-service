import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-black">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-black text-white shadow-lg">
              <span className="text-sm font-bold">AI</span>
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-black">
                AI Vision Analyzer
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Powered by OpenAI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-xl bg-black px-5 py-2.5 text-white font-medium transition-all hover:bg-gray-900 hover:shadow-lg hover:scale-105 active:scale-95">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/analyze"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Go to Analyzer
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-12 overflow-hidden rounded-3xl border-2 border-black bg-white shadow-2xl">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                AI-powered image understanding
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-black md:text-5xl lg:text-6xl">
                Understand images instantly with AI vision.
              </h1>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Upload an image and get a detailed description of objects, colors,
                mood, and notable features in seconds — secured with authentication
                and tiered usage limits.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <SignedOut>
                  <SignInButton>
                    <button className="group rounded-xl bg-blue-600 px-7 py-3.5 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95">
                      Get started
                      <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </SignInButton>

                  <a
                    href="#features"
                    className="rounded-xl border-2 border-black bg-white px-7 py-3.5 text-black font-semibold transition-all hover:bg-gray-50 hover:shadow-lg"
                  >
                    View features
                  </a>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/analyze"
                    className="group rounded-xl bg-blue-600 px-7 py-3.5 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    Analyze an image
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>

                  <a
                    href="#pricing"
                    className="rounded-xl border-2 border-black bg-white px-7 py-3.5 text-black font-semibold transition-all hover:bg-gray-50 hover:shadow-lg"
                  >
                    See pricing
                  </a>
                </SignedIn>
              </div>

              {/* Small badges */}
              <div className="mt-8 flex flex-wrap gap-2 text-xs text-black font-medium">
                {[
                  "JWT-protected API",
                  "Free & Premium tiers",
                  "FastAPI backend",
                  "OpenAI Vision",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-4 py-2 border border-gray-300 shadow-sm hover:shadow-md transition-shadow hover:border-black"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side visual */}
            <div className="relative rounded-3xl bg-blue-600 p-8 text-white shadow-2xl border-2 border-black">
              
              <div className="relative">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  Example output
                </div>

                <div className="mt-6 rounded-2xl bg-white/10 p-6 border border-white/20 shadow-xl">
                  <p className="text-sm leading-relaxed font-light">
                    "A soft pink invitation design with floral accents and elegant
                    typography. The layout features roses along the border and a
                    pastel gradient background…"
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 text-xs">
                  {[
                    { title: "Secure", desc: "Clerk authentication" },
                    { title: "Fast", desc: "Optimized API flow" },
                    { title: "Accurate", desc: "Vision-capable model" },
                    { title: "Tiered", desc: "Free vs Premium" }
                  ].map((item) => (
                    <div key={item.title} className="group rounded-xl bg-white/10 p-5 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                      <div className="font-bold text-base mb-1">{item.title}</div>
                      <div className="opacity-80 font-light">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-black">
                Features
              </h2>
              <p className="mt-2 text-gray-700 font-medium">
                Everything you need for a clean AI vision demo app.
              </p>
            </div>
            <Link
              href="/analyze"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-2.5 text-black font-semibold transition-all hover:bg-gray-50 hover:shadow-lg hover:scale-105"
            >
              Open Analyzer
              <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Detailed descriptions",
                body: "Rich summaries including objects, scene context, and notable features.",
                icon: "🎯"
              },
              {
                title: "Secure access",
                body: "Clerk authentication with JWT verification on the backend.",
                icon: "🔒"
              },
              {
                title: "Tiered usage",
                body: "Free tier: 1 analysis per session. Premium: unlimited analyses.",
                icon: "⚡"
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border-2 border-black bg-white p-7 shadow-lg transition-all hover:shadow-2xl hover:scale-105 hover:border-blue-600"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-xl text-black mb-3">{f.title}</h3>
                <p className="text-gray-700 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-black">
              Pricing
            </h2>
            <p className="mt-2 text-gray-700 font-medium">
              Simple tiers to demonstrate usage limits.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Free */}
            <div className="group rounded-3xl border-2 border-black bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Free</h3>
                <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-bold text-black border-2 border-black">
                  $0
                </span>
              </div>

              <ul className="space-y-3 text-gray-800 mb-8">
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                  <span className="font-medium">1 analysis per session</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                  <span className="font-medium">Standard processing</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                  <span className="font-medium">Basic support</span>
                </li>
              </ul>

              <div>
                <SignedOut>
                  <SignInButton>
                    <button className="w-full rounded-xl bg-black px-6 py-3.5 text-white font-semibold transition-all hover:bg-gray-900 hover:shadow-xl hover:scale-105 active:scale-95">
                      Sign in to try
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/analyze"
                    className="block w-full rounded-xl bg-black px-6 py-3.5 text-center text-white font-semibold transition-all hover:bg-gray-900 hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    Start analyzing
                  </Link>
                </SignedIn>
              </div>
            </div>

            {/* Premium */}
            <div className="relative group rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-xl transition-all hover:shadow-2xl hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black">Premium</h3>
                    <span className="inline-block mt-1 text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg">
                    $9.99/mo
                  </span>
                </div>

                <ul className="space-y-3 text-gray-800 mb-8">
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="font-medium">Unlimited analyses</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="font-medium">Priority processing</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="font-medium">Priority support</span>
                  </li>
                </ul>

                <div>
                  <SignedOut>
                    <SignInButton>
                      <button className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95">
                        Sign in to upgrade
                      </button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <Link
                      href="/analyze"
                      className="block w-full rounded-xl bg-blue-600 px-6 py-3.5 text-center text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      Start analyzing
                    </Link>
                  </SignedIn>
                  
                  <p className="mt-3 text-xs text-gray-600 text-center font-medium">Premium features coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t-2 border-black pt-8 text-sm text-gray-600">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">© {new Date().getFullYear()} AI Vision Analyzer</p>
            <p className="text-gray-500">
              Built with Next.js (Pages Router), FastAPI, Clerk, and OpenAI.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}