interface CertBadgeProps {
  issuer: string
  name: string
  status: string
  issuerColor: string
  credlyUrl?: string
}

function CertBadgeInner({ issuer, name, status, issuerColor }: Omit<CertBadgeProps, "credlyUrl">) {
  return (
    <div
      className="rounded-xl border border-[color:var(--border)] p-4 lg:p-6 flex items-start gap-4 transition-all duration-200 hover:border-[color:var(--border-glow)] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] h-full"
      style={{ background: "var(--bg-card)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
        style={{
          background: `linear-gradient(135deg, ${issuerColor}cc, ${issuerColor}66)`,
          border: `1px solid ${issuerColor}40`,
        }}
      >
        {issuer.charAt(0)}
      </div>
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
