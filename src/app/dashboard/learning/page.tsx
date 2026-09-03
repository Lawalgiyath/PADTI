"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, ChevronRight } from "lucide-react";

const courses = [
  { title: "Advanced Road Safety", progress: 85, lessons: 12, completed: 10 },
  { title: "Fleet Logistics & Management", progress: 30, lessons: 8, completed: 2 },
  { title: "Articulated Maneuvering", progress: 10, lessons: 15, completed: 1 },
];

export default function LearningPortal() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Learning Portal</h1>
          <p className="font-body text-sm text-muted-foreground">Master your skills with industry-leading course material.</p>
        </div>
        <button className="flex items-center gap-2 bg-sage px-6 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          <Play className="h-4 w-4 fill-current" /> Resume Last Lesson
        </button>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="courses"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-body text-sm font-bold uppercase tracking-wide data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Current Courses
          </TabsTrigger>
          <TabsTrigger
            value="assessments"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-body text-sm font-bold uppercase tracking-wide data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="rounded-none border-b-2 border-transparent px-4 py-3 font-body text-sm font-bold uppercase tracking-wide data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, idx) => (
              <div key={course.title} className="flex flex-col border border-border bg-card p-6">
                <div className="mb-3 flex items-start justify-between">
                  <span className="border border-primary/30 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
                    Module {idx + 1}
                  </span>
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {course.completed}/{course.lessons} Lessons
                  </span>
                </div>
                <h3 className="mb-4 font-headline text-lg text-ink">{course.title}</h3>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between font-body text-xs font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <button className="mt-auto flex items-center justify-between border-t border-border pt-4 font-body text-sm font-bold text-ink transition-colors hover:text-primary">
                  Continue Learning <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments">
          <div className="flex flex-col items-center justify-center border border-border bg-card px-6 py-20 text-center">
            <div className="mb-6 rounded-full bg-secondary p-6">
              <FileText className="h-10 w-10 text-primary/40" />
            </div>
            <h3 className="mb-2 font-headline text-xl text-ink">No active assessments</h3>
            <p className="max-w-sm font-body text-sm text-muted-foreground">Complete more lessons to unlock your next module assessment.</p>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="flex flex-col items-center justify-center border border-border bg-card px-6 py-20 text-center">
            <div className="mb-6 rounded-full bg-secondary p-6">
              <FileText className="h-10 w-10 text-primary/40" />
            </div>
            <h3 className="mb-2 font-headline text-xl text-ink">Library Resources</h3>
            <p className="max-w-sm font-body text-sm text-muted-foreground">Access training manuals and safety guidelines from the Study Assistant.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
