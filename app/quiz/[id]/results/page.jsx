import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score"; // Make sure this matches your schema name
import Link from "next/link";
import DashboardList from "./DashboardList";
import FloatingLayout from "@/components/FloatingLayout";

const SITE_URL = "https://getknowify.com";

// ==========================================
// SEO METADATA (Prevent indexing of private dashboards)
// ==========================================
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return {
    title: "Quiz Results Dashboard | GetKnowify",
    description: "View the leaderboard and detailed answers for your friendship quiz.",
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/dashboard/${id}`,
    },
  };
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default async function ResultsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectDB();
  const quiz = await Quiz.findById(id).lean();

  if (!quiz) {
    return (
      <FloatingLayout activeTheme="light">
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 font-sans text-2xl font-bold">
          Quiz not found! 🕵️‍♂️
        </div>
      </FloatingLayout>
    );
  }

  const scores = await Score.find({ quizId: id })
    .sort({ score: -1, createdAt: 1 })
    .lean();

  // 🔥 BULLETPROOF DATA FORMATTING
  const formattedScores = scores.map((entry) => {
    let detailedAnswers = [];

    if (entry.selectedAnswers && entry.selectedAnswers.length > 0 && quiz.questions) {
      detailedAnswers = quiz.questions.map((q, idx) => {
        const rawSelected = entry.selectedAnswers[idx];
        const selectedIdx = rawSelected !== null && rawSelected !== undefined ? Number(rawSelected) : -1;
        const correctIdx = q.correctAnswer !== undefined && q.correctAnswer !== null ? Number(q.correctAnswer) : 0;
        const isCorrect = selectedIdx === correctIdx;
        const selectedText = selectedIdx >= 0 && q.options[selectedIdx] ? q.options[selectedIdx] : "Skipped";
        const correctText = q.options[correctIdx] || q.options[0];

        return {
          question: q.question,
          selectedText: selectedText,
          correctText: correctText,
          isCorrect: isCorrect,
        };
      });
    }

    return {
      _id: entry._id.toString(),
      playerName: entry.playerName,
      score: entry.score,
      createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : new Date().toISOString(),
      answers: detailedAnswers,
    };
  });

  return (
    <FloatingLayout activeTheme="light">
      <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ==========================================
              DASHBOARD CARD (Light Theme)
          =========================================== */}
          <div className="w-full max-w-lg mx-auto relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-16">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2 text-emerald-600">
                {quiz.creatorName}'s Dashboard
              </h1>
              <p className="text-slate-500 font-medium">
                Click "View Answers" to see exactly what they guessed!
              </p>
            </div>

            {/* Stats Box */}
            <div className="flex justify-between items-center bg-slate-100 p-4 rounded-2xl mb-8 border border-slate-200">
              <div className="text-center w-1/2 border-r border-slate-200">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Players</p>
                <p className="text-3xl font-black text-slate-800">{scores.length}</p>
              </div>
              <div className="text-center w-1/2">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Questions</p>
                <p className="text-3xl font-black text-slate-800">{quiz.questions.length}</p>
              </div>
            </div>

            {/* RENDER THE LIST 
                NOTE: Make sure your DashboardList component also uses light theme classes!
            */}
            <DashboardList
              scores={formattedScores}
              totalQuestions={quiz.questions.length}
            />

            <div className="mt-8 flex gap-4">
              <Link
                href="/create"
                className="flex-1 text-center bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
              >
                Create New Quiz
              </Link>
            </div>
          </div>

          {/* ==========================================
              HIGH-QUALITY CONTENT FOR ADSENSE (LIGHT THEME)
          =========================================== */}
          <div className="max-w-3xl mx-auto prose prose-slate">
            
            <section className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Understanding Your Quiz Dashboard</h2>
              <p className="text-slate-600 leading-8 mb-4">
                Welcome to your personal quiz dashboard. This page is your command center for seeing exactly how your friends, family, and followers performed on the quiz you created. 
                Unlike public quiz pages, this dashboard is private and only accessible via the direct link you received when you created the quiz.
              </p>
              <p className="text-slate-600 leading-8 mb-4">
                The leaderboard above ranks all participants based on their final score. In the event of a tie, the player who completed the quiz in the shortest amount of time is ranked higher. 
                You can click on any player's name to expand their detailed answers and see exactly which questions they got right and which ones they missed.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-6">How to Use Your Results</h2>
              <p className="text-slate-600 leading-8 mb-4">
                Getting the results is just the beginning! Here are some creative ways to use this data to engage with your friends:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-7">
                <li><strong>The "Roast" Session:</strong> Find the friend who scored the lowest and playfully tease them about the specific questions they got wrong. It's a great icebreaker for your next group hangout.</li>
                <li><strong>The "Soulmate" Reveal:</strong> Share the name of the person who scored 100% on your social media. Tag them and let everyone know they are officially your best friend.</li>
                <li><strong>Start a Conversation:</strong> If someone got a question wrong that you thought was obvious, reach out to them! It's a perfect excuse to catch up and share the memory associated with that question.</li>
                <li><strong>Create a Sequel:</strong> Did everyone struggle with a specific topic? Create a "Part 2" quiz that dives deeper into those areas to see if they can redeem themselves.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Frequently Asked Questions About Results</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">Can I delete a player's score?</h3>
                  <p className="text-slate-600 leading-7">
                    Currently, scores are permanent once submitted to ensure the integrity of the leaderboard. If you need to remove a specific entry due to inappropriate behavior, please contact our support team with the quiz ID and the player's name.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">Why did someone score 0%?</h3>
                  <p className="text-slate-600 leading-7">
                    A score of 0% usually means the player either didn't know you very well, or they intentionally clicked random answers to see what would happen. It's all part of the fun!
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">Is my dashboard data private?</h3>
                  <p className="text-slate-600 leading-7">
                    Yes. This dashboard is protected by your unique quiz ID. Only people who have the exact URL can view these results. We do not publish your dashboard to search engines. If you want to share the results with your friends, you can simply copy the URL from your browser and send it to them.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Privacy and Responsible Data Handling</h2>
              <p className="text-slate-600 leading-8 mb-4">
                At GetKnowify, we take your privacy seriously. The data shown on this dashboard is stored securely in our database and is only used to provide you with the quiz results functionality. 
                We do not sell your quiz data, your friends' names, or their answers to any third parties.
              </p>
              <p className="text-slate-600 leading-8 mb-4">
                As a quiz creator, you are responsible for ensuring that your questions do not ask for sensitive personal information. If you ever decide to delete your quiz, all associated scores and dashboard data will be permanently removed from our servers.
              </p>
              <p className="text-slate-600 leading-8">
                For more information, please read our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline font-medium">Privacy Policy</Link>.
              </p>
            </section>

            <div className="text-center mt-12 pt-8 border-t border-slate-200">
              <Link 
                href="/create" 
                className="inline-flex rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-700 shadow-md shadow-emerald-200"
              >
                Create Another Quiz
              </Link>
            </div>

          </div>
        </div>
      </main>
    </FloatingLayout>
  );
}