import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Gamepad2, Moon, PawPrint, Sparkles } from "lucide-react";

interface PixelActionsProps {
  onFeed: () => void;
  onPlay: () => void;
  onGroom: () => void;
  onNap: () => void;
  onSurprise: () => void;
}

export default function PixelActions({ onFeed, onPlay, onGroom, onNap, onSurprise }: PixelActionsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <Button variant="hero" onClick={() => { onFeed(); toast({ title: "Yum!", description: "Pixel loved that digital snack. *nom nom*" }); }}>Feed 🍪</Button>
      <Button variant="secondary" onClick={() => { onPlay(); toast({ title: "Playtime!", description: "Game on! *boing boing*" }); }}>
        <Gamepad2 className="mr-1" /> Play
      </Button>
      <Button variant="secondary" onClick={() => { onGroom(); toast({ title: "So fluffy!", description: "Thanks for the grooming! *purr*" }); }}>
        <PawPrint className="mr-1" /> Groom
      </Button>
      <Button variant="soft" onClick={() => { onNap(); toast({ title: "Zzz...", description: "Power nap time." }); }}>
        <Moon className="mr-1" /> Nap
      </Button>
      <Button variant="outline" onClick={() => { onSurprise(); toast({ title: "Surprise!", description: "Pixel sent you something cute." }); }}>
        <Sparkles className="mr-1" /> Surprise
      </Button>
    </div>
  );
}
