"use client";
import { Button } from "../components/ui/button";
import { useState, Activity } from "react";
import About from "./About";
import Contact from "./Contact";
import "@/components/Buttons.css";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "@/components/TechList.css";

export default function Buttons() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [vibrate, setVibrate] = useState(false);
  return (
    <div id="btns" className="flex gap-5">
      <Button
        onClick={() => {
          setShowAbout((v) => !v);
        }}
      >
        About me
      </Button>
      <Button
        onClick={() => {
          setVibrate(true);
          setTimeout(() => {
            setVibrate(false);
          }, 500);
        }}
        className={vibrate ? "hover:bg-gray-400 vibrate" : "hover:bg-gray-400"}
      >
        Things i've done
      </Button>
      <Button
        onClick={() => {
          setShowContact((v) => !v);
        }}
      >
        Contact
      </Button>
      <Activity mode={showAbout ? "visible" : "hidden"}>
        <About closeAbout={() => setShowAbout(false)} />
      </Activity>

      <Activity mode={showContact ? "visible" : "hidden"}>
        <Contact closeContact={() => setShowContact(false)} />
      </Activity>
    </div>
  );
}
