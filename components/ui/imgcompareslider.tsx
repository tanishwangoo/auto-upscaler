import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

const ImageCompareSlider: React.FC<{ InputfileName: string | null, downldURL: string | undefined}> = ({ InputfileName, downldURL }) => {
  const [labelOpacity, setLabelOpacity] = useState(1);

  const labelStyle = {
    fontSize: '.75rem',
    position: 'absolute' as const,
    padding: '.25rem',
    color: 'white',
    opacity: labelOpacity,
    borderRadius: '.25rem',
    border: '1px solid white',
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.25s ease-in-out',
  };

  return (
    <ReactCompareSlider
      onPointerDown={() => setLabelOpacity(0)}  // Hide labels while dragging
      onPointerUp={() => setLabelOpacity(1)}    // Show labels when dragging ends
      itemOne={
        <ReactCompareSliderImage
          src={`http://localhost:5000/${InputfileName}`}
          alt="Input Image"
          style={{ width: '100%', height: '100%' }}  // Ensure images scale within the slider
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={downldURL}
          alt="Output Upscaled Image"
          style={{ width: '100%', height: '100%' }}  // Ensure images scale within the slider
        />
      }
      handle={
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <ReactCompareSliderHandle />
          {/* Left label (Input Image) */}
          <div style={{ ...labelStyle, translate: '-100% 0', left: 0 }}>
            Input Image
          </div>
          {/* Right label (Upscaled Image) */}
          <div style={{ ...labelStyle, translate: '100% 0', right: 0 }}>
            Upscaled Image
          </div>
        </div>
      }
    />
  );
};

export default ImageCompareSlider;
