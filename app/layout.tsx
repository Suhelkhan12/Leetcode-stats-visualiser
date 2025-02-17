import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Link from "next/link";
import Navbar from "@/components/landingpage/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "LeetInsight",
  description: "Offers insights into LeetCode stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-primary-foreground dark:bg-background px-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className=" pt-24 sm:px-0 px-5">
            <div className="container mx-auto">{children}</div>
          </main>
          <footer className="mt-16 sm:p-0 px-5 text-center text-sm opacity-70 dark:text-white container mx-auto pb-4">
            <p>
              &copy; {new Date().getFullYear()} LeetCode Stats Visualizer. Made
              with love by{" "}
              <Link
                href={"https://www.linkedin.com/in/suhell-khan/"}
                target="_blank"
                className="text-primary font-medium"
              >
                Suhel
              </Link>
            </p>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
