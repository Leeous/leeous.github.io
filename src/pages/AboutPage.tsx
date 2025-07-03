import PFP from '../assets/images/pfp.jpg';
import BlueskyIcon from '../components/icons/BlueskyIcon';
import EmailIcon from '../components/icons/EmailIcon';
import GitHubIcon from '../components/icons/GithubIcon';
import KeyIcon from '../components/icons/KeyIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import SteamIcon from '../components/icons/SteamIcon';

export default function Home() {
  return (
    <main className='about-page page'>
      <section className='about'>
        <h1 className='name'>Cody Fields</h1>
        <h4 className='location'>North Carolina, USA</h4>
        <img src={PFP} className='pfp' alt="A photo of Cody sitting in the woods." />
      </section>
      <section className='about-socials'>
        <ul>
          <li><a href="https://www.linkedin.com/in/leeous/" target='_blank'>Linkedin <LinkedInIcon /></a></li>
          <li><a href="https://github.com/Leeous" target='_blank'>Github <GitHubIcon /></a></li>
          <li><a href="https://bsky.app/profile/leeous.com" target='_blank'>Bluesky <BlueskyIcon /></a></li>
          <li><a href="https://steamcommunity.com/id/Leeous" target='_blank'>Steam <SteamIcon /></a></li>
          <li><a href="mailto:contact@leeous.com" target='_blank'>Email <EmailIcon /></a></li>
          <li><a href="https://keys.openpgp.org/search?q=contact%40leeous.com" target='_blank'>PGP Key <KeyIcon /></a></li>
        </ul>
      </section>
      <section className='about-bio'>
        <h2>Bio</h2>
        <p>
          Hey there! You can check out my projects <a href="#projects">right here</a>, as well as my dev blog. I'm super passionate about web development and the modding community.<br /><br />Feel free to shoot me a message anytime, whether it's just to chat or for business purposes.
          Email is the best way to reach me since I'm not on social media too often.<br /><br /> Right now, I'm on the hunt for an entry-level IT job and hoping to build a long-term career in the field.
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
      <figure><embed src='https://wakatime.com/share/@018cd227-4c79-474a-90a6-9837813301b4/bc8f0964-b605-4b10-95f6-7f8aa0c72d5a.svg' /></figure>
    </main>
  )
}