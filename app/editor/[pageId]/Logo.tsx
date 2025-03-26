"use client";
import { useState } from "react";
import Image from "next/image";
import placeholderLogo from "./placeholderLogo.jpg";

function Logo() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [logoWidth, setLogoWidth] = useState<number>(300);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    // Only toggle the slider view when logo is clicked
    setIsEditing(true);
  };

  const handleUploadNewLogo = () => {
    document.getElementById("logo-upload")?.click();
  };

  const handleSave = () => {
    // Optionally add any extra save logic here
    setIsEditing(false);
  };

  const renderLogo = () => {
    if (uploadedImage) {
      return (
        <img
          src={uploadedImage}
          alt="Uploaded Logo"
          style={{ width: `${logoWidth}px`, height: "auto", objectFit: "contain" }}
          className="cursor-pointer"
          onClick={handleLogoClick}
        />
      );
    }

    return (
      <Image
        src={placeholderLogo}
        alt="Placeholder Logo"
        width={logoWidth}
        height={120}
        className="cursor-pointer object-contain"
        onClick={handleLogoClick}
      />
    );
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {/* Render the logo */}
      {renderLogo()}

      {/* Hidden file input */}
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Only show slider and controls when editing */}
      {isEditing && (
        <div className="flex flex-col items-start space-y-2">
          <label htmlFor="logo-width" className="text-sm text-gray-600">
            Logo Width: {logoWidth}px
          </label>
          <input
            id="logo-width"
            type="range"
            min={50}
            max={600}
            step={10}
            value={logoWidth}
            onChange={(e) => setLogoWidth(Number(e.target.value))}
            className="w-48"
          />
          <div className="flex space-x-2">
            <button
              className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm px-3 py-1 rounded shadow border border-gray-400 hover:from-gray-200 hover:to-gray-300 transition-all"
              onClick={handleUploadNewLogo}
            >
              Upload New Logo
            </button>
            <button
              className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm px-3 py-1 rounded shadow border border-gray-400 hover:from-gray-200 hover:to-gray-300 transition-all"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Logo };
