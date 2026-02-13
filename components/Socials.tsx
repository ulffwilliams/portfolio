import React from "react";

export default function Socials() {

    const socials = [
        { name: "GitHub", url: "https://github.com/ulffwilliams", icon: "/github-icon.svg", alt: "GitHub-icon" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/william-ulff-12325923a", icon: "/linkedin-icon.svg", alt: "LinkedIn-icon" }

    ]

    return(
        <div id="socials-container" className="flex gap-5 mt-5">
            {socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                    <img src={social.icon} alt={social.alt} className="w-10 h-10 hover:scale-120  transition" />
                </a>
            ))}
        </div>
    );
}