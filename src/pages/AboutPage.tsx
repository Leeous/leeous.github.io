import { Link } from 'react-router-dom';
import BlueskyIcon from '../assets/svg/butterfly.svg';
import EmailIcon from '../assets/svg/email.svg';
import GitHubIcon from '../assets/svg/github.svg';
import KeyIcon from '../assets/svg/key.svg';
import LinkedInIcon from '../assets/svg/linkedin.svg';
import SteamIcon from '../assets/svg/steam.svg';
import { Helmet } from 'react-helmet';

export default function AboutPage() {
  return (
    <main className='about-page page'>
      <Helmet>
        <title>About | Leeous</title>
        {/* <meta property="og:description" content="All of my projects, pulled from my Github." /> */}
      </Helmet>
      <section className='about'>
        <h1 className='name'>Cody Fields</h1>
        <h4 className='location'>North Carolina, USA</h4>
        <img src="/images/pfp.jpg" className='pfp' alt="A photo of Cody sitting in the woods." />
        {/* TODO: need to precache pfp */}
      </section>
      <section className='about-socials'>
        <ul>
          <li><a href="https://www.linkedin.com/in/leeous/" target='_blank'>Linkedin <img className='icon' src={LinkedInIcon} alt='LinkedIn Icon' /></a></li>
          <li><a href="https://github.com/Leeous" target='_blank'>Github <img className='icon' src={GitHubIcon} alt='Github Icon' /></a></li>
          <li><a href="https://bsky.app/profile/leeous.com" target='_blank'>Bluesky <img className='icon' src={BlueskyIcon} alt='Bluesky Icon' /></a></li>
          <li><a href="https://steamcommunity.com/id/Leeous" target='_blank'>Steam <img className='icon' src={SteamIcon} alt='Steam Icon' /></a></li>
          <li><a href="mailto:contact@leeous.com" target='_blank'>Email <img className='icon' src={EmailIcon} alt='Email Icon' /></a></li>
          <li><a href="https://keys.openpgp.org/search?q=contact%40leeous.com" target='_blank'>PGP Key <img className='icon' src={KeyIcon} alt='Key Icon' /></a></li>
        </ul>
      </section>
      <section className='about-bio'>
        <h2>Bio</h2>
        <p>
          Hey! Thanks for stopping by — <Link to={"projects"}>here</Link> you’ll find my personal projects and developer blog. I’m really passionate about web development and love contributing to the modding community.
          <br/><br/>
          Feel free to reach out anytime, whether you just want to chat or talk shop. I’m most responsive by email, since I’m not very active on social media.
          <br/><br/>
          At the moment, I’m actively looking for an entry-level role in IT and excited to kickstart a long-term career in the field.
        </p>
      </section>
      <section className='skills'>
        <h2>Skills</h2>
        <details className="skill-label">
          <summary>Modding & Game Tools</summary>
          <ul className='skill-list'>
            <li>Server Management/Hosting</li>
            <li>Source Engine</li>
            <li>User Management</li>
            <li>Hammer Editor</li>
            <li>Mod Development (Lua, C#)</li>
            <li>Forum Moderation/Hosting</li>
          </ul>
        </details>
        <details className='skill-label'>
          <summary>IT</summary>
          <ul className='skill-list'>
            <li>General Documentation</li>
            <li>Full-stack Web development</li>
            <li>Blender</li>
            <li>Ubuntu Server</li>
            <li>HPE server management</li>
            <li>Windows</li>
            <li>SecOps awareness</li>
            <li>PC building/repair</li>
            <li>Mobile device repair</li>
            <li>UX optimization</li>
            <li>Photoshop/Gimp</li>
          </ul>
        </details>
        <details className='skill-label'>
          <summary>Other</summary>
          <ul className='skill-list'>
            <li>Cash/check management</li>
            <li>Team Management</li>
            <li>Bank deposits</li>
            <li>Photo lab</li>
            <li>Stocking Logistics</li>
            <li>CCTV operation</li>
            <li>Insurance Agent</li>
            <li>Product Advertisement</li>
            <li>Customer Relations</li>
            <li>Fraud Prevention</li>
          </ul>
        </details>
      </section>
      {/* <figure className='wakatime'><embed src='https://wakatime.com/share/@018cd227-4c79-474a-90a6-9837813301b4/bc8f0964-b605-4b10-95f6-7f8aa0c72d5a.svg' /></figure> */}
    </main>
  )
}