'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, Zap, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthInfo, useRedirectFunctions } from "@propelauth/react";
import ReactPlayer from 'react-player/lazy';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import { useState } from "react";

export default function LandingPage(): JSX.Element {
  const { redirectToLoginPage } = useRedirectFunctions();
  const router = useRouter();
  const user = useAuthInfo();
  const [labelOpacity, setLabelOpacity] = useState(1);

  const labelStyle = {
    fontSize: '.75rem',
    position: 'absolute' as const,
    padding: '.25rem',
    color: 'white',
    opacity: labelOpacity,
    borderRadius: '.25rem',
    border: '1px solid white',
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.25s ease-in-out',
  };

  const handleLoginRedirect = (): void => {
    if (!user.isLoggedIn) {
      redirectToLoginPage({
        postLoginRedirectUrl: '/dashboard',
      });
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* Bubble Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bubble w-[500px] h-[500px] bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300"></div>
        <div className="bubble w-[400px] h-[400px] bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300"></div>
        <div className="bubble w-[600px] h-[600px] bg-gradient-to-br from-pink-200 via-purple-300 to-blue-200"></div>
        <div className="bubble w-[300px] h-[300px] bg-gradient-to-br from-purple-200 via-blue-300 to-pink-200"></div>
        <div className="bubble w-[550px] h-[550px] bg-gradient-to-br from-pink-300 via-blue-300 to-purple-300"></div>
      </div>
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md">
        <Link href="#" className="flex items-center text-2xl font-bold text-gradient-to-r from-blue-600 to-purple-600 dark:text-gradient-to-r dark:from-blue-400 dark:to-purple-400">
          <span className="mr-2">🚀</span> Image Upscaler
        </Link>
        <nav className="flex gap-8">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300">
            How It Works
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 text-black">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h1 className="text-5xl font-extrabold sm:text-6xl mb-6 leading-tight">
              Enhance your images with AI Magic ✨
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-10">
              Transform low-resolution images into high-quality masterpieces in seconds. Experience the next level of AI-powered photo enhancement.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleLoginRedirect}
                className="px-8 py-3 rounded-lg bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section className="container mx-auto flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-12 text-gray-800 dark:text-white">{"Don't settle for Low-Res🚫"}</h1>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full max-w-4xl aspect-[16/9]">
            <ReactCompareSlider
              onPointerDown={() => setLabelOpacity(0)}
              onPointerUp={() => setLabelOpacity(1)}
              className="h-full"
              itemOne={
                <ReactCompareSliderImage
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=0"
                  alt="Input Image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    objectPosition: '50% 50%',
                  }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1600&q=100"
                  alt="Output Upscaled Image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    objectPosition: '50% 50%',
                  }}
                />
              }
              handle={<ReactCompareSliderHandle />}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32 dark:bg-gray-900 bg-gray-50" id="features">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-12 text-gray-800 dark:text-white">Key Features 🌟</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <FeatureCard
                icon="⚡"
                title="Lightning Fast"
                description="Upscale your images in seconds, not minutes."
              />
              <FeatureCard
                icon="🖼️"
                title="Superior Quality"
                description="Our AI delivers crisp, clear results every time."
              />
              <FeatureCard
                icon="🛡️"
                title="Secure & Private"
                description="Your data is encrypted and secure with us."
              />
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 dark:bg-gray-800" id="how-it-works">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-12 text-gray-800 dark:text-white">How It Works 🛠️</h2>
            <div className="flex justify-center items-center gap-4 md:gap-8">

              <StepCard step="📤" title="Upload" description="Simply drag and drop your image or click to upload." />

              {/* Arrow Connector */}
              <div className="hidden md:flex items-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <StepCard step="🧪" title="Process" description="Our AI works its magic to enhance your image." />

              {/* Arrow Connector */}
              <div className="hidden md:flex items-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <StepCard step="📥" title="Download" description="Get your high-resolution image instantly." />

            </div>
          </div>
        </section>



        {/* Demo Video Section */}
        <section className="w-full py-20 md:py-32 dark:bg-gray-900">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-8 text-gray-800 dark:text-white">See It In Action 🎬</h2>
            <ReactPlayer
              muted={true}
              playing={true}
              url="/AppDemo.mp4"
              loop={true}

              controls
              className="mx-auto max-w-full"
              width="100%"
              height="500px"
            />
          </div>
        </section>
      </main >
      {/* Footer */}
      < footer className="py-8 w-full bg-transparent text-black text-center" >
        <p className="text-sm">
          © 2024 ImageUpscaler. All rights reserved.
        </p>
      </footer >
    </div >
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

function StepCard({ step, title, description }: StepCardProps): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="text-3xl">
        {step}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
