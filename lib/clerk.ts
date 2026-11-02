/**
 * Clerk sign-in is switched on only when its keys are configured (Vercel env vars
 * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY). Without them the site
 * builds and runs with the preview sign-up/log-in page.
 */
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/** Harbor styling for Clerk's sign-in, sign-up and user menu components. */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#0e7f86",
    colorForeground: "#1c232d",
    colorMutedForeground: "#5b6573",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    borderRadius: "0px",
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
} as const;
