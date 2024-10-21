import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './button';
import { useAuthInfo } from '@propelauth/react';

interface ImageWithButtonProps {
  imageUrl: string;
  index: number;
  onRemove: () => void;
}

const ImageWithButton: React.FC<ImageWithButtonProps> = ({ imageUrl, index, onRemove }) => {
  const userInfo = useAuthInfo();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [removeURL, setRemoveURL] = useState<boolean>(false);
  const handleMouseEnter = (): void => setIsHovered(true);
  const handleMouseLeave = (): void => setIsHovered(false);
  const openInNewTab = (): void => {
    window.open(imageUrl, '_blank');
  };

  const handleRemoveImg = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${imageUrl}/remove`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${userInfo.accessToken}`
        }

      });
      if (response.ok) {
        setRemoveURL(true);
        onRemove();
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  if (removeURL) {
    return null;
  }
  return (
    <div
      // Reduce the container size for a miniaturized effect
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Component */}
      <Image
        src={imageUrl}
        alt={`Image ${index + 1}`}
        layout="intrinsic" // Use intrinsic layout for fixed-sized images
        width={250}
        height={100}
        objectFit="cover"
        objectPosition="center"
        loading="lazy"
        className={`rounded-lg transition-filter duration-300 ${isHovered ? "filter blur-sm" : ""}`}
      />

      {/* Button Components */}
      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <Button
            className="p-2 bg-blue-500 text-white rounded-md opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
            variant="outline"
            onClick={openInNewTab}
          >
            Open Image in New Tab
          </Button>
          <Button
            className="p-2 bg-red-500 text-white rounded-md opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
            variant="destructive"
            onClick={handleRemoveImg}
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageWithButton;
