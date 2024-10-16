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

        <Card className=' m-5 h-100 w-100 flex flex-col gap-2 items-center'>
            <CardTitle className='font-bold text-2xl m-5'> Results: </CardTitle>
            <CardContent className="h-80 w-80 border-transparent">
                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage
                        src={`http://localhost:5000/${InputfilePath}`}
                        height={80} // Reduced height
                        width={80}  // Reduced width
                        alt="Input Image"
                    />}
                    itemTwo={<ReactCompareSliderImage
                        src={`http://localhost:5000/upscaled/${OutputfilePath}`}
                        height={80} // Reduced height
                        width={80}  // Reduced width
                        alt="Output Upscaled Image"
                    />}
                />
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
                <Button asChild>
                    <Link className="bg-green-500" href="/" >Upscale New</Link>
                </Button>
                <Button asChild variant="outline">
                    <a target="_blank" href={outputURL} >Download the image</a>
                </Button>
            </CardFooter>
        </Card>
    )

}