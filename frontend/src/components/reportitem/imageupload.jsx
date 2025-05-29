// ImageUpload.js - Enhanced with better visual hierarchy and interactions
import React, { useRef, useState } from "react";
import { Upload, Camera, X } from "lucide-react";

const ImageUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewSrc(objectUrl);
      onFileSelect(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setPreviewSrc(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <label
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={openFileDialog}
      >
        <Upload size={16} className="text-blue-600" />
        Upload Image
      </label>

      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 cursor-pointer hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 relative group"
        onClick={openFileDialog}
      >
        {previewSrc ? (
          <div className="relative">
            <img
              src={previewSrc}
              alt="preview"
              className="max-h-48 max-w-full rounded-lg shadow-md object-contain"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4 group-hover:bg-blue-200 transition-colors">
              <Camera size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mb-2 font-medium">
              Drag & drop your image here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse your files
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              type="button"
              onClick={openFileDialog}
            >
              Browse Files
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Supported formats: JPG, PNG, GIF (Max 5MB)
      </p>
    </div>
  );
};

export default ImageUpload;