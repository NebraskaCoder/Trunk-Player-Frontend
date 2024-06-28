import { NextAuthProvider } from "./providers";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <Header />
      <main className="p-7">{children}</main>
      <Footer />
    </NextAuthProvider>
  );
}
