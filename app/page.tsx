"use client"
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertComponent from "./alertcomp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {

  const router = useRouter(); // Initialize the useRouter hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // referenec for Image input field
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertOn, setAlertOn] = useState(false);
  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


  const handleRedirect = async () => {   
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setAlertOn(true);
      setErrorMessage("Please select a file to upload.");
      //setAlertOn(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try{
      const response = await fetch("http://localhost:5000/incomingimage", {
        method : "POST",
        body : formData,
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
    catch (err: unknown){
      console.log(err);
      setErrorMessage((err as Error).message);
    }

  };
  return (
    <div className="flex flex-col items-center m-2 justify-center v-screen">
      <Badge className="align-center text-2xl">Auto Image Upscaler - Powered by Open Source. </Badge>
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
      {alertOn && <AlertComponent errorMessage={errorMessage}/>}

    </div>
  );
}
