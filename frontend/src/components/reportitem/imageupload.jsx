import React, { useRef, useState, useEffect } from "react";
import { Upload, Camera, X } from "lucide-react";

const ImageUpload = ({ onFileSelect, required = false }) => {
  const fileInputRef = useRef(null);
  const [previewSrcList, setPreviewSrcList] = useState([]);
  const [showError, setShowError] = useState(false);

  // Update validation when required is true and no images are selected
  useEffect(() => {
    if (required && previewSrcList.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [required, previewSrcList]);

  const openFileDialog = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previewSrcList, ...newPreviews];
    setPreviewSrcList(updatedPreviews);
    onFileSelect(updatedPreviews.map((p) => p.file));
  };

  const removeImage = (index) => {
    const updatedPreviews = previewSrcList.filter((_, i) => i !== index);
    setPreviewSrcList(updatedPreviews);
    onFileSelect(updatedPreviews.map((p) => p.file));
  };

  return (
    <div className="mb-6">
      <label
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={openFileDialog}
      >
        <Upload size={16} className="text-blue-600" />
        Upload Images {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 relative group cursor-pointer ${
          showError
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 hover:from-blue-50 hover:to-indigo-50"
        }`}
        onClick={openFileDialog}
      >
        {previewSrcList.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {previewSrcList.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt={`preview-${index}`}
                  className="h-32 w-32 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center rounded-xl p-6 transition-colors">
            <div className="bg-blue-100 rounded-full p-4 mb-4 hover:bg-blue-200 transition-colors duration-200">
              <Camera size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-700 mb-1 font-semibold">
              Drag & drop your images here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse your files
            </p>
            <button
              type="button"
              onClick={openFileDialog}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md transition-all duration-200"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>

      {showError && (
        <p className="text-sm text-red-500 mt-2 text-center">
          Please upload at least one image.
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-gray-500 mt-2 text-center">
        Supported formats: JPG, PNG, GIF (Max 5MB each)
      </p>
    </div>
  );
};

export default ImageUpload;
