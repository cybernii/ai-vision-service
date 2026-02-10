import { useEffect, useMemo, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

type UsageResponse = {
  tier: "free" | "premium";
  used: number;
  limit: number | null;
};

export default function AnalyzePage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loadingUsage, setLoadingUsage] = useState(false);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);

  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Redirect signed-out users to home (keep it simple)
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/");
  }, [isLoaded, isSignedIn, router]);

  // Preview URL lifecycle
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const usageText = useMemo(() => {
    if (!usage) return "—";
    if (usage.tier === "premium") return "Premium • Unlimited";
    return `Free • ${usage.used}/${usage.limit ?? 1} used`;
  }, [usage]);

  const limitReached =
    usage?.tier === "free" && (usage.used ?? 0) >= (usage.limit ?? 1);

  async function fetchUsage() {
    setError("");
    setLoadingUsage(true);
    try {
      const token = await getToken();
      const res = await fetch("/api/usage", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = data?.detail || `Failed to fetch usage (${res.status})`;
        throw new Error(msg);
      }

      setUsage(data as UsageResponse);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch usage");
    } finally {
      setLoadingUsage(false);
    }
  }

  async function runAnalyze() {
    setError("");
    setResult("");

    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    setLoadingAnalyze(true);
    try {
      const token = await getToken();

      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = data?.detail || `Analyze failed (${res.status})`;
        throw new Error(msg);
      }

      setResult((data.description || "").trim());
      setUsage({ tier: data.tier, used: data.used, limit: data.limit });
    } catch (e: any) {
      setError(e?.message ?? "Analyze failed");
      // best-effort refresh usage
      await fetchUsage();
    } finally {
      setLoadingAnalyze(false);
    }
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchUsage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Image Analyzer
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Upload an image and get a detailed AI description.
            </p>
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
              <div className="hidden sm:block rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
                {loadingUsage ? "Loading usage…" : usageText}
              </div>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Main grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Upload card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Upload an image
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Supported: JPG, JPEG, PNG, WEBP • Max 5MB
                </p>
              </div>

              {usage?.tier === "premium" && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  Premium
                </span>
              )}
              {usage?.tier === "free" && (
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-100">
                  Free
                </span>
              )}
            </div>

            {/* File input */}
            <div className="mt-5">
              <label className="block">
                <span className="sr-only">Choose image</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    setError("");
                    setResult("");
                    const f = e.target.files?.[0] ?? null;
                    setFile(f);
                  }}
                  className="block w-full text-sm text-slate-600
                    file:mr-4 file:rounded-lg file:border-0
                    file:bg-slate-900 file:px-4 file:py-2
                    file:text-white file:text-sm file:font-medium
                    hover:file:bg-slate-800
                    file:transition-colors"
                />
              </label>

              {previewUrl ? (
                <div className="mt-4">
                  <div className="text-sm font-medium text-slate-700">
                    Preview
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="mt-2 max-h-72 w-full rounded-xl object-contain ring-1 ring-slate-200 bg-slate-50"
                  />
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                  Choose a file to see a preview here.
                </div>
              )}
            </div>

            {/* Analyze button */}
            <button
              onClick={runAnalyze}
              disabled={loadingAnalyze || limitReached || !file}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {limitReached
                ? "Limit reached"
                : loadingAnalyze
                ? "Analyzing…"
                : "Analyze Image"}
            </button>

            {/* Limit message */}
            {limitReached && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-100">
                <div className="font-semibold">Free tier limit reached</div>
                <div className="mt-1 text-amber-800">
                  You can analyze <span className="font-medium">1 image per session</span>.
                  Upgrade to Premium for unlimited analyses.
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-900 ring-1 ring-rose-100">
                <div className="font-semibold">Something went wrong</div>
                <div className="mt-1 text-rose-800">{error}</div>
              </div>
            )}
          </div>

          {/* Result card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-900">Result</h2>
            <p className="mt-1 text-sm text-slate-600">
              The AI-generated description will appear below.
            </p>

            <div className="mt-4 min-h-[320px] rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              {result ? (
                <p className="whitespace-pre-wrap text-slate-900 leading-relaxed">
                  {result}
                </p>
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center text-center text-slate-500">
                  <div>
                    <div className="text-sm font-medium text-slate-600">
                      No result yet
                    </div>
                    <div className="mt-1 text-sm">
                      Upload an image and click <span className="font-medium">Analyze</span>.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* tiny hint */}
            <p className="mt-3 text-xs text-slate-500">
              Tip: Try clear, well-lit images for the most accurate descriptions.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
