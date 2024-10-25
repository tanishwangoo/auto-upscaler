//Error Page for Backend not being Live

'use client' 

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ErrorCMP({
  reset,
}: {
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-5 min-h-screen bg-gray-100">
      <Card className="bg-red-500 text-white shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-lg max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Facing trouble connecting to Backend services</CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <p>Most likely, the app backend is not currently deployed. A local server is used for this app due to high GPU usage.</p>
          <p className="mt-2">Sorry for the trouble! </p>
          <Button onClick={() => reset()} variant={'destructive'} className="bg-white text-red-500 hover:bg-red-700 hover:text-white font-medium py-2 px-4 rounded-md mt-5 shadow-md">
           Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>

  )
}