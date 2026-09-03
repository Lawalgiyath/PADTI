"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Sparkles, 
  BookOpen,
  Brain
} from "lucide-react";
import { answerCourseContentQuestions } from "@/ai/flows/answer-course-content-questions-flow";

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
        courseContent: "Articulated trucks use a pivot point (the fifth wheel) between the tractor and trailer. This allows for tight turning radiuses but introduces a risk of jackknifing. Safety systems like ABS and electronic stability control are essential for mitigation. Drivers must master 'counter-steering' when reversing articulated units."
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
        <h1 className="text-3xl font-bold text-primary mb-2 font-headline">AI Study Assistant</h1>
        <p className="text-muted-foreground">Leverage artificial intelligence to master complex articulated driving concepts.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-none shadow-xl bg-gradient-to-br from-primary to-blue-900 text-white h-fit">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-accent p-1.5 rounded-lg">
                <Brain className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Ask AI Tutor</CardTitle>
            </div>
            <CardDescription className="text-white/70 text-lg">Ask about maneuvers, safety, or logistics protocols. Our AI is trained on PADTI certification material.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent min-h-[150px]"
                placeholder="e.g. How do I prevent jackknifing when reversing an articulated truck?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
            <Button 
              onClick={handleAskAI} 
              disabled={loading || !question}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 text-lg rounded-xl"
            >
              {loading ? "Analyzing..." : "Get Expert Explanation"}
            </Button>

            {aiAnswer && (
              <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-base animate-in fade-in slide-in-from-top-2">
                <p className="font-bold text-accent mb-3 flex items-center gap-2 uppercase tracking-widest text-sm">
                  <Sparkles className="h-4 w-4" /> AI Tutor Guidance
                </p>
                <div className="leading-relaxed text-white/90 whitespace-pre-wrap">
                  {aiAnswer}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Quick Resources</CardTitle>
              <CardDescription>Essential study materials for your current modules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {[
                "Articulated Reversing Guide",
                "Advanced Jackknife Mitigation",
                "Fifth Wheel Connection Checklist",
                "Electronic Stability Systems Manual",
                "Global Logistics Protocols v2.4",
                "Severe Weather Driving Handout"
              ].map((res, i) => (
                <Button 
                  key={i} 
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto py-3 px-4 font-medium hover:bg-secondary rounded-xl flex items-start gap-3"
                >
                  <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 
                  <span className="flex-1 whitespace-normal break-words text-left leading-snug">
                    {res}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg">Study Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "When practicing articulated reversing, remember that the trailer moves in the opposite direction of the steering wheel until the pivot point is established. Small corrections are better than large ones."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
