import { vars } from "@/styles/variables.css";
import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#fff",
});

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 300,
  width: 400,
  padding: 20,
  gap: 28,
});

export const heading = style({
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
});

export const form = style({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#f4f5f8",
  height: "100%",
  width: "100%",
  gap: 20,
  padding: 20,
});

export const input = style({
  padding: "8px 16px",
  boxSizing: "border-box",
  fontSize: 16,
  borderRadius: 4,
  border: "1px solid #ccc",
  width: "100%",
});

export const description = style({
  textAlign: "center",
  color: vars.color.medium,
  fontSize: 16,
  width: "100%",
  alignItems: "center",
});
