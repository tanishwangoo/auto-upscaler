'use client'
import { useState } from "react"
import SelectModel from "./selectmodel";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@propelauth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Slider } from "./slider";
import { Button } from "./button";
interface ImageConfigComponentProps {
  filePath: string;
}


const modelNames = [
  { label: "General Photo (Ultrasharp)", value: "ultrasharp" },
  { label: "General Photo (Real-ESRGAN)", value: "realesrgan-x4plus" },
  { label: "General Photo (Fast Real-ESRGAN)", value: "realesrgan-x4fast" },
  { label: "General Photo (Ultramix Balanced)", value: "ultramix_balanced" },
  { label: "General Photo (Remacri)", value: "remacri" },
  { label: "Digital Art (realesrgan-x4plus-anime)", value: "realesrgan-x4plus-anime" },
];
export default function ImgConfigCard({ filePath }: ImageConfigComponentProps) {
  const userInfo = useAuthInfo();
  const router = useRouter();
  const [value, setValue] = useState(2);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const filename = filePath.indexOf("")
  const [loading, setLoading] = useState(false);
  const imgname = filePath.substring(1);
  const handleUpscaleJob = async () => {
    setLoading(true);
    if (selectedModel != undefined) {
      const payload = {
        modelname: selectedModel,
        ups_strength: value,
        img: imgname
      };
      console.log(payload)

      try {
        const response = await fetch("http://localhost:5000/create-upscale-job", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`,
          },
          body: JSON.stringify(payload)
        })
        if (response.ok) {
          const data = await response.json();
          const OutputFilename = (data['outputfilename']);
          router.push(`/job-result?InputfilePath=${encodeURIComponent(imgname)}&OutputFilePath=${encodeURIComponent(OutputFilename)}`);
        }

      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }

    }
  }
  return (
    <div className="relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <div className="loader"></div> {/* Your custom loading animation */}
        </div>
      )}

      <Card className={`transition-opacity duration-300 ${loading ? 'opacity-50 blur-sm' : ''}`}>
        <CardHeader>
          <CardTitle className="text-center">
            Customize your Upscaling
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 items-center">
          <Image
            src={`http://localhost:5000${filePath}`}
            width={500}
            height={500}
            alt="Selected Image"
            priority={true}
          />
          <Slider
            defaultValue={[value]}
            min={1}
            max={5}
            step={1}
            onValueChange={(newValue) => setValue(newValue[0])}
          />
          <div className="text-center font-medium">
            Scaling Strength: {value}x
          </div>
          <SelectModel modelNames={modelNames} onModelChange={(model) => setSelectedModel(model)} />
          <Button onClick={handleUpscaleJob}>
            Upscale!
          </Button>
        </CardContent>
      </Card>
    </div>

  );
}
