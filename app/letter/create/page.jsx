"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { THEMES, getTemplateText } from "@/constants/letterData";
import FloatingLayout from "@/components/FloatingLayout";
import LetterWizard from "@/components/LetterWizard"; // Changed from LetterForm
import ActiveLetter from "@/components/ActiveLetter";

export default function CreateLetter() {
  const [step, setStep] = useState(0); // 0 = Wizard, 1 = Active Letter
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingDevice, setIsCheckingDevice] = useState(true);
  const [createdLetterId, setCreatedLetterId] = useState(null);
  const [recipientNameDisplay, setRecipientNameDisplay] = useState("");
  
  const [activeTemplate, setActiveTemplate] = useState("");
  const [activeTheme, setActiveTheme] = useState(THEMES["purple"]);

  const [letterData, setLetterData] = useState({
    recipientName: "",
    senderName: "",
    message: "",
  });

  useEffect(() => {
    const activeLetterId = localStorage.getItem("active_letter_id");
    const activeLetterRecipient = localStorage.getItem("active_letter_recipient");

    if (activeLetterId) {
      setCreatedLetterId(activeLetterId);
      setRecipientNameDisplay(activeLetterRecipient || "your recipient");
      setStep(1); // Jump to Active Letter Dashboard
    }
    setIsCheckingDevice(false);
  }, []);

  const handleChange = (e) => {
    setLetterData({ ...letterData, [e.target.name]: e.target.value });
  };

  const applyTemplate = (templateId, themeKey) => {
    setActiveTemplate(templateId);
    setActiveTheme(THEMES[themeKey]);
    const generatedText = getTemplateText(templateId, letterData.recipientName, letterData.senderName);
    setLetterData({ ...letterData, message: generatedText });
  };

  const handleSealEnvelope = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/letter/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...letterData, theme: activeTheme.id }),
      });
      const data = await res.json();
      
      localStorage.setItem("active_letter_id", data.letterId);
      localStorage.setItem("active_letter_recipient", letterData.recipientName);
      
      setCreatedLetterId(data.letterId);
      setRecipientNameDisplay(letterData.recipientName);
      setStep(1); // Move to Active Letter Screen
    } catch (error) {
      console.error("Failed to seal letter", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLetter = async () => {
    if (!confirm("Are you sure? This will delete the letter permanently and the link will stop working.")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/letter/${createdLetterId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete from database");

      localStorage.removeItem("active_letter_id");
      localStorage.removeItem("active_letter_recipient");
      
      setCreatedLetterId(null);
      setLetterData({ recipientName: "", senderName: "", message: "" });
      setActiveTemplate("");
      setActiveTheme(THEMES["purple"]);
      setStep(0); // Go back to Wizard
    } catch (error) {
      console.error("Server delete failed:", error);
      alert("⚠️ Failed to delete the letter from the server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isCheckingDevice) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <FloatingLayout activeTheme={activeTheme}>
      {step === 0 && (
        <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-6 font-bold transition-colors bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
          ← Back Home
        </Link>
      )}

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <LetterWizard
            letterData={letterData}
            handleChange={handleChange}
            activeTheme={activeTheme}
            activeTemplate={activeTemplate}
            applyTemplate={applyTemplate}
            handleSealEnvelope={handleSealEnvelope}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ActiveLetter
            activeTheme={activeTheme}
            recipientNameDisplay={recipientNameDisplay}
            createdLetterId={createdLetterId}
            handleDeleteLetter={handleDeleteLetter}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </FloatingLayout>
  );
}