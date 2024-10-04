"use client"

import { store, persistor } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
      <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
              {children}
          </PersistGate>
        </Provider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
