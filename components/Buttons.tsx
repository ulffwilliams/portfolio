"use client";
import { Button } from "../components/ui/button";
import { useState, Activity } from "react";
import About from "./About";

export default function Buttons() {
  const [show, setShow] = useState(false);
  return (
    <div id="btns" className="flex gap-5">
      <Button
        onClick={() => {
          setShow((v) => !v);
        }}
        className="about-anchor"
      >
        About me
      </Button>
      <Button>Things i've done</Button>
      <Button>Contact</Button>
      <Activity mode={show ? "visible" : "hidden"}>
        <About />
      </Activity>
    </div>
  );
}
