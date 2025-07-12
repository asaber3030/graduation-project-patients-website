import "./globals.css"

import { InterFont } from "@/lib/fonts"

import { Metadata } from "next"
import { AppNavbar } from "@/components/app/header"
import { AppFooter } from "@/components/app/footer"
import { AuthProvider, ReactQueryClientProvider } from "@/providers"
import { ToastContainer } from "react-toastify"
import { getCurrentPatient } from "@/actions/auth"

export const metadata: Metadata = {
  title: "Techmed Patients",
  description: "Techmed Patients"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const patient = await getCurrentPatient()

  return (
    <html lang='en' dir='ltr'>
      <body className={InterFont.className}>
        <ReactQueryClientProvider>
          <AuthProvider value={patient}>
            <AppNavbar />
            <div className='min-h-[1000px]'>{children}</div>
            <AppFooter />
            <ToastContainer />
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
