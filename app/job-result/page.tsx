"use client";
import ImageCompareSlider from "@/components/ui/imgcompareslider"
import { useSearchParams } from "next/navigation";
import { Button } from '@/components/ui/button';
import { useAuthInfo } from '@propelauth/react';
import Link from 'next/link';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react';
import { headers } from 'next/headers';


interface RequestData {
  inputfilename: string;
  outputFileName: number;
}

export default function ResultCompare() {
    const searchParams = useSearchParams();
    const InputfileName = searchParams.get("InputfileName");
    const userInfo = useAuthInfo();
    const [downldURL, setDownldURL] = useState('');
    const [inputsize, setInputsize] = useState('');
    const [outputsize, setOutputsize] = useState('');
    const headers =  {
      'Authorization': `Bearer ${userInfo.accessToken}`
    }
    useEffect(() => {
        const outputFileName = searchParams.get("OutputFileName");
        if (!outputFileName) {
          console.error("OutputFileName not found in query params.");
          return; // Exit if OutputFileName is not present
        }
          const fetchDwnldURL = fetch(`https://upscaleimage-backend.work/upscaled/${outputFileName}`, {
            method: 'GET',
            headers
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error fetching S3 download link: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => setDownldURL(data.downloadURL))
          .catch((error) => console.error("Error fetching the download link:", error));
        
          const fetchSizes = fetch(`https://upscaleimage-backend.work/get-sizes` , {
            method: 'GET',
            headers
          })
          .then((response)=>{
            if (!response.ok) {
              throw new Error(`Couldn't get sizes ${response.status}`);
            }
            return response.json();
          })
          .then((data) =>{
            setOutputsize(data['OutputImageData'])
            setInputsize(data['InputImageData'])
          })
          .catch((err)=>console.error("Error fetching sizes:", err));
        
            Promise.all([fetchDwnldURL, fetchSizes]).catch((err) =>
            console.error("Error with one of the fetch calls:", err)
            );
      }, [searchParams, userInfo.accessToken]);

    return (
        <div className='flex flex-col align-center items-center'>
        <Card className='m-5 p-5 w-full max-w-md flex flex-col gap-4 items-center'>
            <CardTitle className='font-bold text-2xl'>Results:</CardTitle>

            {/* Card Content with image comparison */}
            <CardContent className="flex justify-center border border-gray-200 p-4">
                <ImageCompareSlider OutputLabel={outputsize} InputLabel={inputsize} InputfileName={InputfileName} downldURL={downldURL}></ImageCompareSlider>
            </CardContent>

            {/* Card Footer with Buttons */}
            <CardFooter className="flex gap-4 justify-center w-full">
                <Button asChild className="bg-green-500">
                    <Link href="/dashboard">Upscale New</Link>
                </Button>
                <a target= '_blank' href={downldURL}>
                <Button variant="outline">
                    Download the image
                </Button>
                </a>
            </CardFooter>
        </Card>
        </div>
    )

}