// Theme configuration with light and dark themes
export type Theme = {
  name: string
  label: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  borderRadius: {
    lg: string
    md: string
    sm: string
  }
}

export const themes: Theme[] = [
  {
    name: "light",
    label: "Light",
    colors: {
      background: "0 0% 100%", // Pure white
      foreground: "0 0% 0%", // Pure black
      card: "0 0% 100%", // Pure white
      cardForeground: "0 0% 0%", // Pure black
      popover: "0 0% 100%", // Pure white
      popoverForeground: "0 0% 0%", // Pure black
      primary: "0 0% 0%", // Pure black
      primaryForeground: "0 0% 100%", // Pure white
      secondary: "0 0% 100%", // Pure white
      secondaryForeground: "0 0% 0%", // Pure black
      muted: "0 0% 100%", // Pure white
      mutedForeground: "0 0% 0%", // Pure black
      accent: "0 0% 100%", // Pure white
      accentForeground: "0 0% 0%", // Pure black
      destructive: "0 100% 50%", // Pure red
      destructiveForeground: "0 0% 100%", // Pure white
      border: "0 0% 95%", // Very light gray, almost white
      input: "0 0% 100%", // Pure white
      ring: "0 0% 0%", // Pure black
    },
    borderRadius: {
      lg: "0.5rem",
      md: "calc(0.5rem - 2px)",
      sm: "calc(0.5rem - 4px)",
    },
  },
  {
    name: "dark",
    label: "Dark",
    colors: {
      background: "0 0% 5%", // Near black
      foreground: "0 0% 95%", // Near white
      card: "0 0% 5%", // Near black
      cardForeground: "0 0% 95%", // Near white
      popover: "0 0% 5%", // Near black
      popoverForeground: "0 0% 95%", // Near white
      primary: "0 0% 95%", // Near white
      primaryForeground: "0 0% 5%", // Near black
      secondary: "0 0% 5%", // Near black
      secondaryForeground: "0 0% 95%", // Near white
      muted: "0 0% 5%", // Near black
      mutedForeground: "0 0% 95%", // Near white
      accent: "0 0% 5%", // Near black
      accentForeground: "0 0% 95%", // Near white
      destructive: "0 100% 50%", // Pure red
      destructiveForeground: "0 0% 100%", // Pure white
      border: "0 0% 20%", // Dark gray
      input: "0 0% 5%", // Near black
      ring: "0 0% 95%", // Near white
    },
    borderRadius: {
      lg: "0.5rem",
      md: "calc(0.5rem - 2px)",
      sm: "calc(0.5rem - 4px)",
    },
  },
]

export function getTheme(name: string): Theme {
  return themes.find((theme) => theme.name === name) || themes[0]
}
