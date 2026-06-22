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

  /* Header */
  header: {
    marginBottom: 10,
    paddingBottom: 7,
    borderBottomWidth: 1.5,
    borderBottomColor: c.black,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
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

  /* Section */
  section: {
    marginBottom: 11,
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
    marginBottom: 5,
  },

  /* Entry */
  entry: {
    marginBottom: 7,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  entryTitle: {
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
    marginTop: 1,
    marginBottom: 2,
  },

  /* Bullet list */
  list: {
    marginTop: 2,
    marginLeft: 10,
  },
  listItem: {
    fontSize: 9.5,
    marginBottom: 1.5,
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

  /* Prose */
  para: {
    fontSize: 9.5,
    color: "#222222",
    lineHeight: 1.5,
  },

  /* Certs two-col */
  certsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
  },
  certItem: {
    width: "50%",
    fontSize: 9.5,
    marginBottom: 2,
    paddingRight: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  certStatus: {
    fontSize: 8,
    color: c.light,
    marginLeft: 4,
  },

  /* Inline row (skills / interests) */
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
      keywords="cybersecurity, web development, internship, TUD"
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
          </View>
        </View>

        {/* ── Profile ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Profile</Text>
          <Text style={s.para}>
            Cybersecurity student at Technological University Dublin, currently interning at the European Digital Media Observatory. I build practical tools — a computer vision system that identifies marketplace resale opportunities and has generated real financial returns, a home lab running SIEM stacks and honeypot setups, and custom websites for paying clients. I am interested in how systems fail, how attackers think, and how to design things that stay secure. Background spans Python automation, web development, and hardware.
          </Text>
        </View>

        {/* ── Education ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Education</Text>

          <View style={s.entry}>
            <Text style={s.entryTitle}>BSc Cybersecurity &amp; Digital Forensics</Text>
            <Text style={s.entryNote}>Technological University Dublin</Text>
            <Text style={s.entryNote}>Modules: network security, digital forensics, ethical hacking, cryptography, security operations</Text>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>{"Harold's Cross Educate Together Secondary School"}</Text>
            <View style={s.list}>
              <Bullet text="Student Council Representative" />
              <Bullet text="Spirit of the Class Award" />
              <Bullet text="Stealth Award" />
              <Bullet text="Attendance Award" />
            </View>
          </View>
        </View>

        {/* ── Experience ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>

          <View style={s.entry}>
            <View style={s.entryRow}>
              <Text style={s.entryTitle}>Software Developer Intern — European Digital Media Observatory</Text>
              <Text style={s.entrySub}>Dublin City University · Summer 2026</Text>
            </View>
            <Text style={s.entryNote}>EDMO operates under European Commission mandate, coordinating anti-disinformation research across all EU member states.</Text>
            <View style={s.list}>
              <Bullet text="Built internal automation tooling and API integrations to EU institutional standards" />
              <Bullet text="Managed CMS workflows and the editorial publication pipeline" />
              <Bullet text="Developed social media scheduling tools and performance analytics scripts" />
              <Bullet text="Cut manual editorial overhead through backend process automation" />
            </View>
          </View>

          <View style={s.entry}>
            <View style={s.entryRow}>
              <Text style={s.entryTitle}>Freelance Web Developer</Text>
              <Text style={s.entrySub}>Independent</Text>
            </View>
            <View style={s.list}>
              <Bullet text="Designed and hand-coded custom websites for paying clients using Next.js and Tailwind CSS" />
              <Bullet text="Handled project scoping, design, development, and delivery end-to-end" />
            </View>
          </View>
        </View>

        {/* ── Projects ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Projects</Text>

          <View style={s.entry}>
            <Text style={s.entryTitle}>Marketplace Intelligence System</Text>
            <View style={s.list}>
              <Bullet text="Computer vision tool that scans online marketplaces for profitable resale opportunities" />
              <Bullet text="Automated ROI calculation, risk scoring, and human-in-the-loop decision gates" />
              <Bullet text="Generated measurable real financial returns — ~€500 donated to Merchants Quay Ireland" />
              <Bullet text="Stack: Python, computer vision libraries, custom pricing models" />
            </View>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>Multi-Agent AI Sandbox</Text>
            <View style={s.list}>
              <Bullet text="Isolated VM running autonomous LLM agents interacting with browser environments" />
              <Bullet text="Studies emergent agent communication and coordination without human supervision" />
            </View>
          </View>

          <View style={s.entry}>
            <Text style={s.entryTitle}>Home Lab Infrastructure</Text>
            <View style={s.list}>
              <Bullet text="Linux servers, VMs, and network simulation — mirrors production security environments" />
              <Bullet text="Running SIEM stack, honeypot infrastructure, and network segmentation experiments" />
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
              <Text>ISC2 Candidate Member</Text>
              <Text style={s.certStatus}>Active</Text>
            </View>
            <View style={s.certItem}>
              <Text>Microsoft AI Skills Fest 2026</Text>
              <Text style={s.certStatus}>Earned</Text>
            </View>
          </View>
        </View>

        {/* ── In Progress ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>In Progress</Text>
          <Text style={s.inlinePara}>
            Google Cybersecurity Certificate  ·  CompTIA Security+  ·  GRC Mastery Programme  ·  Hack The Box (Active)
          </Text>
        </View>

        {/* ── Technical Skills ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Technical Skills</Text>
          <Text style={s.inlinePara}>
            <Text style={s.bold}>Languages: </Text>
            <Text>Python, JavaScript/TypeScript, HTML/CSS{"\n"}</Text>
            <Text style={s.bold}>Security: </Text>
            <Text>OSINT, network security, digital forensics, SIEM, honeypots, home lab ops{"\n"}</Text>
            <Text style={s.bold}>Tools: </Text>
            <Text>Linux, Git, virtualization, browser automation, computer vision{"\n"}</Text>
            <Text style={s.bold}>Web: </Text>
            <Text>Next.js, React, Tailwind CSS, REST APIs</Text>
          </Text>
        </View>

        {/* ── Interests ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Interests</Text>
          <Text style={s.inlinePara}>
            Chess  ·  Dungeons &amp; Dragons  ·  Bouldering  ·  Reading (security, systems thinking, economics)
          </Text>
        </View>

      </Page>
    </Document>
  )
}
