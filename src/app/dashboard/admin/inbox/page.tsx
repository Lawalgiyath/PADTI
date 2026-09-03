
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Search, Send, User, Star, Trash2, Archive, Reply } from "lucide-react";
import { useState } from "react";

export default function AdminInboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(0);

  const messages = [
    { 
      id: 0, 
      sender: "LogiStream Europe", 
      subject: "Partnership Agreement Update", 
      preview: "We have reviewed the latest curriculum requirements for the premium tier and...", 
      date: "10:24 AM", 
      unread: true,
      body: "Dear Admin,\n\nWe have reviewed the latest curriculum requirements for the premium tier and would like to proceed with the integration. Our team is ready to provide the necessary API credentials for the talent matching service.\n\nBest regards,\nLogiStream Europe Team"
    },
    { 
      id: 1, 
      sender: "Johnathan Doe", 
      subject: "Certificate Issue #PAD-928", 
      preview: "I noticed my digital certificate hasn't been updated with the latest road safety module...", 
      date: "Yesterday", 
      unread: false,
      body: "Hello,\n\nI noticed my digital certificate hasn't been updated with the latest road safety module I completed on Tuesday. Could you please check the status?\n\nThank you,\nJohnathan"
    },
    { 
      id: 2, 
      sender: "Elena Rodriguez", 
      subject: "Admission Interview Scheduling", 
      preview: "Thank you for the fast-track admission offer. I am available for the interview on...", 
      date: "Oct 24", 
      unread: false,
      body: "Hi Admissions Team,\n\nThank you for the fast-track admission offer. I am available for the interview on Monday at 2 PM. Please let me know if this works.\n\nElena"
    },
  ];

  const currentMsg = selectedMessage !== null ? messages[selectedMessage] : null;

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Internal Communications</h1>
          <p className="text-muted-foreground">Global inbox for platform administrative outreach.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6">Compose Message</Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Sidebar - Message List */}
        <Card className="lg:col-span-1 border-none shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10 h-9 rounded-xl text-sm" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id} 
                  className={`p-4 cursor-pointer hover:bg-secondary/20 transition-colors ${selectedMessage === idx ? 'bg-secondary/40 border-l-4 border-primary' : ''}`}
                  onClick={() => setSelectedMessage(idx)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold ${msg.unread ? 'text-primary' : 'text-foreground'}`}>{msg.sender}</span>
                    <span className="text-[10px] text-muted-foreground">{msg.date}</span>
                  </div>
                  <h4 className={`text-xs font-semibold mb-1 truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.subject}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{msg.preview}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Message Content */}
        <Card className="lg:col-span-2 border-none shadow-sm flex flex-col overflow-hidden">
          {currentMsg ? (
            <>
              <div className="p-4 border-b flex justify-between items-center bg-secondary/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {currentMsg.sender.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{currentMsg.sender}</h3>
                    <p className="text-[10px] text-muted-foreground">{currentMsg.subject}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"><Star className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"><Archive className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-8">
                <div className="max-w-none whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {currentMsg.body}
                </div>
              </ScrollArea>
              <div className="p-6 border-t bg-secondary/5">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <textarea 
                      placeholder="Write your reply..." 
                      className="w-full bg-white border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                    ></textarea>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                       <Button size="sm" className="bg-primary hover:bg-primary/90 h-9 px-6 rounded-lg font-bold gap-2">
                        <Send className="h-4 w-4" /> Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Mail className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Select a message to read</h3>
              <p className="text-sm text-muted-foreground/60 max-w-xs mt-2">Choose a conversation from the list to view its contents and reply.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
