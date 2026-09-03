
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  FileText, 
  ChevronRight
} from "lucide-react";

export default function LearningPortal() {
  const courses = [
    { title: "Advanced Road Safety", progress: 85, lessons: 12, completed: 10 },
    { title: "Fleet Logistics & Management", progress: 30, lessons: 8, completed: 2 },
    { title: "Articulated Maneuvering", progress: 10, lessons: 15, completed: 1 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Learning Portal</h1>
          <p className="text-muted-foreground">Master your skills with industry-leading course material.</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-bold py-6 px-6 rounded-xl">
          <Play className="h-4 w-4 fill-current" /> Resume Last Lesson
        </Button>
      </div>

      <div className="w-full">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="bg-secondary border p-1 rounded-xl h-auto">
            <TabsTrigger value="courses" className="rounded-lg py-2 px-6">Current Courses</TabsTrigger>
            <TabsTrigger value="assessments" className="rounded-lg py-2 px-6">Assessments</TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg py-2 px-6">Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="border-primary text-primary">Module {idx + 1}</Badge>
                      <span className="text-xs font-bold text-muted-foreground uppercase">{course.completed}/{course.lessons} Lessons</span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 group">
                      Continue Learning <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assessments">
            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-secondary p-6 rounded-full mb-6">
                  <FileText className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No active assessments</h3>
                <p className="text-muted-foreground max-w-sm">Complete more lessons to unlock your next module assessment.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
             <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-secondary p-6 rounded-full mb-6">
                  <FileText className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">Library Resources</h3>
                <p className="text-muted-foreground max-w-sm">Access training manuals and safety guidelines from the Study Assistant.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
