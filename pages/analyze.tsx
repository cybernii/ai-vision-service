import { useEffect, useMemo, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
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

  // Redirect if signed out
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
    if (usage.tier === "premium") return "Premium: Unlimited";
    return `Free: ${usage.used}/${usage.limit ?? 1} used`;
  }, [usage]);

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
      setLoadingUsage(fal);
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

      setResult(data.description || "");
      setUsage({ tier: data.tier, used: data.used, limit: data.limit });
    } catch (e: any) {
      setError(e?.message ?? "Analyze failed");
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

  const limitReached =
    usage?.tier === "free" && (usage.used ?? 0) >= (usage.limit ?? 1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Analyzer</h1>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="text-sm text-slate-600">
                {loadingUsage ? "Loading usage…" : usageText}
              </div>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <section className="m8 grid gap-6 md:grid-cols-2">
          {/* Upload */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Upload an image</h2>
            <p className="mt-1 text-sm text-slate-600">
              Supported: JPG, JPEG, PNG, WEBP (max 5MB)
            </p>

            <input
              className="mt-4 block w-full text-sm"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                setError("");
                setResult("");
                const f = e.target.files?.[0] ?? null;
                setFile(f);
              }}
            />

            {previewUrl && (
              <div className="mt-4">
                <div className="text-sm font-medium text-slate-700">Preview</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="preview"
                  className="mt-2 max-h-64 w-full rounded-xl object-contain ring-1 ring-slate-200"
                />
              </div>
            )}

            <button
              onClick={runAnalyze}
              disabled={loadingAnalyze || limitReached}
              className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {limitReached ? "Limit reached" : loadingAnalyze ? "Analyzing…" : "Analyze"}
            </button>

            {limitReached && (
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                You’ve reached the Free tier limit (1 analysis per session).
                Upgrade to Premium for unlimited analyses.
              </p>
            )}

            {error && (
              <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">
                {error}
              </p>
            )}
          </div>

          {/* Result */}
          <div className="ded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Result</h2>
            <p className="mt-1 text-sm text-slate-600">
              The AI-generated description will appear here.
            </p>

            <div className="mt-4 min-h-[200px] rounded-xl bg-slate-50 p-4 text-slate-800 ring-1 ring-slate-200">
              {result ? (
                <p className="whitespace-pre-wrap">{result}</p>
              ) : (
                <p className="text-slate-500">No result yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
