import { TypographyOptions } from "@material-ui/core/styles/createTypography";

export const typography: TypographyOptions = {
  h1: { // graphik based header, refactor later
    fontFamily: "Graphik",
    fontWeight: 600,
    fontSize: "3rem", // 42px
    letterSpacing: "-0.0025rem", // -0.02px
  },
  h3: { // graphik based header, refactor later
    fontFamily: "Graphik, sans-serif",
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
  },
  h5: { // graphik based header, refactor later
    fontFamily: "Graphik",
    fontWeight: 600,
    fontSize: "1.5rem",
    letterSpacing: "0.005rem", // 0.08px
    lineHeight: "2rem",
  },
  subtitle1: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: "1rem",
    lineHeight: "1.375rem",
    letterSpacing: "0.01071em",
  },
  body1: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: "0.875rem",
    letterSpacing: "0.01667em",
    lineHeight: "1.125rem",
  },
  body2: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "0.75rem",
    letterSpacing: "0.01667em",
    lineHeight: 1.267,
  },
  button: {
    fontFamily: "Roboto",
    fontSize: "1rem",
    fontWeight: "bold",
    letterSpacing: "0.018em",
    lineHeight: 1.142,
    textTransform: "none",
  },
};
