import Dither from "../components/Dither";
import Name from "@/components/Name";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Dither />
      </div>
      <div className="relative z-10 flex items-center justify-center w-full">
        <Name />
      </div>
    </div>
  );
}
