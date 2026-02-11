import { FormEvent } from "react";

export default function MailForm() {
  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="E-mail">E-mail</label>
      <input
        type="email"
        name="E-mail"
        className="border"
        placeholder="imsupercool@andveryhandsome.com"
      />
      <label htmlFor="message">Message</label>
      <input
        type="text"
        name="message"
        className="border"
        placeholder="hellooo..?"
      />
      <button type="submit" className="border w-20">
        Submit
      </button>
    </form>
  );
}
