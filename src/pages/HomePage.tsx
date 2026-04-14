import CyclingText from "../components/CyclingText";

export default function HomePage() {
  return (
    <div>
      <h2><span style={{fontWeight: 500}}>Hi, my name is</span> Cody</h2>
      <CyclingText text="Hello word, " cyclingText={["yeet", "meat", "teet"]} />
    </div>
  );
}