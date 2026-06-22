export const portfolioConfig = {
  personal: {
    name: "EUAN SMITH",
    displayName: "Euan Smith",
    title: "BSc Cybersecurity & Digital Forensics · Technological University Dublin",
    tagline: "Building systems, analyzing complexity, securing infrastructure.",
    avatar: "/profile.jpg",
    linkedin: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tiktok: "https://www.tiktok.com/@euan_smith?is_from_webapp=1&sender_device=pc",
    credly: "https://www.credly.com/users/euan-smith.c95be961",
    github: "https://github.com/EuanSmith2",
    emailEncoded: "YnVzaW5lc3MuZXVhbkBob3RtYWlsLmNvbQ==", // btoa("business.euan@hotmail.com")
    cv: "/api/cv",
  },

  rotatingTitles: [
    { text: "Ethical Hacker in Training",  funny: false },
    { text: "InfoSec Student",             funny: false },
    { text: "Developing Software",         funny: false },
    { text: "Wannabe Mr. Robot",           funny: true  },
    { text: "Aspiring Digital Analyst",    funny: false },
    { text: "Building Weird AI Things",    funny: false },
    { text: "D&D Nerd (Gimbo the Wizard)", funny: true  },
    { text: "Uploading GitHub Repos",      funny: false },
    { text: "Sometimes Breaking Things",   funny: true  },
    { text: "Publishing Websites",         funny: false },
  ],

  about: {
    narrative:
      "I'm a cybersecurity student at Technological University Dublin with a background spanning AI automation, hardware systems, and digital forensics. I build things that work: automation tools that generate real returns, AI agents that explore emergent behaviour, and home lab infrastructure that mirrors production environments. I'm drawn to complex systems: understanding how they fail, how they can be exploited, and how to make them resilient. My thinking is neurodivergent by nature: I follow threads others overlook, sit with problems until patterns emerge, and rarely accept that's just how it works as an answer.",
    tags: [
      "Cybersecurity", "Linux", "Python", "AI/ML", "Networking",
      "OSINT", "Hardware", "Virtualization", "Systems Admin", "Digital Forensics",
    ],
  },

  currentActivity: [
    {
      id: "edmo",
      icon: "globe",
      title: "EDMO Internship",
      summary: "Upcoming role with the European Digital Media Observatory",
      detail:
        "Starting a summer internship at the European Digital Media Observatory via Dublin City University, working on website content management, social media automation, and backend process tooling for one of the EU's primary anti-disinformation networks.",
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
    { year: "2025", label: "EDMO",             description: "Upcoming internship at European Digital Media Observatory via Dublin City University",                      era: "present" as const },
  ],

  edmo: {
    organisation: "European Digital Media Observatory",
    affiliation: "Dublin City University · European Commission",
    role: "Software Developer Intern · Summer of 2026",
    mission:
      "EDMO operates under direct mandate from the European Commission as part of the European Democracy Action Plan. Bringing together fact-checkers, academics, and technology experts across all EU member states, it coordinates a network of independent researchers providing policy intelligence to the European Parliament and national governments on disinformation threats and information ecosystem integrity, serving as the backbone of the EU's digital literacy and media accountability infrastructure.",
    responsibilities: [
      "Full-stack web development, API integrations, and bespoke internal tooling built to EU institutional and accessibility standards",
      "Website content management, CMS workflows, and publication pipeline maintenance",
      "Social media content scheduling and performance analytics",
      "Backend process automation reducing manual overhead across the editorial team",
    ],
  },

  projects: [
    {
      id: "marketplace",
      number: "01",
      name: "Marketplace Intelligence System",
      tags: ["Computer Vision", "Python", "ROI Modeling", "Automation"],
      description:
        "Autonomous system that identifies resale opportunities across online marketplaces using computer vision and pricing intelligence. Incorporates ROI calculation, risk scoring, and human-in-the-loop decision gates. Has generated measurable financial returns.",
      impact: "~€500 donated to Merchants Quay Ireland",
      charityLogo: "/logos/mqi-logo.png",
      status: "Active",
    },
    {
      id: "ai-sandbox",
      number: "02",
      name: "Multi-Agent AI Sandbox",
      tags: ["Multi-Agent", "LLM", "Browser Automation", "Research"],
      description:
        "A controlled research environment running inside a fully sandboxed virtual machine. Autonomous agents interact with browser environments and simulated platforms to study emergent communication, coordination, and system-level behaviour dynamics. Designed as an experimental laboratory for AI interaction research.",
      status: "In Development",
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
    title: "Available for Work",
    subtitle: "",
    link: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tooltip: "Click to connect on LinkedIn",
  },
};
