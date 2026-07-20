export default function ResumePage() {
	// const [showPhoneNumber, setShowPhoneNumber] = useState(false);

	return (
		<>
			<div className="page">
				<main id="resume">
					<header>
						<h1>Cody Lee Fields</h1>
						<span>
							<a href="mailto:contact@leeous.com">contact@leeous.com</a> |
							Richmond, VA 23225
						</span>
					</header>
					<section>
						<h2 className="section-header">Work Experience</h2>
						<section className="sub-section">
							<h3 className="job-title">
								<b>Subject Matter Expert & Customer Support Specialist</b>
								<span className="company headway">Headway</span>
								<span className="timespan">Jul 2023 - May 2026</span>
								<span className="location">Remote</span>
							</h3>
							<ul>
                <li>
                  Investigated and triaged software bugs reported by support tiers, auditing API payloads and raw claims JSON data to isolate faults within complex carrier integration pipelines.
                </li>
                <li>
                  Managed the end-to-end support lifecycle using Jira, Zendesk, and Palantir Foundry, coordinating technical workflows to streamline engineering resolutions.
                </li>
                <li>
                  Built custom tracking tools, Slack workflows, and Google Apps Script automations to centralize carrier data and significantly reduce agent downtime.
                </li>
                <li>
                  Authored internal technical documentation, system runbooks, and new SOP guidelines to standardize troubleshooting protocols and increase cross-team productivity.
                </li>
                <li>
                  Resolved complex billing discrepancies and verified patient eligibility by making 10-25 daily carrier calls, transcribing health plan benefits, and assisting providers with credentialing.
                </li>
							</ul>
						</section>
						<section className="sub-section">
							<h3 className="job-title">
								<b>Full-Stack Web Developer & Designer</b>
								<span className="company">Leeous.com</span>
								<span className="timespan">Jan 2019 - Present</span>
								<span className="location">Roanoke Rapids, NC</span>
							</h3>
							<ul>
								<li>
									Architect and deploy responsive, custom web applications
									utilizing a modern stack including React, TypeScript, Rsbuild,
									and SCSS
								</li>
								<li>
									Prioritize clean HTML structures, semantic markup, and
									performance optimization to deliver highly accessible user
									experiences.
								</li>
								<li>
									Manage full project lifecycles for concurrent clients,
									including gathering technical requirements, defining clear
									project scopes, drafting legal disclaimers, and collaborating
									on design execution.
								</li>
								<li>
									Maintain active version control and open-source project
									documentation via GitHub, ensuring high-quality,readable
									codebases.
								</li>
							</ul>
						</section>
						<section className="sub-section">
							<h3 className="job-title">
								<b>Lead Sales / Key holder</b>
								<span className="badge food-lion">Food Lion</span>
								<span className="timespan">Jan 2023 - Jul 2023</span>
								<span className="location">Roanoke Rapids, NC</span>
							</h3>
							<ul>
								<li>
									Created new methods of handling backstock to reduce shrink and
									increase productivity.
								</li>
								<li>
									Trained new workers on safe use of equipment such as motorized
									pallet jacks and baler.
								</li>
							</ul>
						</section>
						<section className="sub-section">
							<h3 className="section-title">
								<b>Shift Manager</b>
								<span className="badge cvs">CVS</span>
								<span className="timespan">Jun 2022 - Jan 2023</span>
								<span className="location">Asheville, NC</span>
							</h3>
							<ul>
								<li>
									Drove sign-ups for CarePass to push our store to the top of
									performance charts and increase customer loyalty.
								</li>
							</ul>
						</section>
					</section>
					<section>
						<h2 className="section-header">Education</h2>
						<section className="sub-section">
							<h3>
								Halifax Community College <span>2019</span><span>Halifax, NC</span>
							</h3>
							<ul>
								<li>GED</li>
							</ul>
						</section>
					</section>
					<section>
						<h2 className="section-header">Skills & Interests</h2>
						<section className="sub-section additional">
              <div className="skills-column">
                <h3>Engineering & AI</h3>
                <ul>
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
              </div>

              <div className="skills-column">
                <h3>Technical Ops & Support</h3>
                <ul>
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
              </div>

              <div className="skills-column">
                <h3>Healthcare Ops & Interests</h3>
                <ul>
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
                  {/* <li className="interests-separator">Interests:</li>
                  <li>FOSS & Linux Customization</li>
                  <li>Game Development & 3D Modeling</li>
                  <li>Building Computers & Twin Peaks</li> */}
                </ul>
              </div>
						</section>
					</section>
				</main>
			</div>
		</>
	);
}
