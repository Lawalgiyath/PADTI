"use client";

import { Input } from "@/components/ui/input";
import { Mail, Search, Send, Star, Trash2, Archive } from "lucide-react";
import { useState } from "react";

const messages = [
  {
    id: 0,
    sender: "LogiStream Europe",
    subject: "Partnership Agreement Update",
    preview: "We have reviewed the latest curriculum requirements for the premium tier and...",
    date: "10:24 AM",
    unread: true,
    body: "Dear Admin,\n\nWe have reviewed the latest curriculum requirements for the premium tier and would like to proceed with the integration. Our team is ready to provide the necessary API credentials for the talent matching service.\n\nBest regards,\nLogiStream Europe Team",
  },
  {
    id: 1,
    sender: "Johnathan Doe",
    subject: "Certificate Issue #PAD-928",
    preview: "I noticed my digital certificate hasn't been updated with the latest road safety module...",
    date: "Yesterday",
    unread: false,
    body: "Hello,\n\nI noticed my digital certificate hasn't been updated with the latest road safety module I completed on Tuesday. Could you please check the status?\n\nThank you,\nJohnathan",
  },
  {
    id: 2,
    sender: "Elena Rodriguez",
    subject: "Admission Interview Scheduling",
    preview: "Thank you for the fast-track admission offer. I am available for the interview on...",
    date: "Oct 24",
    unread: false,
    body: "Hi Admissions Team,\n\nThank you for the fast-track admission offer. I am available for the interview on Monday at 2 PM. Please let me know if this works.\n\nElena",
  },
];

export default function AdminInboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(0);
  const currentMsg = selectedMessage !== null ? messages[selectedMessage] : null;

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-headline text-3xl text-ink">Internal Communications</h1>
          <p className="font-body text-sm text-muted-foreground">Global inbox for platform administrative outreach.</p>
        </div>
        <button className="bg-sage px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          Compose Message
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 overflow-hidden lg:grid-cols-3">
        <div className="flex flex-col overflow-hidden border border-border bg-card lg:col-span-1">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="h-9 rounded-none border-border bg-background pl-10 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0" />
            </div>
          </div>
          <div className="flex-1 divide-y divide-border overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`cursor-pointer p-4 transition-colors hover:bg-secondary ${selectedMessage === idx ? "border-l-2 border-primary bg-secondary" : ""}`}
                onClick={() => setSelectedMessage(idx)}
              >
                <div className="mb-1 flex items-start justify-between">
                  <span className={`font-body text-sm font-bold ${msg.unread ? "text-primary" : "text-ink"}`}>{msg.sender}</span>
                  <span className="font-body text-[10px] text-muted-foreground">{msg.date}</span>
                </div>
                <h4 className={`mb-1 truncate font-body text-xs font-semibold ${msg.unread ? "text-ink" : "text-muted-foreground"}`}>{msg.subject}</h4>
                <p className="line-clamp-2 font-body text-[11px] text-muted-foreground">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden border border-border bg-card lg:col-span-2">
          {currentMsg ? (
            <>
              <div className="flex items-center justify-between border-b border-border bg-secondary p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-primary/10 font-headline text-lg text-primary">
                    {currentMsg.sender.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-bold text-ink">{currentMsg.sender}</h3>
                    <p className="font-body text-[10px] text-muted-foreground">{currentMsg.subject}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-muted-foreground transition-colors hover:text-ink"><Star className="h-4 w-4" /></button>
                  <button className="p-2 text-muted-foreground transition-colors hover:text-ink"><Archive className="h-4 w-4" /></button>
                  <button className="p-2 text-muted-foreground transition-colors hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <div className="whitespace-pre-wrap font-body text-sm leading-relaxed text-muted-foreground">{currentMsg.body}</div>
              </div>
              <div className="border-t border-border p-6">
                <div className="relative">
                  <textarea
                    placeholder="Write your reply..."
                    className="min-h-[100px] w-full resize-none border border-border bg-background p-4 font-body text-sm focus:outline-none focus-visible:border-primary"
                  ></textarea>
                  <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-sage px-5 py-2 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                    <Send className="h-3.5 w-3.5" /> Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <Mail className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="font-headline text-xl text-ink">Select a message to read</h3>
              <p className="mt-2 max-w-xs font-body text-sm text-muted-foreground">Choose a conversation from the list to view its contents and reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
