"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Image as ImageIcon, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { RedirectToLogin } from "@propelauth/react"
import { useAuthInfo } from "@propelauth/react"
import {useRedirectFunctions} from "@propelauth/react"


export default function LandingPage() {
    const {
    redirectToLoginPage, 
} = useRedirectFunctions()

    const router = useRouter();
    const user = useAuthInfo();
    const handleLoginRedirect = ()=>{
        if (!user.isLoggedIn){
            redirectToLoginPage({postLoginRedirectUrl :
                '/dashboard'
             })
        }
        else {
            router.push('/dashboard');
        }
    }
    return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold">Image Upscaler</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="Upscaled image comparison"
                height="100"
                src= "upscale.png"
                width="100"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Images with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Enhance your photos with our cutting-edge AI upscaling technology. Turn low-res images into
                    high-quality masterpieces in seconds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button onClick={handleLoginRedirect}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="features">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-8 w-8 mb-2 text-primary" />
                <h3 className="text-xl font-bold text-center">Lightning Fast</h3>
                <p className="text-muted-foreground text-center">Upscale your images in seconds, not minutes.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <ImageIcon className="h-8 w-8 mb-2 text-primary" />
                <h3 className="text-xl font-bold text-center">Superior Quality</h3>
                <p className="text-muted-foreground text-center">
                  Our AI delivers crisp, clear results every time.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="how-it-works">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-center">Upload</h3>
                <p className="text-muted-foreground text-center">
                  Simply drag and drop your image or click to upload.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-center">Process</h3>
                <p className="text-muted-foreground text-center">Our AI works its magic to enhance your image.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-center">Download</h3>
                <p className="text-muted-foreground text-center">Get your high-resolution image instantly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 ImageUpscaler. All rights reserved.
        </p>
      </footer>
    </div>
  )
}