"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/ui/userdetailscard";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageWithButton from "@/components/ui/imagewithbuttons";
import { useAuthInfo, useLogoutFunction } from "@propelauth/react";
import { FiLogOut, FiUpload } from "react-icons/fi";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const userInfo = useAuthInfo();
  const logout = useLogoutFunction();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const handleSignOut = async () => {
    await logout(true);
  };

  const handleRedirect = () => {
    router.push("/create-task");
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetch-images", {
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
      console.log(user_data);
      setImages(user_data);
      setCount(user_data.length);
    } catch (e) {
      console.error(`Error fetching Images from MDB, ${e}`);
    }
  };

  const handleRemoveImg = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setCount((prevCount) => prevCount - 1);
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
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
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
                onClick={handleSignOut}
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
            Welcome back, {userInfo.user?.email}!
          </h1>
          <Button onClick={handleRedirect} className="flex items-center">
            <FiUpload className="mr-2" />
            Upscale New Image
          </Button>
        </div>

        {/* Your Images Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Images
          </h2>
          {images.length > 0 ? (
            <div className="relative flex flex-col gap-5">
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
                    onRemove={() => handleRemoveImg(index)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have no images yet.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Auto Image Upscaler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
