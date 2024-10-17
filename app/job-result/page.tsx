"use client";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useSearchParams } from "next/navigation";
import { Button } from '@/components/ui/button';
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
export default function ResultCompare() {
    const searchParams = useSearchParams();
    const InputfilePath = searchParams.get("InputfilePath");
    const OutputfilePath = searchParams.get("OutputFilePath");
    const outputURL = `http://localhost:5000/upscaled/${OutputfilePath}`;

    return (
        <div className='flex flex-col align-center items-center'>
        <Card className='m-5 p-5 w-full max-w-md flex flex-col gap-4 items-center'>
            <CardTitle className='font-bold text-2xl'>Results:</CardTitle>

            {/* Card Content with image comparison */}
            <CardContent className="flex justify-center border border-gray-200 p-4">
                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage
                        src={`http://localhost:5000/${InputfilePath}`}
                        alt="Input Image"
                        style={{ width: '100%', height: '100%'}}  // Ensure images scale within the slider
                    />}
                    itemTwo={<ReactCompareSliderImage
                        src={`http://localhost:5000/upscaled/${OutputfilePath}`}
                        alt="Output Upscaled Image"
                        style={{ width: '50%'}}  // Ensure images scale within the slider
                    />}
                />
            </CardContent>

            {/* Card Footer with Buttons */}
            <CardFooter className="flex gap-4 justify-center w-full">
                <Button asChild className="bg-green-500">
                    <Link href="/">Upscale New</Link>
                </Button>
                <Button asChild variant="outline">
                    <a download href={outputURL}>Download the image</a>
                </Button>
            </CardFooter>
        </Card>
        </div>
    )

}