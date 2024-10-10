'use client'
import { useState } from "react"
import SelectModel from "./selectmodel";
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
interface ImageConfigComponentProps {
    filePath: string;
}


const modelNames = [
    "GENERAL PHOTO (REAL-ESRGAN)",
    "GENERAL PHOTO (FAST REAL-ESRGAN)",
    "GENERAL PHOTO (REMACRI)",
    "GENERAL PHOTO (ULTRAMIX BALANCED)",
    "GENERAL PHOTO (ULTRASHARP)",
    "DIGITAL ART",
  ];
export default function ImgConfigCard({ filePath }: ImageConfigComponentProps) {

    const [value, setValue] = useState(2);
    const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">
                    Customize your Upscaling
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <Image src={`http://localhost:5000${filePath}`} width={500} height={500}
                    alt="Selected Image" />
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
                <SelectModel modelNames={modelNames} onModelChange={(model) => setSelectedModel(model)}/>           
            </CardContent>
        </Card>

    );
}
