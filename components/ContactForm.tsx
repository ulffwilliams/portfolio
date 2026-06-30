"use client";
import React from "react";

export default function ContactForm() {
  const [mailSent, setMailSent] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [invalidField, setInvalidField] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    )?.value.trim();

    // Validation
    if (!name || name.length === 0) {
      setFormError("Name must include at least ONE character..");
      setInvalidField("name");
      setTimeout(() => {
        setFormError("");
        setInvalidField(null);
      }, 5000);
      return;
    }
    if (!email || !/^.+@.+$/.test(email)) {
      setFormError("Email must contain characters and an @ symbol.");
      setInvalidField("email");
      setTimeout(() => {
        setFormError("");
        setInvalidField(null);
      }, 5000);
      return;
    }
    if (!message || message.length < 5) {
      setFormError("Message must be at least 5 characters long.");
      setInvalidField("message");
      setTimeout(() => {
        setFormError("");
        setInvalidField(null);
      }, 5000);
      return;
    }

    const formData = new FormData(form);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setMailSent(true);
      form.reset();
      try {
        await new Audio("/email-sent.mp3").play();
      } catch (e) {
        console.error("Failed to play sound:", e);
      }
      setTimeout(() => setMailSent(false), 5000);
    } else {
      setFormError("Failed to send message. Try again.");
      setTimeout(() => setFormError(""), 5000);
    }
  }

  if (mailSent) {
    return (
      <div className="w-full flex flex-col gap-3 justify-center border-2 p-8">
        <h3 className="text-2xl uppercase">Message sent! ✅</h3>
        <p className="font-normal normal-case">
          I&apos;ll get back to you as soon as I can :)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="uppercase w-full flex flex-col gap-7">
      <label htmlFor="name" className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2">Name</span>
        <input
          type="text"
          name="name"
          id="name"
          className={`border-2 h-14 px-4 text-lg ${invalidField === "name" ? "border-red-500" : ""}`}
        />
      </label>

      <label htmlFor="email" className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2">Email</span>
        <input
          type="text"
          name="email"
          id="email"
          className={`border-2 h-14 px-4 text-lg ${invalidField === "email" ? "border-red-500" : ""}`}
        />
      </label>

      <label htmlFor="message" className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2">Message</span>
        <textarea
          name="message"
          id="message"
          className={`border-2 h-44 p-4 text-lg resize-none ${invalidField === "message" ? "border-red-500" : ""}`}
        />
      </label>

      {formError && (
        <p className="text-sm text-red-500 normal-case">{formError}</p>
      )}

      <button
        type="submit"
        className="text-white bg-gray-900 h-16 text-lg rounded-xl uppercase shadow-lg hover:bg-gray-700 transition"
      >
        Send message
      </button>
    </form>
  );
}
