import { LEADERBOARD_DATA } from "@/src/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contestant = LEADERBOARD_DATA.find(c => c.id === id);
  if (!contestant) {
    return new NextResponse("Not found", { status: 404 });
  }

  const changeSign = contestant.scoreChange > 0 ? "+" : "";
  const changeColor = contestant.scoreChange > 0 ? "#00BE6A" : "#FF4500";

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Mono', monospace; background: #18160F; width: 360px; height: 180px; overflow: hidden; }
  .card { width: 360px; height: 180px; background: linear-gradient(135deg,#18160F 0%,#2D2A22 100%); padding: 20px; position: relative; border-radius: 16px; overflow: hidden; }
  .ghost { position: absolute; right: 14px; top: 6px; font-family: 'Syne', sans-serif; font-size: 90px; font-weight: 800; color: rgba(255,255,255,0.04); line-height: 1; letter-spacing: -5px; user-select: none; }
  .row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .avi { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 22px; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
  .name { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; color: white; letter-spacing: -0.3px; }
  .sub { font-size: 10px; color: rgba(255,255,255,0.38); margin-top: 2px; }
  .score-row { display: flex; align-items: center; gap: 16px; }
  .score { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #FF4500; letter-spacing: -1.5px; line-height: 1; }
  .score-label { font-size: 9px; color: rgba(255,255,255,0.3); letter-spacing: 0.07em; margin-top: 3px; }
  .rank { font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.45); margin-left: auto; }
  .badges { display: flex; gap: 6px; margin-top: 12px; flex-wrap: wrap; }
  .badge { font-size: 9px; padding: 3px 8px; border-radius: 5px; letter-spacing: 0.05em; }
</style>
</head>
<body>
<div class="card">
  <div class="ghost">#${contestant.rank}</div>
  <div class="row">
    <div class="avi">${contestant.avatar}</div>
    <div>
      <div class="name">${contestant.name}</div>
      <div class="sub">${contestant.handle} · ${contestant.flag} ${contestant.university}</div>
    </div>
  </div>
  <div class="score-row">
    <div>
      <div class="score">${contestant.niScore.toLocaleString()}</div>
      <div class="score-label">NI SCORE</div>
    </div>
    <div class="rank">#${contestant.rank}</div>
  </div>
  <div class="badges">
    <span class="badge" style="background:rgba(0,190,106,0.15);color:#00D97E;">✓ VERIFIED</span>
    <span class="badge" style="background:${changeColor}22;color:${changeColor};">${changeSign}${contestant.scoreChange} THIS WEEK</span>
    <span class="badge" style="background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);">meryt.app</span>
  </div>
</div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html", "Cache-Control": "public, max-age=3600" },
  });
}
