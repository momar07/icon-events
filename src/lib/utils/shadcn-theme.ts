// Cyberpunk theme tokens for components that need programmatic access
export const theme = {
  colors: {
    neonPink: "#FF006E",
    neonPinkLight: "#FF3D8F",
    neonPinkDark: "#CC0058",
    electricCyan: "#00D9FF",
    electricCyanLight: "#33E1FF",
    electricCyanDark: "#00ADCC",
    bgPrimary: "#0A0E27",
    bgSecondary: "#1A1F3A",
    bgTertiary: "#252B4A",
    bgElevated: "#2A305A",
    textPrimary: "#F5F7FA",
    textSecondary: "#A0AEC0",
    textMuted: "#6B7280",
    error: "#FF4D6D",
    success: "#2EF2B1",
    warning: "#FFC857",
  },
  shadows: {
    neonPink: "0 0 20px rgba(255, 0, 110, 0.5)",
    neonCyan: "0 0 20px rgba(0, 217, 255, 0.5)",
    neonPinkStrong: "0 0 40px rgba(255, 0, 110, 0.7)",
    neonCyanStrong: "0 0 40px rgba(0, 217, 255, 0.7)",
  },
} as const;
