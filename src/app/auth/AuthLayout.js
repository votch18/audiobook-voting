import { useCheckAuth } from "@/hooks/useCheckAuth";
import Head from "next/head";

export default function AuthLayout({ children, title }) {
  useCheckAuth();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </Head>
      <div className="bg-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {children}
      </div>
    </>
  );
}
