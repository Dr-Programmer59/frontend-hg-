"use client";

import "./globals.css";
import { Navbar, Footer } from "@/components";
import { useEffect, useState } from "react";
import StoreProvider from "@/components/StoreProvider"
import UserProvider from "@/components/UserProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessageProvider from "@/components/MessageProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isLiveStreamingScreen, setIsLiveStreamingScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDashboard(window.location.href.includes("/dashboard"));
      setIsLiveStreamingScreen(
        window.location.href.includes("/live-streaming")
      );
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-background text-xl font-rubik font-semibold tracking-tight flex flex-col overflow-x-hidden">
        <StoreProvider>
          <UserProvider>
            <MessageProvider>
              <ReactQueryProvider>

              {!isDashboard && !isLiveStreamingScreen && <Navbar />}

              {children}

              {!isDashboard && !isLiveStreamingScreen && <Footer />}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              </ReactQueryProvider>
            </MessageProvider>
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
