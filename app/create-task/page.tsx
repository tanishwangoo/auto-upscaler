"use client"
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/ui/userdetailscard";
import AlertComponent from "../alertcomp";
import { FiLogOut, FiUpload } from "react-icons/fi";
import Image from "next/image";
import ErrorCMP from "./error";
import { useAuthInfo, useLogoutFunction } from "@propelauth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function CreateTask() {

  const userInfo = useAuthInfo();
  const logout = useLogoutFunction();
  const router = useRouter(); // Initialize the useRouter hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // referenec for Image input field
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertOn, setAlertOn] = useState(false);
  const [hasBackendError, setHasBackendError] = useState(false); // New state to track errors

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  const handleinputchange = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current?.files?.[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (file && !validTypes.includes(file.type)) {
        setAlertOn(true);
        setErrorMessage("Please select an IMAGE file to upload.");
        setTimeout(() => {
          setAlertOn(false); // Hide the alert
        }, 2000);
        fileInputRef.current.value = "";
      }
    }
  }
  const handleSignOut = async () => {
    await logout(true);
  }
  const handleRedirect = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setAlertOn(true);
      setErrorMessage("Please select a file to upload.");
      setTimeout(() => {
        setAlertOn(false); // Hide the alert
      }, 2000);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await fetch("https://upscaleimage-backend.work/incomingimage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errmsg = await response.json();
        throw new Error(`${response.status} : ${errmsg.message}`);
      }
      const data = await response.json();
      const filepath = data.file_path;
      console.log(`Success Message : ${data.message}, ${filepath}`)
      router.push(`/img-config?filePath=${encodeURIComponent(filepath)}`);
    }
    catch (err: unknown) {
      setHasBackendError(true);
      console.log(err);
      setErrorMessage((err as Error).message);
    }

  };

  const handlelogout = async () => {
    await logout(true);
  }
  if(hasBackendError) return (<ErrorCMP reset={()=>router.push('/')}></ErrorCMP>) // if Backend is not Live, will display error and redirect to home
                                                                                  //page
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <div className="flex flex-row items-center gap-5">
                <a href="#" className="flex items-center py-5 px-2 text-gray-700">
                  <Image src="/upscale.png" alt="Logo" width={32} height={32} />
                  <span className="font-bold text-xl ml-2">
                    Auto Image Upscaler
                  </span>
                </a>
                <Button variant='ghost' className="text-sm ml-2">User: {userInfo.user?.email}</Button>
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
      <Card className="m-20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Add your image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center  justify-center">
          <Input
            ref={fileInputRef}
            className="border border-black-500 p-2 transition-opacity duration-300 ease-in-out hover:opacity-80"
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleinputchange}
          />
          <div className="flex m-5 flex-row items-center gap-5">
            <Button variant={"destructive"} onClick={clearInput}>
              Unselect
            </Button>
            <Button onClick={handleRedirect}>
              Process Image
            </Button>`
          </div>
        </CardContent>
      </Card>

      {alertOn && <AlertComponent alertVisible={alertOn} errorMessage={errorMessage} />}
      {/* Footer */}
      <footer className="bg-white fixed bottom-0 w-full">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Auto Image Upscaler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
