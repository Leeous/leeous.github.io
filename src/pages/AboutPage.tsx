import ReactMarkdown, { type Components } from 'react-markdown';
import BlueskyIcon from '../assets/svg/butterfly.svg';
import EmailIcon from '../assets/svg/email.svg';
import GitHubIcon from '../assets/svg/github.svg';
import KeyIcon from '../assets/svg/key.svg';
import LinkedInIcon from '../assets/svg/linkedin.svg';
import SteamIcon from '../assets/svg/steam.svg';
import { Helmet } from 'react-helmet';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import bioMD from '../assets/data/bio.md?raw';
import PFP from '/images/pfp.jpg?url';

export default function AboutPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
        setBio(bioMD);
        setLoading(false);
    })();
  });

  const components: Components = {
    h1: ({ ...props }) => <h1 className="post-h1" {...props} />,
    h2: ({ ...props }) => <h2 className="post-h2" {...props} />,
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>,
    table: ({ ...props }) => <table className="post-table" {...props}>{props.children}</table>,
    thead: ({ ...props }) => <thead className="post-table-header" {...props}>{props.children}</thead>,
    tr: ({ ...props }) => <tr className="post-table-row" {...props}>{props.children}</tr>,
    th: ({ ...props }) => <th className="post-table-row-header" {...props}>{props.children}</th>,
    td: ({ ...props }) => <td className="post-table-value" {...props}>{props.children}</td>,
  };

  if (loading) return <Spinner />;

  return (
    <main className='about-page page'>
      <Helmet>
        <title>About | Leeous</title>
        {/* <meta property="og:description" content="All of my projects, pulled from my Github." /> */}
      </Helmet>
      <section className='about'>
        <h1 className='name'>Cody Fields</h1>
        <h4 className='location'>North Carolina, USA</h4>
        <img src={PFP} className='pfp' alt="A photo of Cody sitting in the woods." />
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
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {bio}
        </ReactMarkdown>
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
      <figure><embed src="https://wakatime.com/share/@Leeous/1dac96b0-6af3-4d96-aef7-5d26f5e9a823.svg"></embed></figure>
    </main>
  )
}