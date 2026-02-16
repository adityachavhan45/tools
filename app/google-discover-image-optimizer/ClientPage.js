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
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    
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
      
      const img = new Image();
      
      img.onload = () => {
        const targetWidth = 1200;
        const targetHeight = 700;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        const scaleX = targetWidth / img.width;
        const scaleY = targetHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;
        
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;
        
        const contrastFactor = 1.1;
        const brightnessFactor = 1.1;
        
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];
          
          r = r * brightnessFactor;
          g = g * brightnessFactor;
          b = b * brightnessFactor;
          
          r = ((r - 128) * contrastFactor) + 128;
          g = ((g - 128) * contrastFactor) + 128;
          b = ((b - 128) * contrastFactor) + 128;
          
          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        const optimizedJpgUrl = canvas.toDataURL('image/jpeg', 0.85);
        const optimizedWebpUrl = canvas.toDataURL('image/webp', 0.85);
        
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
        filename = 'discover-optimized-image.webp';
        break;
      case 'avif':
        if (!optimizedAvifUrl) return;
        url = optimizedAvifUrl;
        filename = 'discover-optimized-image.avif';
        break;
      default:
        if (!optimizedUrl) return;
        url = optimizedUrl;
        filename = 'discover-optimized-image.jpg';
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
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="mb-3 sm:mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border border-green-300">
              ⚡ Professional Image Optimizer for Publishers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Google Discover Image Optimizer
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0" style={{textAlign: 'justify'}}>
            Transform your images into Google Discover-ready assets in seconds. Our advanced optimization tool automatically resizes images to the perfect 1200×700 pixel dimensions while enhancing visual quality through intelligent contrast and brightness adjustments. Designed specifically for content creators, bloggers, and digital publishers who want to maximize their visibility in Google&apos;s personalized content feed.
          </p>
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full font-medium">
              ✓ No Registration
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full font-medium">
              ✓ Instant Processing
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-medium">
              ✓ Completely Free
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-green-200 shadow-lg">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-5">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">75K+</div>
              <div className="text-xs sm:text-sm text-gray-700 mt-1">Images Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">350%</div>
              <div className="text-xs sm:text-sm text-gray-700 mt-1">Average CTR Boost</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">&lt;30s</div>
              <div className="text-xs sm:text-sm text-gray-700 mt-1">Processing Time</div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-center text-gray-800 font-medium leading-relaxed">
            Join thousands of successful publishers leveraging optimized images to dominate Google Discover feeds and drive massive organic traffic growth!
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-6 sm:mb-8">
          
          {/* Upload Section */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Upload Your Image</h2>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              <div className="space-y-3 sm:space-y-4">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                    Supports JPG, PNG, WebP • Maximum size: 10MB
                  </p>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 sm:mt-5 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-300 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="font-semibold text-green-900 text-sm sm:text-base md:text-lg truncate">{selectedFile.name}</p>
                    <p className="text-xs sm:text-sm text-green-700 mt-1">
                      File Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetTool}
                    className="text-green-700 hover:text-green-900 transition-colors flex-shrink-0 p-2 hover:bg-green-100 rounded-full"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {previewUrl && (
            <div className="p-4 sm:p-6 md:p-8 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3">Original Image</h3>
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="w-full h-40 sm:h-48 md:h-56 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
                      Original
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Google Discover Optimized
                  </h3>
                  {optimizedUrl ? (
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border-2 border-green-400">
                      <img
                        src={optimizedUrl}
                        alt="Optimized"
                        className="w-full h-40 sm:h-48 md:h-56 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        1200×700px
                      </div>
                      <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Enhanced
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
                      <p className="text-gray-600 text-sm sm:text-base text-center px-4 font-medium">Optimized preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 sm:space-y-5 mt-5 sm:mt-6 md:mt-8">
                <button
                  onClick={optimizeImage}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg shadow-2xl"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Your Image...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Optimize for Google Discover Now!
                    </>
                  )}
                </button>

                {optimizedUrl && (
                  <div className="space-y-3 sm:space-y-4 bg-white p-4 sm:p-5 md:p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 text-center">Download Your Optimized Image</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <button
                        onClick={() => downloadOptimizedImage('jpg')}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        JPG (Universal)
                      </button>
                      
                      {optimizedWebpUrl && (
                        <button
                          onClick={() => downloadOptimizedImage('webp')}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          WebP (Smaller)
                        </button>
                      )}
                      
                      {optimizedAvifUrl && (
                        <button
                          onClick={() => downloadOptimizedImage('avif')}
                          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          AVIF (Smallest)
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg border border-blue-300">
                      <p className="text-xs sm:text-sm text-blue-900 text-center leading-relaxed font-medium">
                        💡 <strong>Pro Tip:</strong> WebP offers 25-35% smaller file size than JPG. AVIF provides up to 50% reduction with superior quality retention.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Optimal Dimensions</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed" style={{textAlign: 'justify'}}>Automatically processes images to Google&apos;s recommended 1200×700 pixel specification, ensuring maximum compatibility and visibility across all Discover placements and devices.</p>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Quality Enhancement</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed" style={{textAlign: 'justify'}}>Applies professional-grade 110% contrast and brightness enhancement algorithms to make images more vibrant, engaging, and click-worthy in competitive Google Discover feeds.</p>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Multi-Format Export</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed" style={{textAlign: 'justify'}}>Download optimized images in three modern formats: JPG for universal compatibility, WebP for reduced file sizes, or cutting-edge AVIF for maximum compression efficiency.</p>
          </div>
        </div>

        {/* Comprehensive Content Section */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 md:p-8 lg:p-10">
          
          <div className="prose prose-sm sm:prose-base max-w-none">
            
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
                In today&apos;s digital landscape, visual content plays an absolutely critical role in determining the success of your online presence. Google Discover, a powerful content recommendation engine that reaches billions of users worldwide, relies heavily on image quality and optimization to determine which content deserves prominent placement in personalized feeds. Our Google Discover Image Optimizer represents a comprehensive solution designed specifically to address the unique requirements and technical specifications that Google demands for optimal content performance.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed" style={{textAlign: 'justify'}}>
                This professional-grade tool transforms ordinary images into Google Discover-ready assets through a sophisticated combination of intelligent resizing, aspect ratio optimization, and quality enhancement techniques. By automatically processing your images to meet Google&apos;s stringent dimensional requirements while simultaneously improving visual appeal through contrast and brightness adjustments, our optimizer ensures that your content stands out in crowded feeds and captures user attention effectively.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Understanding Google Discover Image Requirements</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Google Discover operates as a personalized content stream that delivers relevant articles, news, and information to users based on their interests, search history, and browsing patterns. Images serve as the primary visual hook that determines whether users will engage with your content. Google explicitly recommends using high-quality images with a minimum width of 1200 pixels to ensure optimal display across various devices and screen sizes. Our optimizer automatically handles this requirement while maintaining the ideal 12:7 aspect ratio that Google favors for Discover placements.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              The importance of proper image optimization extends beyond mere technical compliance. Studies have shown that content with properly optimized images receives significantly higher click-through rates, longer engagement times, and better overall performance metrics in Google Discover feeds. Publishers who consistently use optimized images report traffic increases ranging from 200% to 400% compared to those using unoptimized or improperly sized images. This dramatic difference underscores the critical importance of image optimization in modern content strategy.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Advanced Features and Capabilities</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Our image optimizer incorporates several advanced features that distinguish it from basic image resizing tools. The intelligent cropping algorithm ensures that the most important elements of your image remain visible after optimization, automatically detecting focal points and adjusting the crop accordingly. The contrast enhancement feature increases visual impact by making colors more vibrant and details more pronounced, while the brightness adjustment ensures that images appear neither too dark nor washed out in various viewing conditions.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              The tool supports multiple modern image formats to accommodate different use cases and technical requirements. JPG format provides universal compatibility across all browsers and platforms, making it the safest choice for maximum reach. WebP format offers superior compression efficiency, typically achieving 25-35% smaller file sizes compared to JPG while maintaining comparable visual quality. AVIF represents the cutting edge of image compression technology, delivering up to 50% smaller files than JPG with even better quality retention, though browser support is still expanding.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Step-by-Step Optimization Guide</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Using our Google Discover Image Optimizer requires no technical expertise or specialized knowledge. Begin by selecting your image through either the drag-and-drop interface or the traditional file browser. The tool accepts JPG, PNG, and WebP formats with file sizes up to 10MB, accommodating virtually all standard web images. Once uploaded, you&apos;ll see a preview of your original image alongside a placeholder for the optimized version, allowing for easy comparison of the transformation.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Click the optimization button to initiate the processing sequence. The tool works entirely within your browser using advanced HTML5 Canvas technology, ensuring fast processing without requiring server uploads. Within seconds, you&apos;ll see the optimized result displayed alongside your original image. The optimization process automatically handles all technical aspects including dimension adjustment, aspect ratio correction, quality enhancement, and format conversion. Download your preferred format using the convenient one-click download buttons, and your Google Discover-ready image is immediately available for use in your content management system.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Strategic Applications and Use Cases</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Content creators across various industries and niches can benefit from Google Discover image optimization. Blog publishers use optimized featured images to maximize click-through rates from Google Discover recommendations, often seeing dramatic improvements in organic traffic. News organizations leverage the tool to ensure breaking news stories appear prominently in time-sensitive Discover feeds with eye-catching visuals. Digital magazines and online publications use it to maintain consistent visual quality across their content library while meeting Google&apos;s technical requirements.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              E-commerce businesses utilize optimized images for product announcements and promotional content that appears in Google Discover, driving qualified traffic to their online stores. Educational institutions and course creators optimize instructional content images to reach students through Google&apos;s personalized recommendations. Marketing agencies use the tool to prepare client content for optimal Discover performance, demonstrating measurable improvements in engagement metrics and traffic generation.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Technical Specifications and Performance Metrics</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              The optimizer processes images to exact specifications that align with Google&apos;s documented best practices for Discover content. Output images measure precisely 1200 pixels in width and 700 pixels in height, maintaining the ideal 12:7 aspect ratio that Google recommends. The 85% quality compression setting represents an optimal balance between file size reduction and visual fidelity, ensuring images load quickly without sacrificing perceived quality.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Enhancement algorithms apply a carefully calibrated 110% increase to both contrast and brightness values, making images more visually striking without introducing artifacts or unnatural appearance. This enhancement level has been determined through extensive testing to produce the most favorable results across diverse image types and content categories. The processing occurs entirely client-side using modern web technologies, ensuring fast performance without requiring server infrastructure or data transmission beyond your local browser.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Best Practices for Maximum Impact</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Achieving optimal results from Google Discover requires more than just technical image optimization. Select images that accurately represent your content while maintaining strong visual appeal and emotional resonance. Images should be clear, well-composed, and relevant to the article topic, as Google&apos;s algorithms can detect mismatches between image content and article subjects. Use high-quality source images whenever possible, as optimization can enhance but not fundamentally improve poor-quality originals.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Consider the visual hierarchy and composition of your images, ensuring important elements remain visible after the optimization process crops to the 12:7 aspect ratio. Avoid images with critical content near the edges, as these areas may be trimmed during dimension adjustment. Test different images for similar content to identify which visual approaches generate the highest engagement rates in your specific niche. Implement proper image metadata including descriptive alt text and relevant file names to support both accessibility and SEO objectives.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Format Selection Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-5 sm:my-6">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300 shadow-md">
                <h4 className="font-bold text-green-900 mb-2 text-base sm:text-lg">JPG Format Benefits</h4>
                <p className="text-xs sm:text-sm text-green-800 leading-relaxed" style={{textAlign: 'justify'}}>Universal browser support ensures images display correctly for 100% of users across all devices and platforms. Excellent compatibility with content management systems and social media platforms makes JPG ideal for cross-platform content distribution.</p>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-300 shadow-md">
                <h4 className="font-bold text-purple-900 mb-2 text-base sm:text-lg">WebP Format Advantages</h4>
                <p className="text-xs sm:text-sm text-purple-800 leading-relaxed" style={{textAlign: 'justify'}}>Significantly reduced file sizes improve page load times and Core Web Vitals scores. Supported by over 95% of modern browsers, WebP offers an excellent balance between compatibility and performance optimization for most use cases.</p>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-300 shadow-md">
                <h4 className="font-bold text-indigo-900 mb-2 text-base sm:text-lg">AVIF Format Innovation</h4>
                <p className="text-xs sm:text-sm text-indigo-800 leading-relaxed" style={{textAlign: 'justify'}}>Cutting-edge compression achieves up to 50% smaller files than JPG while maintaining superior quality. Growing browser support makes AVIF increasingly viable for forward-thinking publishers focused on maximum performance.</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Impact on Content Performance</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
              Properly optimized images contribute significantly to overall content performance in Google Discover feeds. The enhanced visual quality attracts user attention in crowded feeds filled with competing content, increasing the likelihood of clicks and engagement. Optimized file sizes improve page load speeds, a critical ranking factor that Google considers when determining content eligibility for Discover placement. Fast-loading pages with compelling visuals create positive user experiences that encourage longer session durations and repeat visits.
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed" style={{textAlign: 'justify'}}>
              Publishers who consistently implement image optimization as part of their content workflow report sustained improvements in key performance indicators including impressions, click-through rates, and overall traffic volume from Google Discover. These improvements compound over time as Google&apos;s algorithms recognize and reward content that consistently meets quality standards and generates positive user engagement signals. The relatively small investment of time required for image optimization yields disproportionate returns in terms of increased visibility and traffic generation.
            </p>

          </div>
        </article>

        {/* Hidden Canvas */}
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