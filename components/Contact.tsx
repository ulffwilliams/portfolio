"use client";
import { Card } from "@/components/ui/card";
import MailForm from "./MailForm";
import "@/app/globals.css";
import "@/components/About.css";
import { Button } from "./ui/button";

import "@/components/Contact.css";
type ContactProps = {
  closeContact: () => void;
};

export default function Contact({ closeContact }: ContactProps) {
  return (
    <Card className="w-full max-w-sm absolute scale-in-center bottom-50 right-40 bg-green-100">
      <div id="card-content" className="m-5 flex flex-col gap-5">
        <Button
          className="w-1 absolute top-1 right-2 bg-pink-200"
          onClick={closeContact}
        >
          X
        </Button>
        <MailForm />
      </div>
    </Card>
  );
}
