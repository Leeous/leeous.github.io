import { useState } from "react";

export default function ResumePage() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  return(
    <>
    <main id="resume">
      <header>
        <h1>Cody Lee Fields</h1>
        <span>
          <a href="mailto:contact@leeous.com">contact@leeous.com</a>|
        </span>
      </header>
      <section>
        <h1>Work Experience</h1>
      </section>
      <section>
        <h1>Education</h1>
      </section>
      <section>
        <h1>Skills & Interests</h1>
      </section>
    </main>
    </>
  );
}