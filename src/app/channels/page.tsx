// "use client" directive must be at the very top
"use client";

import { Sidebar, ChannelsDisplay } from "@/components";

export default function ModernChannelSection() {
  return (
    <div className="flex flex-row justify-between gap-0">
      <Sidebar />
      <ChannelsDisplay />
    </div>
  );
}
