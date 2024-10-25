import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';


interface ImageSliderProps{
  InputfileName: string | null
  downldURL: string | undefined
  InputLabel: string | null
  OutputLabel:  string | null
}
const ImageCompareSlider: React.FC<ImageSliderProps> = ({ InputfileName, downldURL, InputLabel, OutputLabel }) => {  const [labelOpacity, setLabelOpacity] = useState(1);

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
          src={`https://upscaleimage-backend.work/${InputfileName}`}
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
            <h1>Input Image</h1>
            <p>{InputLabel}</p>
          </div>
          {/* Right label (Upscaled Image) */}
          <div style={{ ...labelStyle, translate: '100% 0', right: 0 }}>
          <h1>Upscaled Image</h1>
          <p>{OutputLabel}</p>
          </div>
        </div>
      }
    />
  );
};

export default ImageCompareSlider;
