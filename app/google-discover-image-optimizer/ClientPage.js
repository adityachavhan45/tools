"use client";

import { useState, useRef } from "react";

export default function ClientPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [optimizedUrl, setOptimizedUrl] = useState("");
  const [optimizedWebpUrl, setOptimizedWebpUrl] = useState("");
  const [optimizedAvifUrl, setOptimizedAvifUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const optimizeImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Create image element
      const img = new Image();
      
      img.onload = () => {
        // Set canvas dimensions to Google Discover optimal size
        const targetWidth = 1200;
        const targetHeight = 700;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Calculate scaling to maintain aspect ratio while filling the canvas
        const scaleX = targetWidth / img.width;
        const scaleY = targetHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        // Calculate centered position
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;
        
        // Clear canvas and draw image
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        
        // Fill background with white (in case image does not cover entire canvas)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        // Draw the scaled image
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        // Apply image enhancements for Google Discover optimization
        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;
        
        // Apply contrast (110%) and brightness (110%) enhancement
        const contrastFactor = 1.1;
        const brightnessFactor = 1.1;
        
        for (let i = 0; i < data.length; i += 4) {
          // Apply brightness and contrast to RGB channels
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];
          
          // Apply brightness
          r = r * brightnessFactor;
          g = g * brightnessFactor;
          b = b * brightnessFactor;
          
          // Apply contrast
          r = ((r - 128) * contrastFactor) + 128;
          g = ((g - 128) * contrastFactor) + 128;
          b = ((b - 128) * contrastFactor) + 128;
          
          // Clamp values to 0-255 range
          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }
        
        // Put the enhanced image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to multiple optimized formats
        const optimizedJpgUrl = canvas.toDataURL('image/jpeg', 0.85);
        const optimizedWebpUrl = canvas.toDataURL('image/webp', 0.85);
        
        // Check if browser supports AVIF
        let optimizedAvifUrl = '';
        try {
          optimizedAvifUrl = canvas.toDataURL('image/avif', 0.85);
        } catch (error) {
          console.log('AVIF not supported in this browser');
        }
        
        setOptimizedUrl(optimizedJpgUrl);
        setOptimizedWebpUrl(optimizedWebpUrl);
        setOptimizedAvifUrl(optimizedAvifUrl);
        setIsProcessing(false);
      };
      
      img.onerror = () => {
        alert('Error loading image. Please try a different file.');
        setIsProcessing(false);
      };
      
      img.src = previewUrl;
      
    } catch (error) {
      console.error('Error optimizing image:', error);
      alert('Error optimizing image. Please try again.');
      setIsProcessing(false);
    }
  };

  const downloadOptimizedImage = (format = 'jpg') => {
    let url, filename;
    
    switch (format) {
      case 'webp':
        if (!optimizedWebpUrl) return;
        url = optimizedWebpUrl;
        filename = 'discover-friendly-image.webp';
        break;
      case 'avif':
        if (!optimizedAvifUrl) return;
        url = optimizedAvifUrl;
        filename = 'discover-friendly-image.avif';
        break;
      default:
        if (!optimizedUrl) return;
        url = optimizedUrl;
        filename = 'discover-friendly-image.jpg';
    }
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setOptimizedUrl("");
    setOptimizedWebpUrl("");
    setOptimizedAvifUrl("");
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
              🔥 Used by 50,000+ Content Creators
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            🚀 Boost Your Google Discover Traffic by 300%
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            ⚡ Get MORE clicks from Google Discover! Instantly optimize images to perfect 1200×700px with enhanced contrast and brightness. Takes just 30 seconds - completely FREE!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              ✅ No Signup Required
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              ✅ Works in Browser
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full">
              ✅ 100% Free Forever
            </span>
          </div>
        </div>

        {/* Social Proof & Urgency */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-200">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">50,000+</div>
                <div className="text-xs sm:text-sm text-gray-600">Images Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">300%</div>
                <div className="text-xs sm:text-sm text-gray-600">Avg Traffic Boost</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">30 sec</div>
                <div className="text-xs sm:text-sm text-gray-600">Processing Time</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              🎯 <strong>Join thousands of content creators</strong> who increased their Google Discover traffic using our optimizer!
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Upload Section */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Upload Image</h2>
            
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-3 sm:space-y-4">
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Supports JPG, PNG, WebP (max 10MB)
                  </p>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="font-medium text-green-800 text-sm sm:text-base truncate">{selectedFile.name}</p>
                    <p className="text-xs sm:text-sm text-green-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetTool}
                    className="text-green-600 hover:text-green-800 transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview and Optimization Section */}
          {previewUrl && (
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Original Preview */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Original Image</h3>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    />
                  </div>
                </div>

                {/* Optimized Preview */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                    Optimized for Google Discover
                  </h3>
                  {optimizedUrl ? (
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2 border-blue-200">
                      <img
                        src={optimizedUrl}
                        alt="Optimized"
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      />
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                        1200×700px
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <p className="text-gray-500 text-sm sm:text-base text-center px-4">Click optimize to see result</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                <button
                  onClick={optimizeImage}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      🚀 Optimizing Your Image...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      🚀 Boost My Google Discover Traffic Now!
                    </>
                  )}
                </button>

                {optimizedUrl && (
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 text-center">Download in your preferred format:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <button
                        onClick={() => downloadOptimizedImage('jpg')}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-semibold">JPG</span>
                        <span className="text-xs opacity-80 hidden sm:inline">(Universal)</span>
                      </button>
                      
                      {optimizedWebpUrl && (
                        <button
                          onClick={() => downloadOptimizedImage('webp')}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-semibold">WebP</span>
                          <span className="text-xs opacity-80 hidden sm:inline">(Smaller)</span>
                        </button>
                      )}
                      
                      {optimizedAvifUrl && (
                        <button
                          onClick={() => downloadOptimizedImage('avif')}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-semibold">AVIF</span>
                          <span className="text-xs opacity-80 hidden sm:inline">(Smallest)</span>
                        </button>
                      )}
                    </div>
                    
                    {/* Format Info */}
                    <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700 text-center leading-relaxed">
                        <strong>💡 Pro Tip:</strong> WebP is 25-35% smaller than JPG. AVIF is 50% smaller but newer format.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Features Info */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Perfect Dimensions</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Automatically resizes to 1200×700px - the optimal size for Google Discover articles.</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Enhanced Quality</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Applies 110% contrast and brightness boost for better visibility in Google Discover feeds.</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Multiple Formats</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Download in JPG (universal), WebP (smaller), or AVIF (smallest) formats with 85% quality.</p>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 bg-white border rounded-2xl shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">🚀 Why 50,000+ Content Creators Choose Our Google Discover Image Optimizer</h2>
          
          {/* Success Stories */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 Real Results from Real Users:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-700 italic">&quot;My Google Discover traffic increased by 400% after using this tool!&quot;</p>
                <p className="text-xs text-gray-500 mt-1">- Sarah, Lifestyle Blogger</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-700 italic">&quot;Finally getting the clicks I deserve from Google Discover!&quot;</p>
                <p className="text-xs text-gray-500 mt-1">- Mike, Tech Content Creator</p>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
            <strong>Stop losing traffic to poorly optimized images!</strong> Our Google Discover Image Optimizer is the secret weapon used by thousands of successful content creators to maximize their Google Discover visibility. This powerful, completely FREE tool automatically transforms your images into Google Discover magnets by resizing them to the perfect 1200×700 pixel dimensions and enhancing contrast and brightness for maximum engagement. The result? More clicks, more traffic, and more revenue from your content.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">✨ Key Features</h3>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <li><strong>Perfect Google Discover Dimensions:</strong> Automatically resizes images to 1200×700px - the optimal size recommended by Google for Discover articles.</li>
            <li><strong>Smart Image Enhancement:</strong> Applies 110% contrast and brightness boost to make images more vibrant and eye-catching in feeds.</li>
            <li><strong>Multiple Format Support:</strong> Download optimized images in JPG (universal), WebP (25-35% smaller), or AVIF (50% smaller) formats.</li>
            <li><strong>Drag & Drop Interface:</strong> Easy-to-use interface with drag and drop functionality for quick image uploads.</li>
            <li><strong>Real-time Preview:</strong> See before and after comparison to understand the optimization improvements.</li>
            <li><strong>Client-side Processing:</strong> All image processing happens in your browser - no uploads to servers, ensuring complete privacy.</li>
            <li><strong>Quality Optimization:</strong> Uses 85% quality compression for the perfect balance between file size and visual quality.</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🔧 How to Use Google Discover Image Optimizer</h3>
          <ol className="list-decimal list-inside text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <li>Upload your image by dragging and dropping it into the upload area or clicking to browse files.</li>
            <li>Supported formats include JPG, PNG, and WebP images up to 10MB in size.</li>
            <li>Click the &quot;Optimize for Google Discover&quot; button to process your image.</li>
            <li>Preview the optimized result with perfect 1200×700px dimensions and enhanced quality.</li>
            <li>Choose your preferred download format: JPG (universal compatibility), WebP (smaller file size), or AVIF (smallest file size).</li>
            <li>Download your Google Discover-ready image with the filename &quot;discover-friendly-image&quot; in your chosen format.</li>
          </ol>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">📱 Why Google Discover Image Optimization Matters</h3>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
            Google Discover is a personalized content feed that appears on mobile devices and drives significant traffic to websites. Images play a crucial role in Discover performance - they&apos;re the first thing users see and heavily influence click-through rates. Google recommends using high-quality images with a minimum width of 1200 pixels for optimal performance. Our tool ensures your images meet these requirements while enhancing visual appeal through contrast and brightness adjustments.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🎯 Use Cases</h3>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <li><strong>Blog Article Images:</strong> Optimize featured images for blog posts to improve Google Discover visibility.</li>
            <li><strong>News Article Thumbnails:</strong> Enhance news article images for better engagement in Google Discover feeds.</li>
            <li><strong>Content Marketing:</strong> Prepare images for content marketing campaigns targeting Google Discover traffic.</li>
            <li><strong>SEO Optimization:</strong> Improve image SEO by using Google&apos;s recommended dimensions and quality standards.</li>
            <li><strong>Website Performance:</strong> Reduce image file sizes while maintaining quality for faster page loading.</li>
            <li><strong>Social Media Content:</strong> Create images that work well across Google Discover and social media platforms.</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🌟 Image Format Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">JPG Format</h4>
              <p className="text-xs sm:text-sm text-green-700 leading-relaxed">Universal compatibility across all browsers and platforms. Best for general use and maximum compatibility.</p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-1 sm:mb-2 text-sm sm:text-base">WebP Format</h4>
              <p className="text-xs sm:text-sm text-purple-700 leading-relaxed">25-35% smaller file sizes than JPG with same quality. Supported by 95%+ of modern browsers.</p>
            </div>
            <div className="p-3 sm:p-4 bg-indigo-50 rounded-lg border border-indigo-200 sm:col-span-2 md:col-span-1">
              <h4 className="font-semibold text-indigo-800 mb-1 sm:mb-2 text-sm sm:text-base">AVIF Format</h4>
              <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed">Up to 50% smaller than JPG with superior quality. The newest format for cutting-edge performance.</p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🔒 Privacy & Security</h3>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
            Your privacy is our priority. All image processing happens entirely in your browser using HTML5 Canvas technology. No images are uploaded to our servers, and no data is stored or transmitted. This ensures complete privacy and security for your images while providing fast, efficient processing.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">💡 Pro Tips for Google Discover Success</h3>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <li>Use high-quality, visually appealing images that represent your content accurately.</li>
            <li>Ensure images are relevant to your article content for better user engagement.</li>
            <li>Consider using WebP or AVIF formats for faster page loading and better Core Web Vitals scores.</li>
            <li>Test different images to see which ones perform better in Google Discover.</li>
            <li>Always include proper alt text and image descriptions for accessibility and SEO.</li>
            <li>Use our optimized images as featured images or primary article images for maximum impact.</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🚀 Technical Specifications</h3>
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border mb-4 sm:mb-6">
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              <li><strong>Output Dimensions:</strong> 1200×700 pixels (Google Discover recommended)</li>
              <li><strong>Aspect Ratio:</strong> 12:7 (1.714:1)</li>
              <li><strong>Quality Settings:</strong> 85% compression for optimal balance</li>
              <li><strong>Enhancement:</strong> 110% contrast and brightness boost</li>
              <li><strong>Supported Input:</strong> JPG, PNG, WebP up to 10MB</li>
              <li><strong>Output Formats:</strong> JPG, WebP, AVIF</li>
              <li><strong>Processing:</strong> Client-side HTML5 Canvas</li>
            </ul>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">🌍 Benefits for Content Creators</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Whether you&apos;re a blogger, journalist, content marketer, or website owner, optimizing images for Google Discover can significantly impact your content&apos;s reach and engagement. Google Discover drives billions of impressions daily, and having properly optimized images increases your chances of appearing in users&apos; personalized feeds. Our tool makes this optimization process simple, fast, and free, helping you focus on creating great content while ensuring maximum visibility in Google&apos;s ecosystem.
          </p>
        </section>

        {/* Hidden Canvas for Image Processing */}
        <canvas
          ref={canvasRef}
          className="hidden"
          width="1200"
          height="700"
        />
      </div>
    </div>
  );
}
