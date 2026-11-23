
import { NextResponse } from "next/server";
import {
  COUNTRY_LANGUAGE_MAP,
  generateNHIEBank,
} from "@/lib/constants";
import { translateText } from "@/lib/translate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLORS = [
  "#D1FAE5",
  "#EDE9FE",
  "#FCE7F3",
  "#DBEAFE",
  "#FEF3C7",
  "#CCFBF1",
  "#F3E8FF",
  "#FFE4E6",
  "#E0F2FE",
  "#DCFCE7",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:8081",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

function respond(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: CORS_HEADERS,
  });
}

// Handle browser CORS preflight requests.
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [
      result[j],
      result[i],
    ];
  }

  return result;
}

// Get available countries and languages.
export async function GET() {
  return respond({
    success: true,
    countryLanguageMap: COUNTRY_LANGUAGE_MAP,
  });
}

// Generate NHIE questions.
export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return respond(
        {
          success: false,
          error: "Invalid JSON.",
        },
        400
      );
    }

    const country = body?.country;
    const language = body?.language;

    // Validate country and language.
    const allowedLanguages =
      COUNTRY_LANGUAGE_MAP[country];

    if (
      !Array.isArray(allowedLanguages) ||
      !allowedLanguages.includes(language)
    ) {
      return respond(
        {
          success: false,
          error: "Select a valid country and language.",
        },
        400
      );
    }

    // Get the original website question bank.
    const source = generateNHIEBank();

    if (!Array.isArray(source)) {
      return respond(
        {
          success: false,
          error: "Question bank unavailable.",
        },
        503
      );
    }

    // Remove invalid and duplicate questions.
    const unique = [
      ...new Set(
        source
          .filter(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.length <= 500
          )
          .map((value) => value.trim())
      ),
    ];

    if (unique.length < 10) {
      return respond(
        {
          success: false,
          error: "Not enough questions.",
        },
        503
      );
    }

    // Randomly select up to 50 questions.
    const selected = shuffle(unique).slice(0, 50);

    let translatedCount = 0;
    const translated = [...selected];

    // Skip translation for English.
    if (!/^(english|en)$/i.test(language.trim())) {
      // Translate in batches of 5.
      for (
        let start = 0;
        start < selected.length;
        start += 5
      ) {
        const batch = selected.slice(start, start + 5);

        const results = await Promise.all(
          batch.map(async (statement) => {
            try {
              const result = await translateText(
                statement,
                language
              );

              if (
                typeof result === "string" &&
                result.trim()
              ) {
                return result.trim();
              }
            } catch (error) {
              console.warn(
                "NHIE translation failed:",
                error
              );
            }

            // Fallback to original statement.
            return statement;
          })
        );

        results.forEach((result, index) => {
          translated[start + index] = result;

          if (result !== batch[index]) {
            translatedCount++;
          }
        });
      }
    }

    // Remove duplicate translated questions.
    const bank = [...new Set(translated)];

    if (bank.length < 10) {
      return respond(
        {
          success: false,
          error: "Unable to prepare enough unique questions.",
        },
        503
      );
    }

    // Generate 10 questions for the frontend.
    const questions = bank
      .slice(0, 10)
      .map((statement, index) => ({
        id: index + 1,
        statement,
        creatorAnswer: null,
        bgColor: COLORS[index],
      }));

    return respond({
      success: true,
      questions,
      questionBank: bank,
      translatedCount,
    });
  } catch (error) {
    console.error("NHIE bank API error:", error);

    return respond(
      {
        success: false,
        error: "Unable to generate questions.",
      },
      500
    );
  }
}
