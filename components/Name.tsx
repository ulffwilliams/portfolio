import "@/components/Name.css";

export default function Name() {
  return (
    <>
      <div id="name-container" className="flex items-center justify-center">
        <span id="i-blink" className="text-7xl text-(--off-white)">
          |
        </span>
        <span className="text-7xl text-(--off-white) mt-3"> William Ulff</span>
      </div>
    </>
  );
}
