export const portfolioConfig = {
  personal: {
    name: "EUAN SMITH",
    displayName: "Euan Smith",
    title: "BSc Cybersecurity & Digital Forensics · Technological University Dublin",
    tagline: "Building systems, analyzing complexity, securing infrastructure.",
    // Single source of truth for the role strings used across <title>, the
    // hero, the meta description, and the Person structured data.
    roles: {
      jobTitle: "Cybersecurity & Digital Forensics Student",
      h1Descriptor:
        "Euan Smith — cybersecurity and digital forensics student based in Dublin, Ireland",
      metaDescription:
        "Euan Smith — cybersecurity and digital forensics student at TU Dublin. Counter-disinformation research with EDMO Ireland, a Linux home lab, and Python security tooling.",
    },
    avatar: "/profile.jpg",
    linkedin: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tryhackme: "https://tryhackme.com/p/EuanSmith",
    credly: "https://www.credly.com/users/euan-smith.c95be961",
    github: "https://github.com/EuanSmith2",
    orcid: "https://orcid.org/0009-0002-3699-9357",
    emailEncoded: "YnVzaW5lc3MuZXVhbkBob3RtYWlsLmNvbQ==", // btoa("business.euan@hotmail.com")
    cv: "/api/cv",
  },

  rotatingTitles: [
    { text: "Ethical Hacker in Training",       funny: false },
    { text: "InfoSec Student",                  funny: false },
    { text: "Counter-Disinformation Researcher", funny: false },
    { text: "Wannabe Mr. Robot",                funny: true  },
    { text: "Aspiring Digital Analyst",         funny: false },
    { text: "EU Changemaker (Team Ireland)",    funny: false },
    { text: "D&D Nerd (Gimbo the Wizard)",      funny: true  },
    { text: "Uploading GitHub Repos",           funny: false },
    { text: "Brussels-Bound This October",      funny: true  },
    { text: "Building Weird AI Things",         funny: false },
    { text: "Sometimes Breaking Things",        funny: true  },
    { text: "Publishing Websites",              funny: false },
  ],

  about: {
    narrative:
      "I'm a cybersecurity student at Technological University Dublin with a background spanning counter-disinformation research, AI automation, and hardware systems. I build things that work: a weekly fact-check pipeline for EDMO Ireland, automation tools that generate real returns, and home lab infrastructure that mirrors production environments. I'm drawn to complex systems: understanding how they fail, how they can be exploited, and how to make them resilient. My thinking is neurodivergent by nature: I follow threads others overlook, sit with problems until patterns emerge, and rarely accept that's just how it works as an answer.",
    tags: [
      "Cybersecurity", "Linux", "Python", "AI/ML", "Networking",
      "OSINT", "Hardware", "Virtualization", "Systems Admin", "Digital Forensics",
    ],
  },

  currentActivity: [
    {
      id: "freelance",
      icon: "globe",
      title: "Building & Networking",
      summary: "Client web work, Dublin tech scene, heading to TUD in September",
      detail:
        "Doing client web work, attending Dublin tech meetups — AWS All Builders, Python Ireland, security events — and working on personal projects. Starting BSc Cybersecurity & Digital Forensics at TU Dublin in September.",
    },
    {
      id: "sap",
      icon: "award",
      title: "SAP Certification",
      summary: "Security and AI integration learning path",
      detail:
        "Completing three SAP certifications: Learning Journey in Security and Compliance, Business Integrity Screening Fundamentals, and System Security Foundations. These cover enterprise security architecture, compliance frameworks, and AI-integrated business intelligence.",
    },
    {
      id: "tud",
      icon: "graduation-cap",
      title: "TUD Programme Prep",
      summary: "Entering BSc Cybersecurity & Digital Forensics",
      detail:
        "Preparing to enter the BSc in Cybersecurity and Digital Forensics at Technological University Dublin. This programme covers network security, digital forensics, ethical hacking, cryptography, and security operations, areas I've been self-studying for several years.",
    },
    {
      id: "homelab",
      icon: "server",
      title: "Home Lab",
      summary: "Linux servers, virtualization, networking experiments",
      detail:
        "Running a home lab environment with Linux servers, VMs, and network simulation tools. Current projects include setting up a SIEM stack, practising network segmentation, and experimenting with honeypot infrastructure for intrusion detection research.",
    },
    {
      id: "ai",
      icon: "cpu",
      title: "AI Projects",
      summary: "Computer vision, marketplace intelligence, automation",
      detail:
        "Building AI-driven tools, including a computer vision marketplace intelligence system that has generated measurable real-world financial returns, and a multi-agent AI sandbox inside a sandboxed VM for studying emergent agent behaviour.",
    },
    {
      id: "hardware",
      icon: "wrench",
      title: "Hardware & Legacy Systems",
      summary: "Repair, modification, retro infrastructure",
      detail:
        "Ongoing interest in hardware: building custom PCs, repairing and modifying consoles, working with legacy infrastructure, and understanding systems at the physical layer. This grounding in hardware informs how I think about software and security.",
    },
  ],

  timeline: [
    { year: "2016", label: "First Code",      description: "CoderDojo: Scratch game development, first exposure to programming logic",                                 era: "early"   as const },
    { year: "2018", label: "STEM Camp",        description: "Trinity College Dublin STEM camp: Python fundamentals, physics simulations, algorithmic thinking",         era: "early"   as const },
    { year: "2020", label: "Hardware Era",     description: "Built custom PC during COVID, game modding, console repair, hardware modification",                         era: "mid"     as const },
    { year: "2021", label: "AI Experiments",   description: "First AI automation experiments, exploring generative tools and scripting",                                 era: "mid"     as const },
    { year: "2023", label: "Systems Depth",    description: "Linux home lab, virtualization, advanced AI projects, cybersecurity self-study",                            era: "mid"     as const },
    { year: "2026", label: "EDMO & Research",   description: "Counter-disinformation research with EDMO Ireland; built fact-check automation pipeline; research project shared at DCU MA level", era: "present" as const },
  ],

  edmo: {
    organisation: "European Digital Media Observatory",
    affiliation: "Dublin City University · European Commission",
    role: "Researcher & Freelance Contributor · 2025–2026",
    mission:
      "EDMO operates under direct mandate from the European Commission as part of the European Democracy Action Plan. Bringing together fact-checkers, academics, and technology experts across all EU member states, it coordinates a network of independent researchers providing policy intelligence to the European Parliament and national governments on disinformation threats and information ecosystem integrity.",
    responsibilities: [
      "Conducted original counter-disinformation research: ran a controlled two-account social media experiment to empirically document algorithmic radicalisation, and interviewed EDMO Ireland's lead researcher on radical recruitment tactics, Digital Services Act enforcement gaps, and Big Tech's Dublin-based accountability failures. Presented findings to ~60 students.",
      "Research project shared by EDMO Ireland with Dr Eileen Culloty and Dr Jane Suitor at DCU — being considered for adaptation into an MA journalism module in 2027, cited as an example of the practical research skills aspiring journalists and researchers should have.",
      "Built a weekly fact-check round-up pipeline as a freelance contributor: pulls TheJournal.ie fact-checks, formats them to EDMO's house style, and posts a draft to edmohub.ie via the WordPress REST API for an editor to review and publish.",
      "Selected as one of four people representing Ireland in the ChangingTIDE Changemakers programme — an EU-funded (CERV) counter-disinformation initiative run by the Trans European Policy Studies Association in Brussels, with DCU's FuJo Institute as the Irish partner and mentoring from Young European Leadership. The cohort co-creates campaigns and brings them into dialogue with policymakers at national and EU level, starting with a Brussels intensive in October 2026.",
    ],
  },

  projects: [
    {
      id: "nzt-48",
      number: "01",
      name: "NZT-48",
      tags: ["Python", "AI Agents", "Self-Hosted", "Automation"],
      description:
        "A self-hosted personal AI system built on Claude Code: a Telegram interface, Obsidian-backed memory, and a set of background agents and monitors that handle briefings, research, and scheduling. Runs at zero marginal cost with no cloud dependency. My most-starred repository.",
      status: "Active",
      githubUrl: "https://github.com/EuanSmith2/NZT-48",
      caseStudy: {
        problem:
          "I wanted a genuinely capable personal assistant without paying per message or handing my notes to a third-party cloud API. Off-the-shelf tools either cost per use or lock your data in.",
        approach:
          "Built a personal AI operating system on top of a single Claude Code subscription: a Telegram bot as the interface, an Obsidian vault as long-term memory, a set of task agents (briefing, research, scheduling, recall) and background monitors, outbound email over SMTP, and a small web dashboard. Everything runs locally.",
        outcome:
          "Runs at zero marginal cost. Public on GitHub and my most-starred repository; reviewers described it as “clean code, no red flags, does what it says on the tin.”",
      },
    },
    {
      id: "radical-map",
      number: "02",
      name: "RadicalMap",
      tags: ["OSINT", "Python", "Network Analysis", "Counter-Disinformation"],
      description:
        "A research instrument for detecting, classifying, and mapping extremist content networks on short-form video platforms using only publicly accessible metadata. Flags coded language, numerical dog whistles, and hidden capitalisation sequences that evade automated moderation, then visualises the results as an interactive network graph. Grounded in DSA Article 40 researcher-access provisions and the GDPR Article 89 research exemption.",
      status: "Active",
      githubUrl: "https://github.com/EuanSmith2/radicalmap",
      caseStudy: {
        problem:
          "Extremist content spreads on short-form video platforms through coded language and numeric dog whistles that automated moderation misses. Researchers have a legal basis to study platform data under the DSA, but few practical tools to do it.",
        approach:
          "Built a Python instrument that scrapes public TikTok metadata, classifies content across categories (antisemitic, white-nationalist, conspiracy, radicalisation pipeline), and renders the connections as an interactive network graph. Framed explicitly as academic research tooling under DSA Article 40, GDPR Article 89, and CDSM Directive Article 3 — not activism.",
        outcome:
          "A working prototype (FastAPI + SQLite, dev dataset of one interconnected cluster). Shown to EDMO Ireland's lead researcher during a project kickoff — it was already a small-scale version of the network-mapping tool they were scoping.",
      },
    },
    {
      id: "marketplace",
      number: "03",
      name: "Marketplace Intelligence System",
      tags: ["Computer Vision", "Python", "ROI Modeling", "Automation"],
      description:
        "Autonomous system that identifies resale opportunities across online marketplaces using computer vision and pricing intelligence. Incorporates ROI calculation, risk scoring, and human-in-the-loop decision gates. Has generated measurable financial returns.",
      impact: "Donated to Merchants Quay Ireland",
      charityLogo: "/logos/mqi-logo.png",
      status: "Active",
      caseStudy: {
        problem:
          "Resale arbitrage is a real opportunity, but scanning listings across marketplaces by hand doesn't scale and it's easy to buy badly.",
        approach:
          "An autonomous pipeline: computer vision to read the item and its condition from listing photos, a pricing model for expected resale value, ROI and risk scoring, and a human-in-the-loop gate before any purchase is made.",
        outcome:
          "Has generated measurable financial returns. Proceeds donated to Merchants Quay Ireland.",
      },
    },
    {
      id: "reflex",
      number: "04",
      name: "Reflex",
      tags: ["Python", "Web Security", "XSS", "Security Tooling"],
      description:
        "An educational Python toolkit for learning common web vulnerability classes: reflected and DOM-based XSS, open redirects, and a mutation fuzzer, with coloured output and HTML reports. Built to understand how these attacks actually work, not to run against live targets.",
      status: "Complete",
      githubUrl: "https://github.com/EuanSmith2/reflex",
      caseStudy: {
        problem:
          "The best way to understand a vulnerability class is to implement its detection yourself, not read about it.",
        approach:
          "A Python toolkit covering reflected and DOM-based XSS, open redirects, and a mutation fuzzer, with coloured terminal output and HTML reports. Inspired by Google's Project Zero. Built for learning and demonstration against intentionally vulnerable test targets.",
        outcome:
          "Public on GitHub and pinned on my profile. Defensive framing throughout — it's a learning tool, not an attack tool.",
      },
    },
  ],

  certifications: [
    { issuer: "SAP",       name: "Learning Journey: Security and Compliance",  status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "SAP",       name: "Business Integrity Screening Fundamentals",  status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "SAP",       name: "System Security Foundations",                status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "ISC2",      name: "Candidate Member",                           status: "Member",  issuerColor: "#009A44", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "Microsoft", name: "AI Skills Fest 2026",                        status: "Earned",  issuerColor: "#0078d4", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
  ],

  learning: [
    { platform: "Google",        name: "Google Cybersecurity Certificate", status: "In Progress", icon: "google",    color: "#4285F4" },
    { platform: "Let's Defend",  name: "SOC Analyst Path",                 status: "In Progress", icon: "shield",    color: "#00C2FF" },
    { platform: "GRC Mastery",   name: "GRC Mastery Programme",            status: "In Progress", icon: "clipboard", color: "#a855f7" },
    { platform: "CompTIA",       name: "CompTIA Security+",                status: "In Progress", icon: "award",     color: "#C8202F" },
    { platform: "Hack The Box",  name: "Active HTB Player",                status: "Active",      icon: "terminal",  color: "#9FEF00" },
  ],

  lifestyle: {
    interests: [
      { icon: "", label: "Chess Club",      detail: "Competitive play" },
      { icon: "", label: "Student Council", detail: "Class representative" },
      { icon: "", label: "Academic Awards", detail: "Spirit of the Class, Stealth Award & Attendance Award" },
      { icon: "", label: "D&D Player",      detail: "Gimbo the Wizard (homebrew campaign)" },
      { icon: "", label: "Bouldering",      detail: "Indoor and outdoor rock climbing" },
    ],
    reading: [
      { title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto",    cover: "/books/web-hackers.jpg" },
      { title: "The Age of Surveillance Capitalism",    author: "Shoshana Zuboff",     cover: "/books/surveillance.jpg" },
      { title: "Thinking in Systems",                   author: "Donella H. Meadows",  cover: "/books/thinking-systems.jpg" },
      { title: "This Is How They Tell Me the World Ends", author: "Nicole Perlroth",    cover: "/books/world-ends.jpg" },
    ],
    finishedReading: [
      { title: "Atomic Habits",                          author: "James Clear",       cover: "/books/atomic-habits.jpg" },
      { title: "1984",                                   author: "George Orwell",     cover: "/books/1984.jpg" },
      { title: "Rich Dad Poor Dad",                      author: "Robert Kiyosaki",   cover: "/books/rich-dad.jpg" },
      { title: "The Art of Speaking Made Simple",        author: "",                  cover: "/books/art-speaking.jpg" },
      { title: "How to Win Friends and Influence People",author: "Dale Carnegie",     cover: "/books/how-to-win.jpg" },
      { title: "Thinking, Fast and Slow",                author: "Daniel Kahneman",   cover: "/books/thinking-fast.jpg" },
    ],
  },

  contact: {
    closing: "Let's build something worth building.",
    subtext:
      "I'm interested in opportunities that sit at the intersection of security, automation, and complex systems, whether that's a technical internship, a collaborative project, or just a conversation worth having.",
    github: "https://github.com/EuanSmith2",
  },

  floatingBadge: {
    title: "Open to internships",
    subtitle: "and collaboration",
    link: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tooltip: "Click to connect on LinkedIn",
  },
};
