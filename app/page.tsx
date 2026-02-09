import Dither from "../components/Dither";

export default function Home() {
  return (
    <>
      <Dither />
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-7xl text-white">
          <span id="i-blink">|</span>
          <span>William Ulff</span>
        </h1>
      </div>
    </>
  );
}
