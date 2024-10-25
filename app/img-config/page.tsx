"use client";

import { useSearchParams } from "next/navigation";
import ImgConfigCard from "@/components/ui/imgconfigcard";
import { useEffect } from "react";
import { useAuthInfo } from '@propelauth/react';


export default function ImgConfigPage() {
  const searchParams = useSearchParams();
  const filePath = searchParams.get("filePath");
  const userInfo = useAuthInfo();
  const headers =  {
    'Authorization': `Bearer ${userInfo.accessToken}`
  }



  if (!filePath) {
    return <p className="text-red-500">No file path provided.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold">Image Configuration</h1>
      </header>
      <main className="flex-grow flex items-center justify-center max-h-screen overflow-y-auto p-4">
        <ImgConfigCard filePath={filePath} />
      </main>
    </div>
  );
}

