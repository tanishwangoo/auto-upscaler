//Error Page for Upscaling not happening

'use client'

import { Button } from "@/components/ui/button"
import { MdErrorOutline } from "react-icons/md";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function UpscaleError({
    error,
    reset
}: {
    error: string | null
    reset: () => void
}) {
    return (
        <div className="flex items-center justify-center gap-5 min-h-screen bg-gray-100">
            <Card className="bg-red-500 text-white shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-lg max-w-md mx-auto">
                <CardHeader>
                <MdErrorOutline /> 
                <CardTitle className="text-2xl font-semibold">
                {"Couldn't Upscale"} </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                    <p>{error}</p>
                    <p className="mt-2">Sorry for the trouble! </p>
                    <Button onClick={() => reset()} variant={'destructive'} className="bg-white text-red-500 hover:bg-red-700 hover:text-white font-medium py-2 px-4 rounded-md mt-5 shadow-md">
                       Upscale New Image
                    </Button>
                </CardContent>
            </Card>
        </div>

    )
}