export default function PortraitFallback() {
  return (
    <div className="w-full aspect-square relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/me.JPEG"
        alt="image of me"
        className="absolute inset-[12%] w-[76%] h-[76%] object-cover border-4"
      />
    </div>
  );
}
