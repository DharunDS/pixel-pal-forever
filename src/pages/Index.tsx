import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import PixelAvatar from "@/components/pixel/PixelAvatar";
import PixelHUD from "@/components/pixel/PixelHUD";
import PixelActions from "@/components/pixel/PixelActions";
import PixelChat from "@/components/pixel/PixelChat";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/pixel-hero.png";

interface PixelData {
  pixelName: string;
  ownerName?: string;
  level: number;
  xp: number; // 0-100
  mood: "happy" | "curious" | "sleepy" | "proud" | "calm";
}

const STORAGE_KEY = "pixel-data-v1";

function loadData(): PixelData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch {}
  }
  return { pixelName: "Pixel", level: 1, xp: 0, mood: "curious" };
}

function saveData(data: PixelData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Index() {
  const [data, setData] = useState<PixelData>(() => loadData());
  const [tempOwner, setTempOwner] = useState<string>(data.ownerName ?? "");

  useEffect(() => {
    // Time-based mood
    const h = new Date().getHours();
    if (h >= 22 || h < 6) updateMood("sleepy");
    else if (h >= 6 && h < 12) updateMood("curious");
    else updateMood("happy");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { saveData(data); }, [data]);

  function updateMood(mood: PixelData["mood"]) {
    setData((d) => ({ ...d, mood }));
  }

  function addXP(amount: number) {
    setData((d) => {
      let xp = d.xp + amount;
      let level = d.level;
      while (xp >= 100) { xp -= 100; level += 1; }
      return { ...d, xp, level };
    });
  }

  function onFeed() { addXP(10); updateMood("happy"); }
  function onPlay() { addXP(12); updateMood("curious"); }
  function onGroom() { addXP(8); updateMood("calm"); }
  function onNap() { updateMood("sleepy"); }
  function onSurprise() { addXP(5); }

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pixel – Your Lovable AI Pet",
    applicationCategory: "Game",
    operatingSystem: "Web",
    description: "A playful AI pet that grows with you. Feed, play, and chat!",
  };

  function saveOwnerName() {
    setData((d) => ({ ...d, ownerName: tempOwner.trim() || undefined }));
  }

  return (
    <>
      <Helmet>
        <title>Pixel – Your Lovable AI Pet</title>
        <meta name="description" content="Meet Pixel, your lovable AI pet that plays, grows, and cares with you." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/'} />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>
      <header className="w-full pt-8 pb-4">
        <nav className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full gradient-ring p-[2px]">
              <img src={heroImage} alt="Pixel logo" className="h-full w-full rounded-full object-cover" loading="lazy" />
            </div>
            <span className="font-semibold">Pixel</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Level {data.level}</span>
            <span>•</span>
            <span>{data.mood}</span>
          </div>
        </nav>
      </header>

      <main className="container pb-12">
        <section className="rounded-xl bg-gradient-primary p-[1px]">
          <div className="rounded-lg bg-card p-6 md:p-8 card-elevated">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Pixel – Your Lovable AI Pet</h1>
            <p className="text-muted-foreground mb-6">{greeting}{data.ownerName ? `, ${data.ownerName}` : ""}! I’m here to make your day brighter. Feed me, play with me, and let’s grow together. *bounces happily*</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-4">
                  <PixelAvatar name={data.pixelName} />
                  <div className="flex-1">
                    <PixelHUD level={data.level} xp={data.xp} mood={data.mood} />
                  </div>
                </div>
                <Card className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div className="flex-1">
                      <label htmlFor="owner" className="text-sm text-muted-foreground">Your name</label>
                      <Input id="owner" placeholder="Tell Pixel your name" value={tempOwner} onChange={(e) => setTempOwner(e.target.value)} />
                    </div>
                    <Button variant="hero" onClick={saveOwnerName}>Save</Button>
                  </div>
                </Card>
                <PixelActions onFeed={onFeed} onPlay={onPlay} onGroom={onGroom} onNap={onNap} onSurprise={onSurprise} />
              </div>

              <div className="lg:col-span-3 min-h-[380px]">
                <PixelChat pixelName={data.pixelName} ownerName={data.ownerName} addXP={addXP} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
