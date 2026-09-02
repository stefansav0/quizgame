"use client";

import { motion } from "framer-motion";
import { containerVariants } from "@/lib/animations";
import FloatingBackground from "@/components/home/FloatingBackground";
import HeroSection from "@/components/home/HeroSection";
import LatestBlogs from "@/components/LatestBlogs";
import { PopularQuestions } from "@/components/home/Articles";
import FAQSection from "@/components/home/FAQSection";
import Image from "next/image";
import Link from "next/link";
import AdBanner from "@/components/ads/AdBanner";

export default function HomeClient() {
  return (
    <main className="w-full">
      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col items-center"
        >
          {/* =====================================================
              HERO
              ===================================================== */}
          <HeroSection />

          <AdBanner placement="HOME_TOP" />

         {/* =====================================================
    QUIZ CARDS
    ===================================================== */}
<section className="w-full py-5 sm:py-7">
  <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-4 px-2 sm:gap-5">

    {/* Secret Letter */}
    <Link
      href="/letter/create"
      className="group w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-10px)] lg:w-[300px]"
    >
      <div className="flex h-40 items-center justify-center bg-white sm:h-44">
        <Image
          src="/ms.png"
          alt="Secret Letter - Express your feelings anonymously"
          width={500}
          height={500}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-3 pb-4 pt-2 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          Secret Letter
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-600">
          Express your feelings With your Loved one.
        </p>
      </div>
    </Link>


    {/* Never Have I Ever */}
    <Link
      href="/nhie"
      className="group w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-10px)] lg:w-[300px]"
    >
      <div className="flex h-40 items-center justify-center bg-white sm:h-44">
        <Image
          src="/never-removebg-preview.png"
          alt="Never Have I Ever - Test your friendship"
          width={500}
          height={500}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-3 pb-4 pt-2 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          Never Have I Ever
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-600">
          Test your friendship with this fun game and see who really knows you.
        </p>
      </div>
    </Link>


    {/* BFF Quiz */}
    <Link
      href="/bff-quiz"
      className="group w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-10px)] lg:w-[300px]"
    >
      <div className="flex h-40 items-center justify-center bg-white sm:h-44">
        <Image
          src="/bff-q.png"
          alt="BFF Quiz - Find out how well your best friend knows you"
          width={500}
          height={500}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-3 pb-4 pt-2 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          BFF Quiz
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-600">
          Find out how well your best friend really knows you.
        </p>
      </div>
    </Link>


    {/* Fake Friend Quiz */}
    <Link
      href="/fake-friend-quiz"
      className="group w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-10px)] lg:w-[300px]"
    >
      <div className="flex h-40 items-center justify-center bg-white sm:h-44">
        <Image
          src="/ffq.png"
          alt="Fake Friend Quiz - Test your friendship"
          width={500}
          height={500}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-3 pb-4 pt-2 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          Fake Friend Quiz
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-600">
          Put your friendship to the test and see who really knows you.
        </p>
      </div>
    </Link>


    {/* Best Friend Quiz */}
    <Link
      href="/bestfriend-quiz"
      className="group w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-10px)] lg:w-[300px]"
    >
      <div className="flex h-40 items-center justify-center bg-white sm:h-44">
        <Image
          src="/best-q.png"
          alt="Best Friend Quiz - Challenge your best friend"
          width={500}
          height={500}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-3 pb-4 pt-2 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          Best Friend Quiz
        </h2>

        <p className="mt-1 text-sm leading-5 text-gray-600">
          Challenge your best friend and compare your answers.
        </p>
      </div>
    </Link>

  </div>
</section>

<AdBanner placement="HOME_MIDDLE" />

          {/* =====================================================
              LATEST BLOGS
              ===================================================== */}
          <LatestBlogs />

          {/* =====================================================
              POPULAR QUESTIONS
              ===================================================== */}
          <PopularQuestions />

          <AdBanner placement="HOME_BOTTOM" />

         {/* =====================================================
    ABOUT GETKNOWIFY
    ===================================================== */}
<section className="w-full py-12">
  <div className="mx-auto max-w-5xl px-4 sm:px-6">

    <div className="mx-auto max-w-3xl text-center">
      <h2 className="inline-flex rounded-full bg-pink-50 px-4 py-1.5 text-sm font-semibold text-pink-600">
        About GetKnowify
      </h2>

      <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
        GetKnowify is a fun social quiz platform where you can create a
        personalized quiz and challenge your friends to see how well they
        really know you.
      </p>
    </div>

  </div>
</section>


{/* =====================================================
    HOW IT WORKS
    ===================================================== */}
<section className="w-full py-12">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">

    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-bold uppercase tracking-wider text-pink-500">
        Simple & Fun
      </span>

      <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        How It Works
      </h2>

      <p className="mt-3 text-sm text-gray-600 sm:text-base">
        Create your quiz and challenge your friends in four simple steps.
      </p>
    </div>

    {/* Steps */}
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {/* Step 1 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-pink-500">
          Step 01
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          Create
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Choose questions and create your personalized quiz.
        </p>
      </div>


      {/* Step 2 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-purple-500">
          Step 02
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          Share
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Share your unique quiz link with your friends.
        </p>
      </div>


      {/* Step 3 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-blue-500">
          Step 03
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          Challenge
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Let your friends answer and guess your choices.
        </p>
      </div>


      {/* Step 4 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-yellow-500">
          Step 04
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          See Results
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Compare scores and find out who knows you best.
        </p>
      </div>

    </div>

  </div>
</section>

<FloatingBackground />




          {/* =====================================================
              FAQ
              ===================================================== */}
          <FAQSection />

        </motion.div>
      </div>
    </main>
  );
}