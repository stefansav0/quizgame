
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

const OWNER_TOKEN_KEY = "nhie_owner_token";

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

export default function ShareScreen({
  createdChallengeId,
  handleDeleteChallenge,
  isDeleting,
}) {
  const [baseUrl, setBaseUrl] = useState("");

  const [copiedLink, setCopiedLink] = useState(false);
  const [copyError, setCopyError] = useState("");

  const [showDashboard, setShowDashboard] =
    useState(false);

  const [dashboard, setDashboard] = useState(null);

  const [dashboardLoading, setDashboardLoading] =
    useState(false);

  const [dashboardError, setDashboardError] =
    useState("");

  const [expandedAttempt, setExpandedAttempt] =
    useState(null);

  // ------------------------------------------
  // 1. DETECT WEBSITE URL
  // ------------------------------------------

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (!copiedLink) return;

    const timer = setTimeout(() => {
      setCopiedLink(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedLink]);

  const shareLink = baseUrl
    ? `${baseUrl}/nhie/${encodeURIComponent(
        createdChallengeId
      )}`
    : "";

  const isLocalhost =
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
      baseUrl
    );

  const shareText =
    `I just confessed my secrets! 🤫\n\n` +
    `Can you guess what I've done?\n\n` +
    `Play my Never Have I Ever quiz on GetKnowify!\n\n` +
    shareLink;

  // ------------------------------------------
  // 2. COPY SHARE LINK
  // ------------------------------------------

  const copyToClipboard = async () => {
    if (!shareLink) return;

    setCopyError("");

    try {
      await navigator.clipboard.writeText(
        shareLink
      );

      setCopiedLink(true);
    } catch (error) {
      console.error(
        "Failed to copy share link:",
        error
      );

      setCopyError(
        "Unable to copy automatically. Please select the link above and copy it manually."
      );
    }
  };

  // ------------------------------------------
  // 3. FETCH SECURE OWNER DASHBOARD
  // ------------------------------------------

  const loadDashboard = useCallback(async () => {
    if (!createdChallengeId) {
      setDashboardError(
        "Challenge ID is missing."
      );
      return;
    }

    setDashboardLoading(true);
    setDashboardError("");

    try {
      let ownerToken = "";

      try {
        ownerToken =
          localStorage.getItem(
            OWNER_TOKEN_KEY
          ) || "";
      } catch {
        throw new Error(
          "Browser storage is unavailable. Cannot access ownership credentials."
        );
      }

      if (!ownerToken) {
        throw new Error(
          "Ownership token not found. If this is an older challenge, its private dashboard may require account recovery or verified support."
        );
      }

      const response = await fetch(
        `/api/nhie/${encodeURIComponent(
          createdChallengeId
        )}/dashboard`,
        {
          method: "GET",
          headers: {
            "x-owner-token": ownerToken,
          },
          cache: "no-store",
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to load your dashboard."
        );
      }

      setDashboard(data);
    } catch (error) {
      console.error(
        "NHIE dashboard fetch error:",
        error
      );

      setDashboardError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDashboardLoading(false);
    }
  }, [createdChallengeId]);

  // ------------------------------------------
  // 4. OPEN OR CLOSE DASHBOARD
  // ------------------------------------------

  const toggleDashboard = () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }

    setShowDashboard(true);
    setExpandedAttempt(null);

    loadDashboard();
  };

  // ------------------------------------------
  // 5. DASHBOARD DATA
  // ------------------------------------------

  const stats = dashboard?.stats || dashboard;

  const totalPlays = safeNumber(
    stats?.totalPlays
  );

  const averageScore = safeNumber(
    stats?.averageScore
  );

  const highestScore = safeNumber(
    stats?.highestScore
  );

  const totalQuestions = safeNumber(
    stats?.totalQuestions
  ) || 10;

  const leaderboard = Array.isArray(
    dashboard?.leaderboard
  )
    ? dashboard.leaderboard
    : [];

  const recentAttempts = Array.isArray(
    dashboard?.recentAttempts
  )
    ? dashboard.recentAttempts
    : [];

  // ------------------------------------------
  // 6. SHARE SCREEN
  // ------------------------------------------

  return (
    <motion.div
      key="step-11"
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="relative flex w-full flex-col items-center overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 text-center shadow-2xl sm:p-8 md:p-12"
    >
      {/* Background decoration */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-[200%] -translate-x-1/2 bg-emerald-500/5 blur-[100px]" />

      {/* Header */}

      <div className="relative z-10 mb-5 text-6xl drop-shadow-md sm:text-7xl">
        🔥
      </div>

      <h2 className="relative z-10 mb-3 text-3xl font-black text-slate-900 sm:text-4xl">
        Challenge is LIVE!
      </h2>

      <p className="relative z-10 mb-8 max-w-md text-sm font-medium leading-7 text-slate-500 sm:text-base">
        Your Never Have I Ever challenge is
        ready! Share it with friends and
        discover who knows your secrets best.
      </p>

      {/* ======================================
          SHARE SECTION
      ====================================== */}

      <div className="relative z-10 w-full space-y-6 text-left">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="text-sm font-black uppercase tracking-wide text-slate-700">
              Send to Friends
            </p>

            <span className="rounded-md border border-emerald-200 bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
              Active Link
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <input
              readOnly
              value={shareLink}
              aria-label="Your challenge link"
              onFocus={(event) =>
                event.target.select()
              }
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-4 font-mono text-sm text-slate-800 shadow-inner outline-none transition-colors focus:border-emerald-500"
            />

            <button
              type="button"
              onClick={copyToClipboard}
              disabled={!shareLink}
              className="rounded-xl bg-emerald-500 px-6 py-4 font-black text-white shadow-md transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50"
            >
              {copiedLink
                ? "Copied! ✔"
                : "🔗 Copy Link"}
            </button>
          </div>

          {copyError && (
            <p
              role="alert"
              className="mt-3 text-xs font-medium text-rose-600"
            >
              {copyError}
            </p>
          )}

          {isLocalhost && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-800">
              ⚠️ This is a local development
              link. Friends on other devices
              cannot use localhost. Deploy your
              game before sharing publicly.
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={
                shareLink && !isLocalhost
                  ? `https://wa.me/?text=${encodeURIComponent(
                      shareText
                    )}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={
                !shareLink || isLocalhost
              }
              onClick={(event) => {
                if (!shareLink || isLocalhost) {
                  event.preventDefault();
                }
              }}
              className={`flex min-h-12 items-center justify-center rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 px-2 py-3 text-center text-sm font-bold text-[#159447] transition-colors hover:bg-[#25D366]/20 ${
                !shareLink || isLocalhost
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              WhatsApp
            </a>

            <a
              href={
                shareLink && !isLocalhost
                  ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      "Can you guess my secrets? Take my Never Have I Ever quiz!"
                    )}&url=${encodeURIComponent(
                      shareLink
                    )}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={
                !shareLink || isLocalhost
              }
              onClick={(event) => {
                if (!shareLink || isLocalhost) {
                  event.preventDefault();
                }
              }}
              className={`flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-2 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 ${
                !shareLink || isLocalhost
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              X (Twitter)
            </a>
          </div>
        </div>

        {/* ======================================
            OWNER DASHBOARD SECTION
        ====================================== */}

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-amber-800">
              Track Your Results
            </p>

            <span className="rounded-md border border-amber-200 bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
              🔒 Secret Scoreboard
            </span>
          </div>

          <p className="mb-5 text-center text-sm leading-6 text-amber-800/80">
            See how many friends have played
            your challenge and compare their
            scores.
          </p>

          <button
            type="button"
            onClick={toggleDashboard}
            aria-expanded={showDashboard}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-4 text-base font-black text-white shadow-md transition-all hover:bg-amber-600 active:scale-[0.98]"
          >
            {showDashboard
              ? "Hide My Dashboard ↑"
              : "🏆 Go to My Dashboard →"}
          </button>

          {/* PRIVATE DASHBOARD */}

          {showDashboard && (
            <div className="mt-6 space-y-5">
              {/* Loading */}

              {dashboardLoading && (
                <div
                  role="status"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-white p-6"
                >
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />

                  <span className="text-sm font-semibold text-slate-600">
                    Loading your results...
                  </span>
                </div>
              )}

              {/* Error */}

              {dashboardError && (
                <div
                  role="alert"
                  className="rounded-2xl border border-rose-200 bg-rose-50 p-4"
                >
                  <p className="text-sm font-semibold leading-6 text-rose-700">
                    {dashboardError}
                  </p>

                  <button
                    type="button"
                    onClick={loadDashboard}
                    disabled={dashboardLoading}
                    className="mt-3 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Successful dashboard */}

              {dashboard && !dashboardError && (
                <div className="space-y-5">
                  {/* Statistics */}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
                      <div className="mb-2 text-2xl">
                        👥
                      </div>

                      <p className="text-3xl font-black text-emerald-600">
                        {totalPlays}
                      </p>

                      <p className="mt-2 text-xs font-bold text-slate-500">
                        Total Plays
                      </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-white p-4 text-center shadow-sm">
                      <div className="mb-2 text-2xl">
                        📊
                      </div>

                      <p className="text-3xl font-black text-blue-600">
                        {averageScore}
                      </p>

                      <p className="mt-2 text-xs font-bold text-slate-500">
                        Average Score
                      </p>
                    </div>

                    <div className="rounded-2xl border border-purple-100 bg-white p-4 text-center shadow-sm">
                      <div className="mb-2 text-2xl">
                        🏆
                      </div>

                      <p className="text-3xl font-black text-purple-600">
                        {highestScore}
                      </p>

                      <p className="mt-2 text-xs font-bold text-slate-500">
                        Highest Score
                      </p>
                    </div>
                  </div>

                  {/* Score denominator */}

                  <p className="text-center text-xs font-medium text-amber-800">
                    Scores are out of{" "}
                    {totalQuestions} questions.
                  </p>

                  {/* Refresh */}

                  <button
                    type="button"
                    onClick={loadDashboard}
                    disabled={dashboardLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
                  >
                    🔄 Refresh Results
                  </button>

                  {/* ==================================
                      LEADERBOARD
                  ================================== */}

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50 p-4">
                      <h3 className="text-lg font-black text-slate-900">
                        🏆 Friends Leaderboard
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Friends ranked by their quiz
                        scores.
                      </p>
                    </div>

                    {leaderboard.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="mb-3 text-4xl">
                          🎯
                        </div>

                        <p className="font-bold text-slate-700">
                          No scores yet!
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Share your challenge
                          with friends. Their scores
                          will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {leaderboard.map(
                          (player, index) => (
                            <div
                              key={
                                player.id ||
                                `${index}-${player.friendName}`
                              }
                              className="flex items-center gap-3 p-4"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-800">
                                {index === 0
                                  ? "🥇"
                                  : index === 1
                                    ? "🥈"
                                    : index === 2
                                      ? "🥉"
                                      : index + 1}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="break-words text-sm font-bold text-slate-800">
                                  {player.friendName ||
                                    "Friend"}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {formatDate(
                                    player.date
                                  )}
                                </p>
                              </div>

                              <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">
                                {player.score}/
                                {player.totalQuestions ||
                                  totalQuestions}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* ==================================
                      RECENT ATTEMPTS
                  ================================== */}

                  {recentAttempts.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-100 bg-slate-50 p-4">
                        <h3 className="text-lg font-black text-slate-900">
                          📋 Recent Attempts
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Open a player's result
                          to review their answers.
                        </p>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {recentAttempts.map(
                          (attempt, index) => {
                            const attemptKey =
                              attempt.id ||
                              String(index);

                            const expanded =
                              expandedAttempt ===
                              attemptKey;

                            const details =
                              Array.isArray(
                                attempt.detailedResults
                              )
                                ? attempt.detailedResults
                                : [];

                            return (
                              <div
                                key={attemptKey}
                                className="p-4"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedAttempt(
                                      expanded
                                        ? null
                                        : attemptKey
                                    )
                                  }
                                  aria-expanded={
                                    expanded
                                  }
                                  className="flex w-full items-center justify-between gap-3 text-left"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="break-words text-sm font-bold text-slate-800">
                                      {attempt.friendName ||
                                        "Friend"}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                      {formatDate(
                                        attempt.date
                                      )}
                                    </p>
                                  </div>

                                  <div className="flex shrink-0 items-center gap-2">
                                    <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                                      {attempt.score}/
                                      {totalQuestions}
                                    </span>

                                    <span className="text-sm text-slate-500">
                                      {expanded
                                        ? "▲"
                                        : "▼"}
                                    </span>
                                  </div>
                                </button>

                                {expanded && (
                                  <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                                    {details.length ===
                                    0 ? (
                                      <p className="text-sm text-slate-500">
                                        Detailed answers
                                        are not available
                                        for this attempt.
                                      </p>
                                    ) : (
                                      details.map(
                                        (
                                          result,
                                          resultIndex
                                        ) => (
                                          <div
                                            key={
                                              resultIndex
                                            }
                                            className={`rounded-xl border p-3 ${
                                              result.isCorrect
                                                ? "border-emerald-200 bg-emerald-50"
                                                : "border-rose-200 bg-rose-50"
                                            }`}
                                          >
                                            <p className="mb-2 break-words text-sm font-bold text-slate-800">
                                              {resultIndex +
                                                1}
                                              .{" "}
                                              {
                                                result.statement
                                              }
                                            </p>

                                            <p className="text-xs leading-6 text-slate-600">
                                              Friend guessed:{" "}
                                              <strong>
                                                {
                                                  result.guess
                                                }
                                              </strong>
                                            </p>

                                            <p className="text-xs leading-6 text-slate-600">
                                              Your answer:{" "}
                                              <strong>
                                                {
                                                  result.correctAnswer
                                                }
                                              </strong>
                                            </p>

                                            <p
                                              className={`mt-2 text-xs font-black ${
                                                result.isCorrect
                                                  ? "text-emerald-700"
                                                  : "text-rose-700"
                                              }`}
                                            >
                                              {result.isCorrect
                                                ? "✔ Correct"
                                                : "✘ Incorrect"}
                                            </p>
                                          </div>
                                        )
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ======================================
          DELETE CHALLENGE
      ====================================== */}

      <div className="relative z-10 mt-10 w-full border-t border-slate-100 pt-6">
        <p className="mb-4 text-center text-xs leading-6 text-slate-400">
          You can have one active challenge
          saved in this browser at a time.
          Delete it to create another.
        </p>

        <button
          type="button"
          onClick={handleDeleteChallenge}
          disabled={isDeleting}
          className="mx-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500 transition-colors hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
          ) : (
            <span className="text-lg">
              🗑️
            </span>
          )}

          {isDeleting
            ? "Deleting..."
            : "Delete Current Quiz & Start Over"}
        </button>
      </div>
    </motion.div>
  );
}
