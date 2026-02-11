import Name from "../components/Name";
import ClickSpark from "../components/ClickSpark";
import Buttons from "@/components/Buttons";

export default function Home() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative min-h-screen w-full h-full flex items-center justify-center overflow-hidden bg-red-400">
        <div className="flex items-center justify-center flex-col gap-5 w-full">
          <Name />
          <Buttons />
        </div>
      </div>
    </ClickSpark>
  );
}
