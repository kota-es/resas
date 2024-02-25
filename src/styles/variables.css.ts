import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#3880ff",
    priaryContrast: "#000000",
    secondary: "#3dc2ff",
    secondaryContrast: "#000000",
    success: "#2dd36f",
    successContrast: "#000000",
    warning: "#ffc409",
    warningContrast: "#000000",
    danger: "#eb445a",
    dangerContrast: "#000000",
    light: "#f4f5f8",
    lightContrast: "#000000",
    medium: "#92949c",
    mediumContrast: "#000000;",
    dark: "#222428",
    darkContrast: "#ffffff",
  },
});
