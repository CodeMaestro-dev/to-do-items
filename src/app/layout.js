import { Inter } from "next/font/google";
import "./globals.css";
import Navabar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To do List App",
  description: "Save what you have to do without stress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-[16px] min-[3000px]:text-2xl`}>
        <Navabar />
        <section className="pt-[56px] grid grid-cols-12">
          <Sidebar />
          <main className="col-start-1 col-end-13 lg:col-start-3 lg:col-end-12 px-10 lg:px-0 py-12 text-tertiary">
            <StoreProvider>{children}</StoreProvider>
          </main>
        </section>
      </body>
    </html>
  );
}
