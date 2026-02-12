import React from "react";
import { Activity } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function MailForm() {
  const [mailSent, setMailSent] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [invalidField, setInvalidField] = React.useState<string | null>(null);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
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
      setTimeout(() => {
        setMailSent(false);
      }, 5000);
    } else {
      console.log("Failed to send message");
    }
  }

  return (
    <>
      <Activity mode={!mailSent ? "visible" : "hidden"}>
        <div id="form-container" className="flex flex-col gap-2">
          <h1>Want to get in touch? Great.</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <label htmlFor="name">Name: </label>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              className={invalidField === "name" ? "border-red-400" : ""}
            />
            <label htmlFor="E-mail">Email: </label>
            <Input
              type="text"
              name="email"
              placeholder="imsupercool@andveryhandsome.com"
              className={invalidField === "email" ? "border-red-400" : ""}
            />
            <label htmlFor="message">Message: </label>
            <Textarea
              name="message"
              placeholder="hellooo..?"
              className={invalidField === "message" ? "border-red-400" : ""}
            ></Textarea>
            <button
              type="submit"
              className="bg-black w-20 text-white rounded-sm font-normal hover:bg-gray-700 transition-colors"
            >
              Submit
            </button>
            <p className="text-xs text-red-400">{formError}</p>
          </form>
          <br />
          <p>
            ..or mail me directly at{" "}
            <a
              className="underline hover:text-(--main)"
              href="mailto:ulffwilliam@gmail.com"
            >
              ulffwilliam@gmail.com
            </a>
            .
          </p>
        </div>
      </Activity>
      <Activity mode={mailSent ? "visible" : "hidden"}>
        <h1>Message sent!</h1>
        <p>I'll get back to you as soon as I can :)</p>
      </Activity>
    </>
  );
}
