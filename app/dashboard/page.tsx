"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageWithButton from "@/components/ui/imagewithbuttons";
import { FiLogOut, FiUpload } from "react-icons/fi";
import { useAuthInfo } from "@propelauth/react";
import { useLogoutFunction } from "@propelauth/react";

export default function Home() {
  const userInfo = useAuthInfo();
  const logout = useLogoutFunction();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const handlelogout = async () => {
    await logout(true);
  }
  const handleRedirect = () => {
    router.push("/create-task");
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("https://upscaleimage-backend.work/fetch-images", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        console.error(`${response.status} : ${response}`);
      }
      const user_data: string[] = await response.json();
      setImages(user_data);
    } catch (e) {
      console.error(`Error fetching Images from MDB, ${e}`);
    }
  };

  const handleRemoveImg = (imageUrl: string) => {
    setImages((prevImages) => {
      return prevImages.filter((i) => i !== imageUrl);
    });
  };


  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <div>
                <a href="#" className="flex items-center py-5 px-2 text-gray-700">
                  <Image src="/upscale.png" alt="Logo" width={32} height={32} />
                  <span className="font-bold text-xl ml-2">
                    Auto Image Upscaler
                  </span>
                </a>
              </div>
            </div>
            {/* Secondary Nav */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={handlelogout}
              >

                <FiLogOut className="mr-2" />
                Logout
              </Button>

            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col mx-auto max-w-6xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {userInfo.user?.email}!
          </h1>
          <Button onClick={handleRedirect} className="flex items-center">
            <FiUpload className="mr-2" />
            Upscale New Image
          </Button>
        </div>
      </div>
        {/* Your Images Section */}
        <div className="mb-6 flex flex-col items-center ">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Images
          </h2>
          {images.length > 0 ? (
            <div className="flex flex-col gap-2">
              {images.map((imageUrl, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-lg shadow overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ImageWithButton
                    imageUrl={imageUrl}
                    index={index}
                    onRemove={() => handleRemoveImg(imageUrl)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have no images yet.</p>
          )}
        </div>
      

      {/* Footer */}
      <footer className="bg-white text-xs bottom-0 w-full">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Auto Image Upscaler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
