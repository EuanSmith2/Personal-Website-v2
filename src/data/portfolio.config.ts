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
