import PFP from '../assets/pfp.jpg';

export default function Home() {
  return(
    <main className='about-page page'>
      <section className='about'>
        <h1 className='name'>Cody Fields</h1>
        <h4 className='location'>North Carolina, USA</h4>
        <img src={PFP} className='pfp' alt="A photo of Cody sitting in the woods." />
      </section>
      <section className='about-socials'>
        <ul>
          <li><a href="#">Buy me a coffee</a></li>
          <li><a href="#">Linkedin</a></li>
          <li><a href="#">Github</a></li>
          <li><a href="#">Email</a></li>
          <li><a href="#">PGP Key</a></li>
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
      </section>
    </main>
  )
}