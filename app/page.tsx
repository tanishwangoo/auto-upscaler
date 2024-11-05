'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, Zap, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthInfo, useRedirectFunctions } from "@propelauth/react";
import ReactPlayer from 'react-player/lazy'; // Optimized import for ReactPlayer

export default function LandingPage(): JSX.Element {
  const { redirectToLoginPage } = useRedirectFunctions();
  const router = useRouter();
  const user = useAuthInfo();

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md">
        <Link href="#" className="flex items-center text-2xl font-bold text-blue-600 dark:text-white">
          Image Upscaler
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
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl xl:text-6xl mb-6">
              Transform Your Images with AI
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-10">
              Enhance your photos with cutting-edge AI upscaling models. Turn low-res images into high-quality masterpieces in seconds.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleLoginRedirect}
                className="px-8 py-3 rounded-lg bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32 bg-white dark:bg-gray-900" id="features">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
                title="Lightning Fast"
                description="Upscale your images in seconds, not minutes."
              />
              <FeatureCard
                icon={<ImageIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
                title="Superior Quality"
                description="Our AI delivers crisp, clear results every time."
              />
              <FeatureCard
                icon={<Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
                title="Secure & Private"
                description="Your data is encrypted and secure with us."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-gray-100 dark:bg-gray-800" id="how-it-works">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-12">
              How It Works
            </h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <StepCard step="1" title="Upload" description="Simply drag and drop your image or click to upload." />
              <StepCard step="2" title="Process" description="Our AI works its magic to enhance your image." />
              <StepCard step="3" title="Download" description="Get your high-resolution image instantly." />
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="w-full py-20 md:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-8">
              See It In Action
            </h2>
          <ReactPlayer
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
      </main>
     

      {/* Footer */}
      <footer className="py-8 w-full bg-gray-800 text-white text-center">
        <p className="text-sm">
          © 2024 ImageUpscaler. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  icon: JSX.Element;
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
      <div className="bg-blue-600 dark:bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
        {step}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
