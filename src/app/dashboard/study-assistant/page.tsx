"use client";

import { useState } from "react";
import { FileText, Sparkles, BookOpen, Brain, Loader2 } from "lucide-react";
import { answerCourseContentQuestions } from "@/ai/flows/answer-course-content-questions-flow";

const resources = [
  "Articulated Reversing Guide",
  "Advanced Jackknife Mitigation",
  "Fifth Wheel Connection Checklist",
  "Electronic Stability Systems Manual",
  "Global Logistics Protocols v2.4",
  "Severe Weather Driving Handout",
];

export default function StudyAssistantPage() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await answerCourseContentQuestions({
        question,
        courseContent:
          "Articulated trucks use a pivot point (the fifth wheel) between the tractor and trailer. This allows for tight turning radiuses but introduces a risk of jackknifing. Safety systems like ABS and electronic stability control are essential for mitigation. Drivers must master 'counter-steering' when reversing articulated units.",
      });
      setAiAnswer(res.answer);
    } catch (e) {
      setAiAnswer("Sorry, I encountered an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">AI Study Assistant</h1>
        <p className="font-body text-sm text-muted-foreground">Leverage artificial intelligence to master complex articulated driving concepts.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="h-fit bg-ink p-8 text-cream xl:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <div className="bg-sage p-1.5">
              <Brain className="h-5 w-5 text-cream" />
            </div>
            <h2 className="font-headline text-2xl text-cream">Ask AI Tutor</h2>
          </div>
          <p className="mb-6 font-body text-base text-cream/60">
            Ask about maneuvers, safety, or logistics protocols. Our AI is trained on PADTI certification material.
          </p>

          <textarea
            className="min-h-[150px] w-full border border-cream/20 bg-cream/5 p-4 font-body text-base placeholder:text-cream/40 focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="e.g. How do I prevent jackknifing when reversing an articulated truck?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={handleAskAI}
            disabled={loading || !question}
            className="mt-4 flex w-full items-center justify-center gap-2 bg-sage py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Expert Explanation"}
          </button>

          {aiAnswer && (
            <div className="mt-6 border border-cream/20 bg-cream/5 p-6">
              <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-sage">
                <Sparkles className="h-4 w-4" /> AI Tutor Guidance
              </p>
              <div className="whitespace-pre-wrap font-body text-sm leading-relaxed text-cream/90">{aiAnswer}</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 flex items-center gap-2 font-headline text-xl text-ink">
              <BookOpen className="h-5 w-5 text-primary" /> Quick Resources
            </h2>
            <p className="mb-4 font-body text-sm text-muted-foreground">Essential study materials for your current modules.</p>
            <div className="space-y-1">
              {resources.map((res) => (
                <button
                  key={res}
                  className="flex w-full items-start gap-3 px-2 py-3 text-left font-body text-sm font-medium text-ink transition-colors hover:bg-secondary"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="flex-1 leading-snug">{res}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary p-6">
            <h2 className="mb-3 font-headline text-lg text-ink">Study Tip</h2>
            <p className="font-body text-sm italic leading-relaxed text-muted-foreground">
              &ldquo;When practicing articulated reversing, remember that the trailer moves in the opposite direction of the
              steering wheel until the pivot point is established. Small corrections are better than large ones.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
