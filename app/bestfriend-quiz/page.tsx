import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "BFF Quiz - Create a Best Friend Quiz",
  description:
    "Create your own BFF Quiz, share it with your friends, and discover who knows you best.",
};

export default function BestfriendQuizPage() {
  return (
    <main className="bg-white">

        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900">
          Best Friend Quiz
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Want to know who your real Best Friend Forever is? A BFF Quiz is a
          fun way to test how well your friends know you. Create your own quiz,
          share it with friends, and compare their scores to find out who really
          deserves the title of your best friend.
        </p>

        <div className="flex justify-center mb-8">
                          <Image
                            src="/best.png"
                            alt="Fake Friend Quiz"
                            width={280}
                            height={280}
                            priority
                            className="w-48 md:w-64 lg:w-72 h-auto object-contain drop-shadow-lg"
                          />
                        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/create"
            className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 transition"
          >
            Create Quiz
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </section>


      <article className="max-w-4xl mx-auto px-6 py-20">

        <h2 className="mt-16 text-3xl font-bold">
            What Is a Best Friend Quiz?
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
          A best friend test is a short quiz made by you, about you. You answer questions about your personality, habits, and preferences — then share a link with friends. Each friend tries to guess your answers. Their score tells you (and them) exactly how well they know you.
        </p>


        <h2 className="mt-16 text-3xl font-bold">
            How Best Friend Quiz worked
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
            Enter your name to begin.
Select from question options—pick the ones that truly reflect who you are.
Answer honestly and mark your responses—truthful answers make the scores more meaningful.
Share your quiz link on WhatsApp, Instagram, or any platform your friends use.
Watch the Friendboard grow with friends’ names and scores in real time. The person at the top is your ultimate best friend!

</p>


<h2 className="mt-16 text-3xl font-bold">
            Sample BFF Quiz Questions
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
            Here are some fun and engaging sample BFF quiz questions to include in your quiz.
            </p>

            <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700 leading-8">
                <li>What is my favorite snack?</li>
                <li>What is my dream vacation destination?</li>
                <li>What is my favorite movie genre?</li>
                <li>What is my biggest fear?</li>
                <li>What is my favorite way to spend a weekend?</li>
                <li>What’s my favorite clothing style or outfit?</li>
                <li>What’s the most adventurous thing I’ve ever done?</li>
            </ul>


            <h2 className="mt-16 text-3xl font-bold">
                Frequently Asked Questions (FAQ) about the Best Friend Quiz
                </h2>
                
                <div className="mt-8 space-y-8">
                    <div>
                        <h3 className="font-semibold text-xl">
              1. What is the purpose of the quiz?
            </h3>

            <p className="mt-2 text-gray-700">
               quiz is designed to see how well your friends know you by answering questions about your personality, habits, and preferences. It’s a fun way to test your friendship and discover new things about each other.
            </p>
                    </div>


                </div>

                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                       2. How do I create my quiz?
                    </h3>

                    <p className="mt-2 text-gray-700">
                        Simply enter your name, pick questions from over 75 options that best represent you, and answer honestly. Then, share your unique link with your friends.
                        </p>

                </div>

                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                        3. Can I choose specific questions?
                    </h3>

                    <p className="mt-2 text-gray-700">
                        Yes, you can select from a variety of questions to customize your quiz and make it more personal.
                    </p>

                </div>


                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-x1">
                        4. How do my friends participate?
                    </h3>

                    <p className="mt-2 text-gray-700">
                        They receive your shared link, answer the questions based on what they think are your answers, and submit their guesses.
                    </p>  

                </div>     


                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                        5. How are the scores calculated?
                    </h3>

                    <p className="mt-2 text-gray-700">
                       Your friends’ answers are compared to your actual responses. The closer their guesses, the higher their score. The results are displayed on a live Friendboard.
                    </p>

                </div>  

                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                        6. Can I share the quiz link on any platform?
                    </h3>

                    <p className="mt-2 text-gray-700">
                      Absolutely! You can share it on WhatsApp, Instagram, Facebook, or any other social media platform.
                    </p>

                </div>

                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                        7. Can I see the results afterward?
                    </h3>

                    <p className="mt-2 text-gray-700">
                      Yes, you can view the leaderboard anytime to see how everyone scored and who knows you best.
                    </p>

                </div>    

                <div className="mt-8 space-y-8">
                    <h3 className="font-semibold text-xl">
                        8. Is my information private?
                    </h3>

                    <p className="mt-2 text-gray-700">
                      Your responses and scores are shared only with those you invite. Always ensure you trust your friends with your personal answers.
                    </p>

                </div>   


                {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to challenge your friends?
          </h2>

          <p className="mt-4 text-gray-600">
            It only takes a minute to create your quiz.
          </p>

          <Link
            href="/create"
            className="inline-block mt-8 rounded-xl bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 transition"
          >
            Start Now
          </Link>
        </div>
      </section>















      </article>



















    </main>
    );
}