// GA4 measurement ID. Not a secret — it is visible in the page source of any
// site running Google Analytics. Override with NEXT_PUBLIC_GA_ID if it ever
// needs to change without a code edit; set it to "" to disable GA entirely.
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID === undefined ? "G-M3FJLXV8TT" : process.env.NEXT_PUBLIC_GA_ID
