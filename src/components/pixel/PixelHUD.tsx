import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PixelHUDProps {
  level: number;
  xp: number; // 0-100
  mood: string;
}

export default function PixelHUD({ level, xp, mood }: PixelHUDProps) {
  return (
    <Card className="p-4 card-elevated">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Level {level}</Badge>
          <Badge variant="outline" className="hidden sm:inline-flex">Mood: {mood}</Badge>
        </div>
        <span className="text-sm text-muted-foreground">XP {xp}%</span>
      </div>
      <Progress value={xp} className="h-2 overflow-hidden" />
    </Card>
  );
}
