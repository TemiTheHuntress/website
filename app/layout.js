import "./globals.css";

export const metadata = {
  title: "TemiNet",
  description:
    "A cynical cyberpunk personal site about tech experiments, scripts, and suspiciously named projects.",
};

export const viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
