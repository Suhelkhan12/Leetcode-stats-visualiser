import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import Link from "next/link";

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
      <body className=" bg-primary-foreground dark:bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSwitcher />
          <main>
            <div className="container mx-auto">{children}</div>
          </main>
          <footer className="mt-16 text-center text-sm opacity-70 dark:text-white container mx-auto">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
