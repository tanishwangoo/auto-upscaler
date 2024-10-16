"use client";

import { useSearchParams } from "next/navigation";
import ImgConfigCard from "@/components/ui/imgconfigcard";


export default function ImgConfigPage() {
    const searchParams = useSearchParams();
    const filePath = searchParams.get("filePath");

    if (!filePath) {
      return <p className="text-red-500">No file path provided.</p>;
    }
    
    return (
      <div className="flex flex-col items-center m-2 justify-center">
        <h1 className="text-2xl font-bold mb-4">Image Configuration</h1>
        <ImgConfigCard filePath={filePath}/>
      </div>
    );
  }

