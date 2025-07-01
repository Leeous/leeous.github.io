import PFP from '../assets/pfp.jpg';

export default function Home() {
  return(
    <main className='about-page page'>
      <h3>Cody Fields</h3>
      <h4>North Carolina, USA</h4>
      <img src={PFP} className='pfp' alt="A photo of Cody sitting in the woods." />
    </main>
  )
}