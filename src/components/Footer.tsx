import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Footer() {
  const [lastUpdate, setLastUpdate] = useState<string[]>([]);
  useEffect(() => {
    // Fetch most recent commits, display time since last commit as well as commit message in <Footer>
    fetch('https://api.github.com/repos/Leeous/Leeous.github.io/commits')
      .then(response => response.json())
      .then(data => {
        const timeSinceLastUpdate = dayjs(data[0]['commit']['author']['date']).startOf('second').fromNow()
        const lastCommitMessage = data[0]['commit']['message']
        setLastUpdate([timeSinceLastUpdate, lastCommitMessage])
      })
  }, [])
  return (
    <footer className="main-footer">
      <p><span id="poweredBy">Powered by coffee <span className="coffee">&#9749;</span></span></p>
      {lastUpdate.length != 0 &&
        <p className="footer-pageLastUpdated">
          page last updated <a href="${data[0]['html_url']}" target="_blank">{lastUpdate[0]}</a><br />
          <span className="update-desc">{lastUpdate[1]}</span>
        </p>
      }
      {lastUpdate.length == 0 &&
      <p>Loading...</p>
      }
    </footer>
  )
}