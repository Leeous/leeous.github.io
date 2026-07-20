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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Spinner from '../components/Spinner';
import bioMD from '../assets/data/bio.md?raw';
import PFP from '/images/pfp.jpg?url';

dayjs.extend(relativeTime);

type RecentTrack = {
  name: string;
  artist: string;
  albumArt?: string | null;
  playedAt?: string | null;
  addedAt?: string | null;
  url?: string | null;
};

type RecentTracksResponse = {
  data?: {
    recentTracks?: RecentTrack[];
    playlistTracks?: RecentTrack[];
  };
  errors?: Array<{
    message: string;
  }>;
};

export default function AboutPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [bio, setBio] = useState<string | null>(null);
  const [isXxxl, setIsXxxl] = useState<boolean>(false);
  const [tracksLoading, setTracksLoading] = useState<boolean>(true);
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);

  useEffect(() => {
    setBio(bioMD);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 1900px)');
    const onChange = (event: MediaQueryListEvent) => setIsXxxl(event.matches);

    setIsXxxl(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadRecentTracks = async () => {
      try {
        const response = await fetch('/.netlify/functions/spotify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query PlaylistTracks($playlistId: String!) {
                playlistTracks(playlistId: $playlistId) {
                  name
                  artist
                  albumArt
                  addedAt
                  url
                }
              }
            `,
            variables: {
              playlistId: '35WuGFVDeikWUJo4KEXRYr',
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Spotify request failed: ${response.status}`);
        }

        const payload = (await response.json()) as RecentTracksResponse;

        if (payload.errors?.length) {
          throw new Error(payload.errors[0].message);
        }

        if (isMounted) {
          setRecentTracks(payload.data?.playlistTracks ?? []);
        }
      } catch (error) {
        console.error('Failed to load recent Spotify tracks:', error);
        if (isMounted) {
          setRecentTracks([]);
        }
      } finally {
        if (isMounted) {
          setTracksLoading(false);
        }
      }
    };

    loadRecentTracks();

    return () => {
      isMounted = false;
    };
  }, []);

  const components: Components = {
    h1: ({ ...props }) => <h1 className="post-h1" {...props} />,
    h2: ({ ...props }) => <h2 className="post-h2" style={{marginBottom: 0}} {...props} />,
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>,
    table: ({ ...props }) => <table className="post-table" {...props}>{props.children}</table>,
    thead: ({ ...props }) => <thead className="post-table-header" {...props}>{props.children}</thead>,
    tr: ({ ...props }) => <tr className="post-table-row" {...props}>{props.children}</tr>,
    th: ({ ...props }) => <th className="post-table-row-header" {...props}>{props.children}</th>,
    td: ({ ...props }) => <td className="post-table-value" {...props}>{props.children}</td>,
    sub: ({ ...props }) => <sub>{props.children}</sub>,
  };

  if (loading) return <Spinner />;

  return (
    <main className='about-page page'>
      <Helmet>
        <title>About | Leeous</title>
        {/* <meta property="og:description" content="All of my projects, pulled from my Github." /> */}
      </Helmet>
      <div className='about-columns'>
        <div className='about-sidebar'>
          <div className='about-sidebar-inner'>
          <section className='about'>
            <h1 className='name'>Cody Fields</h1>
            <h4 className='location'>North Carolina, USA</h4>
            <img src={PFP} className='pfp' alt="A photo of Cody sitting in the woods." />
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
             
          </div>
        </div>
        <section className='about-bio'>
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {bio}
          </ReactMarkdown>
        </section>
        <section className='about-spotify'>
          <h2>Recently Played</h2>
          {tracksLoading && <p>Loading tracks...</p>}
          {!tracksLoading && recentTracks.length === 0 && <p>No recent tracks found.</p>}
          {!tracksLoading && recentTracks.length > 0 && (
            <ul className='spotify-track-list'>
              {recentTracks.map((track, index) => (
                <li key={`${track.name}-${track.artist}-${track.playedAt}`}>
                  <a href={track.url ?? '#'} target='_blank' rel='noopener noreferrer'>
                    <span className={`spotify-vinyl${index === 0 ? ' spotify-vinyl--spinning' : ''}`}>
                      {track.albumArt ? (
                        <img
                          className='spotify-album-art'
                          src={track.albumArt}
                          alt={`${track.name} album artwork`}
                          loading='lazy'
                        />
                      ) : (
                        <span className='spotify-album-fallback' aria-hidden='true'>♪</span>
                      )}
                    </span>
                    <span className='spotify-track-content'>
                      <span className='spotify-track-name'>{track.name}</span>
                      <span className='spotify-track-artist'>{track.artist}</span>
                        {(track.addedAt ?? track.playedAt) && (
                          <span className='spotify-track-time'>
                            {track.addedAt ? `Added ${dayjs(track.addedAt).fromNow()}` : `Played ${dayjs(track.playedAt).fromNow()}`}
                          </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className='skills'>
          <h2>Skills</h2>
            <details className="skill-label" open={isXxxl}>
            <summary>Healthcare Ops</summary>
            <ul className='skill-list'>
              <li>Claims Denials</li>
              <li>Appeals Management</li>
              <li>Insurance Benefit Verification</li>
              <li>HIPAA Compliance</li>
              <li>EHR / EMR Platforms & Proficiency</li>
              <li>Payer Relations</li>
              <li>Payer Portals</li>
              <li>Provider Express</li>
              <li>Availity</li>
              <li>CAQH</li>
            </ul>
          </details>
          <details className="skill-label" open={isXxxl}>
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
          <details className='skill-label' open={isXxxl}>
            <summary>Technical Ops & Support</summary>
            <ul className='skill-list'>
              <li>Technical Support</li>
              <li>Customer Service</li>
              <li>Issue Tracking & Root Cause Analysis</li>
              <li>API / JSON Validation</li>
              <li>Slack</li>
              <li>Problem Solving</li>
              <li>Confluence</li>
              <li>Technical Documentation</li>
              <li>Jira</li>
              <li>Palantir Foundry & Looker</li>
              <li>Trello</li>
              <li>Office 365 / G Suite</li>
              <li>Zendesk</li>
              <li>Discord</li>
              <li>Teams</li>
            </ul>
          </details>
          <details className='skill-label' open={isXxxl}>
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
              <li>JavaScript / TypeScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>HTML5 / CSS3</li>
              <li>SQL & PostgreSQL</li>
              <li>Lua</li>
              <li>Docker</li>
              <li>AI-Assisted Development</li>
              <li>Git</li>
              <li>AI Contextual Prompting</li>
              <li>GitHub</li>
              <li>Prompt Engineering</li>
            </ul>
          </details>
          <details className='skill-label' open={isXxxl}>
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
      </div>
      <figure><embed src="https://wakatime.com/share/@Leeous/1dac96b0-6af3-4d96-aef7-5d26f5e9a823.svg"></embed></figure>
    </main>
  )
}