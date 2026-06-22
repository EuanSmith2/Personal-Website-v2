import type { Metadata } from "next"
import { PrintButton } from "./PrintButton"

export const metadata: Metadata = {
  title: "Euan Smith — CV",
  description: "Curriculum Vitae — Euan Smith",
}

export default function CVPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: white !important;
          color: black !important;
        }

        .cv-root {
          background: white;
          color: #111;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 11pt;
          line-height: 1.5;
          max-width: 750px;
          margin: 0 auto;
          padding: 40px 40px 60px;
        }

        .cv-header {
          border-bottom: 2px solid #111;
          padding-bottom: 10px;
          margin-bottom: 18px;
        }

        .cv-name {
          font-size: 22pt;
          font-weight: bold;
          letter-spacing: 0.02em;
          margin-bottom: 4px;
        }

        .cv-contact {
          font-size: 9.5pt;
          color: #333;
          display: flex;
          flex-wrap: wrap;
          gap: 0 16px;
        }

        .cv-contact a {
          color: #333;
          text-decoration: none;
        }

        .cv-section {
          margin-bottom: 16px;
        }

        .cv-section-title {
          font-size: 10pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid #aaa;
          padding-bottom: 2px;
          margin-bottom: 8px;
        }

        .cv-entry {
          margin-bottom: 10px;
        }

        .cv-entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px;
        }

        .cv-entry-title {
          font-weight: bold;
          font-size: 10.5pt;
        }

        .cv-entry-sub {
          font-style: italic;
          font-size: 9.5pt;
          color: #444;
        }

        .cv-entry-note {
          font-size: 9.5pt;
          color: #444;
          margin-top: 1px;
          margin-bottom: 3px;
        }

        .cv-list {
          padding-left: 18px;
          margin-top: 3px;
        }

        .cv-list li {
          margin-bottom: 2px;
          font-size: 10pt;
        }

        .cv-para {
          font-size: 10pt;
          color: #222;
        }

        .cv-inline-list {
          font-size: 10pt;
          color: #222;
        }

        .cv-certs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 24px;
          font-size: 10pt;
        }

        .cv-cert-item {
          padding: 1px 0;
        }

        .cert-status {
          font-size: 8.5pt;
          color: #666;
          margin-left: 4px;
        }

        .print-only-hidden {
          margin-bottom: 24px;
          text-align: right;
        }

        .print-btn {
          display: inline-block;
          padding: 8px 20px;
          background: #111;
          color: white;
          font-family: sans-serif;
          font-size: 13px;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .print-btn:hover {
          background: #333;
        }

        @media print {
          .print-only-hidden { display: none !important; }
          .cv-root { padding: 0; max-width: 100%; }
          body { margin: 0; }
          @page { margin: 15mm 18mm; }
        }

        @media (max-width: 600px) {
          .cv-root { padding: 24px 20px 40px; }
          .cv-certs-grid { grid-template-columns: 1fr; }
          .cv-entry-header { flex-direction: column; }
        }
      `}</style>

      <div className="cv-root">
        {/* Download / Print button */}
        <div className="print-only-hidden">
          <PrintButton />
        </div>

        {/* Header */}
        <div className="cv-header">
          <div className="cv-name">Euan Smith</div>
          <div className="cv-contact">
            <span>Dublin, Ireland</span>
            <a href="mailto:business.euan@hotmail.com">business.euan@hotmail.com</a>
            <a href="https://github.com/EuanSmith2" target="_blank" rel="noopener noreferrer">github.com/EuanSmith2</a>
            <a href="https://www.linkedin.com/in/euan-smith-4295123a6/" target="_blank" rel="noopener noreferrer">linkedin.com/in/euan-smith</a>
          </div>
        </div>

        {/* Profile */}
        <div className="cv-section">
          <div className="cv-section-title">Profile</div>
          <p className="cv-para">
            Cybersecurity student at Technological University Dublin, currently interning at the European Digital Media
            Observatory. I build practical tools — a computer vision system that identifies marketplace resale
            opportunities and has generated real financial returns, a home lab running SIEM stacks and honeypot setups,
            and custom websites for paying clients. I&rsquo;m interested in how systems fail, how attackers think, and how to
            design things that stay secure. Background spans Python automation, web development, and hardware.
          </p>
        </div>

        {/* Education */}
        <div className="cv-section">
          <div className="cv-section-title">Education</div>

          <div className="cv-entry">
            <div className="cv-entry-title">BSc Cybersecurity &amp; Digital Forensics</div>
            <div className="cv-entry-sub">Technological University Dublin</div>
            <div className="cv-entry-note">Modules: network security, digital forensics, ethical hacking, cryptography, security operations</div>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-title">Harold&rsquo;s Cross Educate Together Secondary School</div>
            <ul className="cv-list">
              <li>Student Council Representative</li>
              <li>Spirit of the Class Award</li>
              <li>Stealth Award</li>
              <li>Attendance Award</li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="cv-section">
          <div className="cv-section-title">Experience</div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <div className="cv-entry-title">Software Developer Intern — European Digital Media Observatory</div>
              <div className="cv-entry-sub">Dublin City University · Summer 2026</div>
            </div>
            <div className="cv-entry-note">EDMO operates under European Commission mandate as part of the European Democracy Action Plan, coordinating anti-disinformation research across all EU member states.</div>
            <ul className="cv-list">
              <li>Built internal automation tooling and API integrations to EU institutional standards</li>
              <li>Managed CMS workflows and the editorial publication pipeline</li>
              <li>Developed social media scheduling tools and performance analytics scripts</li>
              <li>Cut manual editorial overhead through backend process automation</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <div className="cv-entry-title">Freelance Web Developer</div>
              <div className="cv-entry-sub">Independent</div>
            </div>
            <ul className="cv-list">
              <li>Designed and hand-coded custom websites for paying clients using Next.js and Tailwind CSS</li>
              <li>Handled project scoping, design, development, and delivery end-to-end</li>
            </ul>
          </div>
        </div>

        {/* Projects */}
        <div className="cv-section">
          <div className="cv-section-title">Projects</div>

          <div className="cv-entry">
            <div className="cv-entry-title">Marketplace Intelligence System</div>
            <ul className="cv-list">
              <li>Computer vision tool that scans online marketplaces for profitable resale opportunities</li>
              <li>Automated ROI calculation, risk scoring, and human-in-the-loop decision gates</li>
              <li>Has generated measurable real financial returns — ~&euro;500 donated to Merchants Quay Ireland</li>
              <li>Stack: Python, computer vision libraries, custom pricing models</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-title">Multi-Agent AI Sandbox</div>
            <ul className="cv-list">
              <li>Isolated VM running autonomous LLM agents interacting with browser environments</li>
              <li>Studies emergent agent communication and coordination without human supervision</li>
              <li>Designed as a controlled research environment, not a production system</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-title">Home Lab Infrastructure</div>
            <ul className="cv-list">
              <li>Linux servers, VMs, and network simulation — mirrors production security environments</li>
              <li>Running SIEM stack, honeypot infrastructure, and network segmentation experiments</li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="cv-section">
          <div className="cv-section-title">Certifications</div>
          <div className="cv-certs-grid">
            <div className="cv-cert-item">SAP: Security and Compliance Learning Journey <span className="cert-status">Earned</span></div>
            <div className="cv-cert-item">SAP: Business Integrity Screening Fundamentals <span className="cert-status">Earned</span></div>
            <div className="cv-cert-item">SAP: System Security Foundations <span className="cert-status">Earned</span></div>
            <div className="cv-cert-item">ISC2 Candidate Member <span className="cert-status">Active</span></div>
            <div className="cv-cert-item">Microsoft AI Skills Fest 2026 <span className="cert-status">Earned</span></div>
          </div>
        </div>

        {/* In Progress */}
        <div className="cv-section">
          <div className="cv-section-title">In Progress</div>
          <p className="cv-inline-list">
            Google Cybersecurity Certificate &nbsp;·&nbsp; CompTIA Security+ &nbsp;·&nbsp; GRC Mastery Programme &nbsp;·&nbsp; Hack The Box (Active player)
          </p>
        </div>

        {/* Skills */}
        <div className="cv-section">
          <div className="cv-section-title">Technical Skills</div>
          <p className="cv-inline-list">
            <strong>Languages:</strong> Python, JavaScript/TypeScript, HTML/CSS<br />
            <strong>Security:</strong> OSINT, network security, digital forensics, SIEM, honeypots, home lab ops<br />
            <strong>Tools:</strong> Linux, Git, virtualization, browser automation, computer vision<br />
            <strong>Web:</strong> Next.js, React, Tailwind CSS, REST APIs
          </p>
        </div>

        {/* Interests */}
        <div className="cv-section">
          <div className="cv-section-title">Interests</div>
          <p className="cv-inline-list">
            Chess &nbsp;·&nbsp; Dungeons &amp; Dragons &nbsp;·&nbsp; Bouldering &nbsp;·&nbsp; Reading (security, systems thinking, economics)
          </p>
        </div>
      </div>
    </>
  )
}
