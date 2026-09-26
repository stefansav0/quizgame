
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

import { THEMES, getTemplateText } from "@/constants/letterData";
import FloatingLayout from "@/components/FloatingLayout";
import LetterWizard from "@/components/LetterWizard";
import ActiveLetter from "@/components/ActiveLetter";

const LETTER_ID_KEY = "active_letter_id";
const RECIPIENT_KEY = "active_letter_recipient";
const DRAFT_KEY = "secret_letter_draft_v1";

const EMPTY_LETTER = {
  recipientName: "",
  senderName: "",
  message: "",
};

const DEFAULT_THEME = THEMES.purple;

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message
    ? error.message
    : fallback;
}

export default function CreateLetter() {
  // 0 = Letter wizard, 1 = Active letter
  const [step, setStep] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingDevice, setIsCheckingDevice] =
    useState(true);

  const [createdLetterId, setCreatedLetterId] =
    useState(null);

  const [recipientNameDisplay, setRecipientNameDisplay] =
    useState("");

  const [activeTemplate, setActiveTemplate] =
    useState("");

  const [activeTheme, setActiveTheme] =
    useState(DEFAULT_THEME);

  const [letterData, setLetterData] =
    useState(EMPTY_LETTER);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Guards against rapid duplicate clicks.
  const submittingRef = useRef(false);
  const deletingRef = useRef(false);

  // -----------------------------------------
  // 1. RESTORE ACTIVE LETTER OR SAVED DRAFT
  // -----------------------------------------

  useEffect(() => {
    try {
      const activeLetterId =
        localStorage.getItem(LETTER_ID_KEY);

      const activeLetterRecipient =
        localStorage.getItem(RECIPIENT_KEY);

      if (activeLetterId) {
        setCreatedLetterId(activeLetterId);

        setRecipientNameDisplay(
          activeLetterRecipient || "your recipient"
        );

        setStep(1);
        return;
      }

      const savedDraft =
        localStorage.getItem(DRAFT_KEY);

      if (!savedDraft) {
        setStep(0);
        return;
      }

      const draft = JSON.parse(savedDraft);

      if (!draft || typeof draft !== "object") {
        throw new Error("Invalid letter draft");
      }

      setLetterData({
        recipientName:
          typeof draft.letterData?.recipientName ===
          "string"
            ? draft.letterData.recipientName
            : "",

        senderName:
          typeof draft.letterData?.senderName ===
          "string"
            ? draft.letterData.senderName
            : "",

        message:
          typeof draft.letterData?.message === "string"
            ? draft.letterData.message
            : "",
      });

      const savedTheme = Object.values(THEMES).find(
        (theme) => theme.id === draft.themeId
      );

      if (savedTheme) {
        setActiveTheme(savedTheme);
      }

      if (typeof draft.activeTemplate === "string") {
        setActiveTemplate(draft.activeTemplate);
      }

      setNotice(
        "Your unfinished letter has been restored."
      );
    } catch (err) {
      console.error(
        "Failed to restore letter:",
        err
      );

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Browser storage may be unavailable.
      }
    } finally {
      setIsCheckingDevice(false);
    }
  }, []);

  // -----------------------------------------
  // 2. AUTOMATICALLY SAVE UNFINISHED LETTER
  // -----------------------------------------

  useEffect(() => {
    if (
      isCheckingDevice ||
      createdLetterId ||
      step !== 0
    ) {
      return;
    }

    try {
      const isEmpty =
        !letterData.recipientName &&
        !letterData.senderName &&
        !letterData.message &&
        !activeTemplate;

      if (isEmpty) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }

      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          letterData,
          activeTemplate,
          themeId: activeTheme?.id || "purple",
        })
      );
    } catch (err) {
      console.warn(
        "Unable to save letter draft:",
        err
      );
    }
  }, [
    isCheckingDevice,
    createdLetterId,
    step,
    letterData,
    activeTemplate,
    activeTheme,
  ]);

  // -----------------------------------------
  // 3. UPDATE LETTER FIELDS
  // -----------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      ![
        "recipientName",
        "senderName",
        "message",
      ].includes(name)
    ) {
      return;
    }

    setLetterData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // -----------------------------------------
  // 4. APPLY LETTER TEMPLATE
  // -----------------------------------------

  const applyTemplate = (templateId, themeKey) => {
    const selectedTheme =
      THEMES[themeKey] || DEFAULT_THEME;

    try {
      const generatedText = getTemplateText(
        templateId,
        letterData.recipientName,
        letterData.senderName
      );

      setActiveTemplate(templateId);
      setActiveTheme(selectedTheme);

      setLetterData((previous) => ({
        ...previous,
        message:
          typeof generatedText === "string"
            ? generatedText
            : previous.message,
      }));

      setError("");
    } catch (err) {
      console.error(
        "Failed to apply template:",
        err
      );

      setError(
        "This template could not be loaded. Please choose another one."
      );
    }
  };

  // -----------------------------------------
  // 5. CREATE AND SEAL LETTER
  // -----------------------------------------

  const handleSealEnvelope = async () => {
    if (submittingRef.current) return;

    setError("");
    setNotice("");

    const recipientName =
      letterData.recipientName.trim();

    const senderName =
      letterData.senderName.trim();

    const message =
      letterData.message.trim();

    if (!recipientName) {
      setError(
        "Please enter the recipient's name."
      );
      return;
    }

    if (!senderName) {
      setError(
        "Please enter your name."
      );
      return;
    }

    if (!message) {
      setError(
        "Please write a message before sealing your letter."
      );
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/letter/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientName,
            senderName,
            message,
            theme: activeTheme?.id || "purple",
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        // Handle unexpected non-JSON responses.
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Unable to create your letter."
        );
      }

      if (
        typeof data?.letterId !== "string" ||
        !data.letterId.trim()
      ) {
        throw new Error(
          "The server did not return a valid letter ID."
        );
      }

      const finalId = data.letterId.trim();

      // The current session can continue even
      // if browser storage is unavailable.
      try {
        localStorage.setItem(
          LETTER_ID_KEY,
          finalId
        );

        localStorage.setItem(
          RECIPIENT_KEY,
          recipientName
        );

        localStorage.removeItem(DRAFT_KEY);
      } catch (storageError) {
        console.warn(
          "Could not save letter on this device:",
          storageError
        );

        setNotice(
          "Your letter was created, but this browser could not remember it. Save your share link before leaving."
        );
      }

      setLetterData({
        recipientName,
        senderName,
        message,
      });

      setCreatedLetterId(finalId);
      setRecipientNameDisplay(recipientName);
      setStep(1);
    } catch (err) {
      console.error(
        "Failed to seal letter:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Something went wrong while creating your letter. Please try again."
        )
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // -----------------------------------------
  // 6. DELETE ACTIVE LETTER
  // -----------------------------------------

  const handleDeleteLetter = async () => {
    if (deletingRef.current) return;

    if (!createdLetterId) {
      setError(
        "No active letter was found."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this letter? Its link will stop working. This action cannot be undone."
    );

    if (!confirmed) return;

    deletingRef.current = true;
    setIsDeleting(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/letter/${encodeURIComponent(
          createdLetterId
        )}`,
        {
          method: "DELETE",
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        // A successful DELETE may have no body.
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Failed to delete the letter."
        );
      }

      // Clear browser data only after the
      // server confirms successful deletion.
      try {
        localStorage.removeItem(
          LETTER_ID_KEY
        );

        localStorage.removeItem(
          RECIPIENT_KEY
        );

        localStorage.removeItem(DRAFT_KEY);
      } catch (storageError) {
        console.warn(
          "Unable to clear saved letter data:",
          storageError
        );
      }

      setCreatedLetterId(null);
      setRecipientNameDisplay("");
      setLetterData(EMPTY_LETTER);
      setActiveTemplate("");
      setActiveTheme(DEFAULT_THEME);
      setStep(0);

      setNotice(
        "Your letter has been deleted. You can now create a new one."
      );
    } catch (err) {
      console.error(
        "Server delete failed:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to delete the letter. Please try again."
        )
      );
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  };

  // -----------------------------------------
  // 7. INITIAL LOADING SCREEN
  // -----------------------------------------

  if (isCheckingDevice) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#0f111a]"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-purple-400/20 border-t-purple-400"
            aria-hidden="true"
          />

          <p className="text-sm font-semibold text-slate-300">
            Loading your letter...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // 8. MAIN LETTER CREATOR
  // -----------------------------------------

  return (
    <FloatingLayout activeTheme={activeTheme}>
      <div className="relative z-20 w-full max-w-xl">

        {/* Navigation */}
        {step === 0 && (
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-bold text-slate-200 backdrop-blur-md transition hover:border-white/20 hover:bg-black/30 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back Home
          </Link>
        )}

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-2xl border border-rose-400/30 bg-rose-950/80 px-5 py-4 text-sm leading-6 text-rose-100 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Dismiss error"
                className="shrink-0 text-xl leading-none text-rose-200 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Success and information message */}
        {notice && (
          <div
            role="status"
            className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-950/80 px-5 py-4 text-sm leading-6 text-emerald-100 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <p>{notice}</p>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="shrink-0 text-xl leading-none text-emerald-200 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <div key="letter-wizard">
              <LetterWizard
                letterData={letterData}
                handleChange={handleChange}
                activeTheme={activeTheme}
                activeTemplate={activeTemplate}
                applyTemplate={applyTemplate}
                handleSealEnvelope={
                  handleSealEnvelope
                }
                isSubmitting={isSubmitting}
              />
            </div>
          ) : (
            <div key="active-letter">
              <ActiveLetter
                activeTheme={activeTheme}
                recipientNameDisplay={
                  recipientNameDisplay
                }
                createdLetterId={
                  createdLetterId
                }
                handleDeleteLetter={
                  handleDeleteLetter
                }
                isDeleting={isDeleting}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </FloatingLayout>
  );
}