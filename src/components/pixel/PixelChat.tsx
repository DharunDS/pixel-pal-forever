import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "pixel";
  text: string;
}

interface PixelChatProps {
  pixelName: string;
  ownerName?: string;
  addXP: (amount: number) => void;
}

export default function PixelChat({ pixelName, ownerName, addXP }: PixelChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "pixel", text: `Hi${ownerName ? ` ${ownerName}` : ""}! I'm ${pixelName}. Want to feed me, play, or just chat? *wag wag*` },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function respond(user: string) {
    const lower = user.toLowerCase();
    if (lower.includes("feed") || lower.includes("snack")) return `${pixelName}: Yum! Snack accepted. +10 XP! *nom nom*`;
    if (lower.includes("play")) return `${pixelName}: Let's play a quick word game! What's a word that rhymes with "star"?`;
    if (lower.includes("groom") || lower.includes("pet")) return `${pixelName}: Aww thank you! *purr*`;
    if (lower.includes("sad")) return `${pixelName}: I'm here for you. Deep breaths together? In... out... you've got this.`;
    if (lower.includes("happy")) return `${pixelName}: Yay! Tell me what made you smile today!`;
    if (lower.includes("riddle")) return `${pixelName}: Riddle time! What has a heart that doesn’t beat?`;
    return `${pixelName}: I love chatting with you${ownerName ? ", " + ownerName : ""}! Shall we play or feed me?`;
  }

  function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    const reply: Message = { role: "pixel", text: respond(input.trim()) };
    setMessages((m) => [...m, userMsg, reply]);
    addXP(5);
    setInput("");
  }

  return (
    <Card className="p-4 h-full flex flex-col card-elevated">
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "pixel" ? "text-sm" : "text-sm text-muted-foreground text-right"}>
            <span className={m.role === "pixel" ? "" : ""}>{m.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={onSend} className="mt-3 flex gap-2">
        <Input aria-label="Type a message" placeholder={`Message ${pixelName}...`} value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type="submit" variant="hero">Send</Button>
      </form>
    </Card>
  );
}
