"use client";
import { Card } from "@/components/ui/card";
import TechList from "./TechList";
import "@/app/globals.css";
import "@/components/About.css";
import { Button } from "./ui/button";

type AboutProps = {
  closeAbout: () => void;
};

export default function About({ closeAbout }: AboutProps) {
  return (
    <Card className="w-full max-w-sm absolute scale-in-center bottom-20 left-20">
      <div id="card-content" className="m-5 flex flex-col gap-5">
        <Button
          className="w-1 absolute top-1 right-2 bg-yellow-100"
          onClick={closeAbout}
        >
          X
        </Button>
        <p>
          <b>Name: </b>William Ulff
        </p>
        <p>
          <b>tl;dr: </b>Frontend-oriented Fullstack dev. Passionate about
          building user-friendly web applications and exploring new
          technologies. Loves to learn. Loves cooking. Loves playing with{" "}
          <a
            className="underline hover:text-(--main)"
            target="_blank"
            rel="noopener noreferrer"
            href="https://kallsup.se"
          >
            {" "}
            his band
          </a>
          .
        </p>
        <b>Favorite tech and tools: </b>
        <TechList />
      </div>
    </Card>
  );
}
