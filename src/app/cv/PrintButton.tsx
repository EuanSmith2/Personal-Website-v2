"use client"

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        display: "inline-block",
        padding: "8px 20px",
        background: "#111",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "13px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Download / Print CV
    </button>
  )
}
