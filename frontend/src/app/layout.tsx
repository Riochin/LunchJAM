import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LunchJAM",
  description: "Lunch Just A Minute",
};

const layoutStyle = {
  minHeight: "100vh",
  paddingTop: "64px", // ヘッダーの高さ
  paddingBottom: "50px", // フッターの高さ + 余分な余白
  display: "flex",
  flexDirection: "column" as "column",
};

const headerStyle = {
  position: "fixed" as "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "64px",
  backgroundColor: "white",
  zIndex: 50,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const mainStyle = {
  color: "#333",
  backgroundColor: "#f9f9f9",
  flex: 1,
};

const footerStyle = {
  position: "fixed" as "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "30px",
  backgroundColor: "white",
  zIndex: 50,
  boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={layoutStyle}>
          <header style={headerStyle}>
            <Header />
          </header>
          <main style={mainStyle}>{children}</main>
          <footer style={footerStyle}>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
