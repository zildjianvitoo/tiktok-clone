import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-x-hidden xl:hover:overflow-y-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh]">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
