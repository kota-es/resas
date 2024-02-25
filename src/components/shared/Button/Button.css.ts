import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/variables.css";

export const button = style({
  borderRadius: 4,
  padding: "8px 16px",
  color: vars.color.light,
  fontSize: 16,
  backgroundColor: vars.color.secondary,
  border: "none",
  animation: "buttonMove 0.4s ease infinite",
  cursor: "pointer",
});
