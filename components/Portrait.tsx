import React from "react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
export default function Portrait() {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div id="me-container" className="w-full border-4 aspect-square relative">
      <img
        src="me.JPEG"
        alt="image of me"
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />
      <img
        src="me.JPEG"
        alt="image of me"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          clipPath: `inset(0 ${100 - sliderVal}% 0 0)`,
        }}
      />
      <Slider
        defaultValue={[sliderVal]}
        max={100}
        step={1}
        className="absolute bottom-0 left-0 px-3 translate-y-1/2"
        onValueChange={(value) => setSliderVal(value[0])}
      />
    </div>
  );
}
