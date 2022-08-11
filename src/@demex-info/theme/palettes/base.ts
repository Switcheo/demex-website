export const baseColors = {
	white: "#FFFFFF", // branding/snow
  blue: {
    50: "#00B2FF",
    100: "#007AFF",
    200: "#482BFF",
  },
  green: {
    50: "#00AF92",
    100: "#00A862",
  },
  red: {
    50: "#FF5107",
    100: "#E84747",
  },
  yellow: {
    100: "#FFA800",
    200: "#FF5107",
  },
  chains: {
    carbon: "#53C2C1",
    neo: "#00E599",
    zilliqa: "#29CCC4",
    ethereum: "#7F7CFF",
    polygon: "#AB85EC",
    bsc: "#FFB900",
    osmosis: "#332DC2",
		terra: "#5493F7",
		cosmos: "#5064FB",
		juno: "#F0827D",
  },
};

export const darkColors = {
  ...baseColors,
  mono: {
    text: {
      primary: "#F5F5F7",
      secondary: "#A4A5A8",
      tertiary: "#6F7073", // disabled text
      disabledBackground: "#444546",
      contrast: "#1F1D1A",
    },
    background: {
      base: "#111213",
      primary: "#1A1D1F",
      secondary: "#272A2E",
      tertiary: "rgba(255, 255, 255, 0.06)",
      divider: "rgba(255, 255, 255, 0.08)",
      active: "rgba(255, 255, 255, 0.04)", // hover + selected
    },
    shadow: "rgba(0, 0, 0, 0.64)",
  },
};

export const lightColors = {
  ...baseColors,
  mono: {
    text: {
      primary: "#1F1D1A",
      secondary: "#676561",
      tertiary: "#B1ACA4", // disabled text
      disabledBackground: "#DBD9D5",
      contrast: "#F5F5F7",
    },
    background: {
      base: "#FAF9F8",
      primary: "#FFFFFF",
      secondary: "#FBFAF9",
      tertiary: "rgba(31, 29, 26, 0.03)",
      divider: "rgba(31, 29, 26, 0.08)",
      active: "rgba(31, 29, 26, 0.02)", // hover + selected
    },
    shadow: "rgba(31, 29, 26, 0.1)",
  },
};