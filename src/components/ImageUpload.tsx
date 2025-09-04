import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ImageUpload: React.FC = () => {
  const { uploadedImage, setUploadedImage, setDetectionResult, setPitchPositions } = useAppStore();

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setDetectionResult(null);
        setPitchPositions([]);
      };
      reader.readAsDataURL(file);
    }
  }, [setUploadedImage, setDetectionResult, setPitchPositions]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const clearImage = useCallback(() => {
    setUploadedImage(null);
    setDetectionResult(null);
    setPitchPositions([]);
  }, [setUploadedImage, setDetectionResult, setPitchPositions]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5" />
        Upload Football Image
      </h2>
      
      {!uploadedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drop your football image here or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports JPG, PNG, and WebP formats
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded football"
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearImage}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};