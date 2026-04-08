import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne" });
const dm = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm" });

export const metadata = {
  title: "MAKAUT Helper — Your AI Exam Assistant",
  description: "PYQ Solver, Notes Generator, Important Questions Predictor & CGPA Calculator for MAKAUT students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dm.variable}`}>
      <body style={{ margin: 0, background: "#080808", color: "#f0f0f0", fontFamily: "var(--font-dm), sans-serif", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
