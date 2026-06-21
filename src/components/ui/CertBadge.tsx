// Brand logo SVGs for each issuer
const MicrosoftLogo = () => (
  <svg width="22" height="22" viewBox="0 0 21 21" aria-label="Microsoft" role="img">
    <rect x="1"  y="1"  width="9" height="9" fill="#F25022" />
    <rect x="11" y="1"  width="9" height="9" fill="#7FBA00" />
    <rect x="1"  y="11" width="9" height="9" fill="#00A4EF" />
    <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
  </svg>
)

const ISC2Logo = () => (
  <svg width="56" height="22" viewBox="0 0 90 30" aria-label="(ISC)²" role="img">
    <text x="1" y="24" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fontSize="22" fill="#FFFFFF" letterSpacing="-0.5">(ISC)</text>
    <text x="71" y="16" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fontSize="13" fill="#FFFFFF">2</text>
  </svg>
)

const GenericLogo = ({ initial }: { initial: string }) => (
  <span className="text-white font-bold text-base">{initial}</span>
)

function IssuerLogo({ issuer }: { issuer: string }) {
  const lower = issuer.toLowerCase()
  if (lower === "microsoft") return <MicrosoftLogo />
  if (lower === "isc2")      return <ISC2Logo />
  return <GenericLogo initial={issuer.charAt(0)} />
}

interface CertBadgeProps {
  issuer: string
  name: string
  status: string
  issuerColor: string
  credlyUrl?: string
}

function CertBadgeInner({ issuer, name, status, issuerColor }: Omit<CertBadgeProps, "credlyUrl">) {
  const isSAP = issuer.toLowerCase() === "sap"
  return (
    <div
      className="rounded-xl border border-[color:var(--border)] p-4 lg:p-5 flex items-start gap-4 transition-all duration-200 hover:border-[color:var(--border-glow)] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] h-full"
      style={{ background: "var(--bg-card)" }}
    >
      {isSAP ? (
        <div className="w-16 h-12 rounded-md flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/sap-logo.svg" alt="SAP" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${issuerColor}cc, ${issuerColor}55)`,
            border: `1px solid ${issuerColor}40`,
          }}
        >
          <IssuerLogo issuer={issuer} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">{issuer}</p>
        <p className="text-sm font-medium text-zinc-100 mb-2 leading-snug">{name}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          status === "Earned"
            ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"
            : "bg-purple-400/10 border-purple-400/30 text-purple-400"
        }`}>
          {status}
        </span>
      </div>
    </div>
  )
}

export function CertBadge({ credlyUrl, ...props }: CertBadgeProps) {
  if (credlyUrl) {
    return (
      <a href={credlyUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CertBadgeInner {...props} />
      </a>
    )
  }
  return <CertBadgeInner {...props} />
}
