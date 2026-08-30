import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer"

const c = {
  black: "#111111",
  mid: "#444444",
  light: "#888888",
  rule: "#aaaaaa",
  white: "#ffffff",
}

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: c.black,
    backgroundColor: c.white,
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 44,
    lineHeight: 1.45,
  },

  /* ── Header ── */
  header: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: c.black,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactItem: {
    fontSize: 8.5,
    color: c.mid,
    marginRight: 14,
  },
  contactLink: {
    fontSize: 8.5,
    color: c.mid,
    marginRight: 14,
    textDecoration: "none",
  },

  /* ── Section ── */
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: c.black,
    borderBottomWidth: 0.6,
    borderBottomColor: c.rule,
    paddingBottom: 2,
    marginBottom: 6,
  },

  /* ── Entry ── */
  entry: {
    marginBottom: 9,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 4,
  },
  entryTitleInRow: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    flex: 1,
  },
  entrySub: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9,
    color: c.mid,
    textAlign: "right",
  },
  entryNote: {
    fontSize: 9,
    color: c.mid,
    marginBottom: 3,
  },

  /* ── Bullet list ── */
  list: {
    marginTop: 0,
    marginLeft: 10,
  },
  listItem: {
    fontSize: 9.5,
    marginBottom: 2,
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    fontSize: 9.5,
    color: c.black,
  },
  listText: {
    flex: 1,
    fontSize: 9.5,
  },

  /* ── Prose ── */
  para: {
    fontSize: 9.5,
    color: "#222222",
    lineHeight: 1.55,
  },

  /* ── Certs two-col ── */
  certsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  certItem: {
    width: "50%",
    fontSize: 9.5,
    marginBottom: 3,
    paddingRight: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  certStatus: {
    fontSize: 8,
    color: c.light,
    marginLeft: 5,
  },

  /* ── Skills inline ── */
  inlinePara: {
    fontSize: 9.5,
    color: "#222222",
    lineHeight: 1.6,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
})

function Bullet({ text }: { text: string }) {
  return (
    <View style={s.listItem}>
      <Text style={s.bullet}>•</Text>
      <Text style={s.listText}>{text}</Text>
    </View>
  )
}

export function CVDocument() {
  return (
    <Document
      title="Euan Smith — CV"
      author="Euan Smith"
      subject="Curriculum Vitae"
      keywords="cybersecurity, digital forensics, Python, automation, counter-disinformation, OSINT, SIEM, TU Dublin"
    >
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.name}>Euan Smith</Text>
          <View style={s.contactRow}>
            <Text style={s.contactItem}>Dublin, Ireland</Text>
            <Link src="mailto:business.euan@hotmail.com" style={s.contactLink}>business.euan@hotmail.com</Link>
            <Link src="https://github.com/EuanSmith2" style={s.contactLink}>github.com/EuanSmith2</Link>
            <Link src="https://www.linkedin.com/in/euan-smith-4295123a6/" style={s.contactLink}>linkedin.com/in/euan-smith</Link>
            <Link src="https://orcid.org/0009-0002-3699-9357" style={s.contactLink}>orcid.org/0009-0002-3699-9357</Link>
          </View>
        </View>

        {/* ── Profile ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Profile</Text>
          <Text style={s.para}>
            {"Cybersecurity and Digital Forensics student at Technological University Dublin, with practical experience building automation systems, security infrastructure, and web applications. I work as a researcher and freelance contributor for the European Digital Media Observatory — part of the EU anti-disinformation network — building a fact-check publishing pipeline and running original counter-disinformation research. Outside of that, I built a Python computer vision system that autonomously identifies resale opportunities across online marketplaces; it has generated real financial returns, with proceeds donated to Merchants Quay Ireland. I run a home lab with SIEM infrastructure, honeypots, and network segmentation — the kind of hands-on environment where you learn how systems actually break. I approach security from first principles: attacker mindset, failure modes, and building things that hold up under pressure."}
          </Text>
        </View>

        {/* ── Education ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Education</Text>

          <View style={s.entry}>
            <Text style={s.entryTitle}>BSc Cybersecurity &amp; Digital Forensics</Text>
            <Text style={s.entryNote}>Technological University Dublin · Starting September 2026</Text>
            <Text style={s.entryNote}>Modules: network security, digital forensics, ethical hacking, cryptography, security operations</Text>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>{"Harold's Cross Educate Together Secondary School"}</Text>
            <View style={s.list}>
              <Bullet text={"Student Council Representative · Spirit of the Class Award · Stealth Award · Attendance Award"} />
            </View>
          </View>
        </View>

        {/* ── Experience ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>

          <View style={s.entry}>
            <View style={s.entryRow}>
              <Text style={s.entryTitleInRow}>Researcher & Freelance Contributor — European Digital Media Observatory</Text>
              <Text style={s.entrySub}>Dublin City University · 2025–2026</Text>
            </View>
            <Text style={s.entryNote}>EDMO operates under European Commission mandate, coordinating anti-disinformation research across all EU member states.</Text>
            <View style={s.list}>
              <Bullet text="Built a weekly fact-check round-up pipeline in Python: scrapes TheJournal.ie fact-checks, formats them to EDMO's house style, and posts drafts to edmohub.ie via the WordPress REST API" />
              <Bullet text="Ran a controlled two-account social media experiment documenting algorithmic radicalisation; presented findings to ~60 students" />
              <Bullet text="Research shared by EDMO Ireland with DCU academics, under consideration for an MA journalism module" />
              <Bullet text="Selected as one of four representing Ireland in the EU-funded ChangingTIDE Changemakers counter-disinformation programme (TEPSA, Brussels)" />
            </View>
          </View>

          <View style={s.entry}>
            <View style={s.entryRow}>
              <Text style={s.entryTitleInRow}>Freelance Web Developer</Text>
              <Text style={s.entrySub}>Independent</Text>
            </View>
            <View style={s.list}>
              <Bullet text="Designed and hand-coded custom websites for paying clients using Next.js and Tailwind CSS" />
              <Bullet text="Managed project scoping, design, development, and delivery end-to-end" />
            </View>
          </View>
        </View>

        {/* ── Projects ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Projects</Text>

          <View style={s.entry}>
            <Text style={s.entryTitle}>Marketplace Intelligence System</Text>
            <View style={s.list}>
              <Bullet text="Python and computer vision tool that autonomously identifies profitable resale opportunities online" />
              <Bullet text="Includes ROI calculation, risk scoring, and human-in-the-loop decision gates" />
              <Bullet text="Has generated real financial returns — proceeds donated to Merchants Quay Ireland" />
            </View>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>NZT-48</Text>
            <View style={s.list}>
              <Bullet text="Self-hosted personal AI system built on Claude Code — Telegram interface, Obsidian-backed memory, background agents and monitors" />
              <Bullet text="Runs at zero marginal cost with no cloud dependency; most-starred of my repositories" />
            </View>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>RadicalMap</Text>
            <View style={s.list}>
              <Bullet text="Python OSINT instrument that detects and maps extremist content networks on short-form video platforms from public metadata" />
              <Bullet text="Grounded in DSA Article 40 researcher-access and GDPR Article 89 research-exemption provisions" />
            </View>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>Home Lab Infrastructure</Text>
            <View style={s.list}>
              <Bullet text="Linux servers, VMs, and network simulation replicating production security environments" />
              <Bullet text="Active SIEM stack, honeypot infrastructure, and network segmentation experiments" />
            </View>
          </View>
        </View>

        {/* ── Certifications ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Certifications</Text>
          <View style={s.certsGrid}>
            <View style={s.certItem}>
              <Text>SAP: Security and Compliance Learning Journey</Text>
              <Text style={s.certStatus}>Earned</Text>
            </View>
            <View style={s.certItem}>
              <Text>SAP: Business Integrity Screening Fundamentals</Text>
              <Text style={s.certStatus}>Earned</Text>
            </View>
            <View style={s.certItem}>
              <Text>SAP: System Security Foundations</Text>
              <Text style={s.certStatus}>Earned</Text>
            </View>
            <View style={s.certItem}>
              <Text>Google Cybersecurity Certificate</Text>
              <Text style={s.certStatus}>In Progress</Text>
            </View>
            <View style={s.certItem}>
              <Text>CompTIA Security+</Text>
              <Text style={s.certStatus}>In Progress</Text>
            </View>
          </View>
        </View>

        {/* ── Technical Skills ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Technical Skills</Text>
          <Text style={s.inlinePara}>
            <Text style={s.bold}>Languages: </Text>
            <Text>Python, JavaScript/TypeScript, HTML/CSS{"\n"}</Text>
            <Text style={s.bold}>Security: </Text>
            <Text>OSINT, network security, digital forensics, SIEM, honeypots, Linux administration{"\n"}</Text>
            <Text style={s.bold}>Tools: </Text>
            <Text>Git, virtualisation, browser automation, computer vision{"\n"}</Text>
            <Text style={s.bold}>Web: </Text>
            <Text>Next.js, React, Tailwind CSS, REST APIs</Text>
          </Text>
        </View>

      </Page>
    </Document>
  )
}
