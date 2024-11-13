import { Sidebar, StreamsDisplay } from "@/components";

const StreamsSection=()=> {
  return (
    <div className="flex flex-row justify-between gap-0">
      <Sidebar />
      <StreamsDisplay />
    </div>
  );
}

export default StreamsSection;