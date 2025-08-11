import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroAvatar from "@/assets/pixel-avatar.png";

interface PixelAvatarProps {
  name: string;
}

export default function PixelAvatar({ name }: PixelAvatarProps) {
  return (
    <div className="p-[3px] rounded-full gradient-ring glow-strong">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 bg-card animate-float">
        <AvatarImage src={heroAvatar} alt={`${name} avatar`} loading="lazy" />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
