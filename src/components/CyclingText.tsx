import { useState, useEffect } from "react";

interface CyclingTextProps {
  text: string;
  cyclingText: string[];
  intervalInSeconds?: number;
}

/**
 * Props for CyclingText component
 * @interface CyclingTextProps
 * @property {string} text - The main text to display
 * @property {string[]} cyclingText - An array of strings to cycle through
 * @property {number} [intervalInSeconds=3] - The interval in seconds for cycling the text (default is 3 seconds)
 */


export default function CyclingText({text, cyclingText, intervalInSeconds = 3}: CyclingTextProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Don't start if array is not > 1
    if (cyclingText.length <= 1) return;

    // @type {ReturnType<typeof setInterval>}
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cyclingText.length);
    }, intervalInSeconds * 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [cyclingText.length, intervalInSeconds]);

  return (
    <p>{text}<span className="cycling-text-span">{cyclingText[index]}</span></p>
  );
}