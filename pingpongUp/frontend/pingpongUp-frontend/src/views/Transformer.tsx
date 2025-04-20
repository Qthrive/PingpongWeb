"use client"
const API_BASE_URL = 'http://localhost:5000';
import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, ImageIcon, Video, RefreshCw, Check, X } from "lucide-react"

const DEFAULT_IMAGE = '/finalSource/finalImg.jpg';
const DEFAULT_VIDEO = '/finalSource/finalVideo.mp4';

export function Transformer() {
  // Image processing status
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [imageProgress, setImageProgress] = useState(0)
  const [imageProcessing, setImageProcessing] = useState(false)
  const [imageProcessed, setImageProcessed] = useState(false)

  // Video processing status
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [processedVideo, setProcessedVideo] = useState<string | null>(null)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoProcessing, setVideoProcessing] = useState(false)
  const [videoProcessed, setVideoProcessed] = useState(false)

  // File input references
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setImageProcessed(false)
      setProcessedImage(null)
      setImageProgress(0)
    }
    // 清空文件输入框的值
    if (e.target) {
      e.target.value = '';
    }
  }

  // Handle video upload
  // 支持的视频格式
  const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
  
  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!SUPPORTED_VIDEO_TYPES.includes(file.type)) {
        console.error('Unsupported video format:', file.type);
        return;
      }
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Video file loaded:', reader.result as string);
        setVideoPreview(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading video file:', reader.error);
        setVideoPreview(null);
      };
      reader.readAsDataURL(file);
      setVideoProcessed(false);
      setProcessedVideo(null);
      setVideoProgress(0);
    }
    // 清空文件输入框的值
    if (e.target) {
      e.target.value = '';
    }
  };

  // Simulate image processing
  const processImage = async () => {
    if (!imageFile) return;

    setImageProcessing(true);
    setImageProgress(0);

    try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch('http://localhost:5000/page/transformer/image', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const processedImageUrl = `${API_BASE_URL}${data.processed}`; // Assuming the response contains the processed image URL
            // setProcessedImage(data.processed);
            setProcessedImage(processedImageUrl); // Use the processed image URL from the response
            setImageProgress(100); // Set progress to 100% after processing
        } else {
            console.error('Image processing failed:', data.error);
            setProcessedImage(DEFAULT_IMAGE);
        }
    } catch (error) {
        console.error('Error processing image:', error);
        setProcessedImage(DEFAULT_IMAGE);
    } finally {
        setImageProcessing(false);
        setImageProcessed(true);
        setImageProgress(100);
    }
};

  // Simulate video processing
  const processVideo = async () => {
    if (!videoFile) return;

    setVideoProcessing(true);
    setVideoProgress(0);

    try {
        const formData = new FormData();
        formData.append('file', videoFile);

        const response = await fetch('http://localhost:5000/page/transformer/video', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const processedVideoUrl = `${API_BASE_URL}${data.processed}`;
            const originalVideoUrl = `${API_BASE_URL}${data.original}`; // 获取原始视频 URL

            setProcessedVideo(processedVideoUrl); // 设置处理后的视频 URL
            setVideoPreview(originalVideoUrl); // 更新预览为后端返回的原始视频 URL
            setVideoProgress(100); // 设置进度为 100%
        } else {
            console.error('Video processing failed:', data.error);
            setProcessedVideo(DEFAULT_VIDEO);
        }
    } catch (error) {
        console.error('Error processing video:', error);
        setProcessedVideo(DEFAULT_VIDEO);
    } finally {
        setVideoProcessing(false);
        setVideoProcessed(true);
        setVideoProgress(100);
    }
};

  // Drag and drop handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setImageProcessed(false)
      setProcessedImage(null)
      setImageProgress(0)
    }
  }

 
  // Handle video drop
  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      // 检查文件类型
      if (!SUPPORTED_VIDEO_TYPES.includes(file.type)) {
        console.error('Unsupported video format:', file.type);
        return;
      }
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading video file:', reader.error);
        setVideoPreview(null);
      };
      reader.readAsDataURL(file);
      setVideoProcessed(false);
      setProcessedVideo(null);
      setVideoProgress(0);
    }
  };


  // 下载处理后的图片
  const downloadProcessedImage = async () => {
    if (!processedImage) return;
    try {
      const response = await fetch(processedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed_image.jpg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // 下载处理后的视频
  const downloadProcessedVideo = async () => {
    if (!processedVideo) return;
    try {
      const response = await fetch(processedVideo, { cache: 'no-cache' }); // 添加 cache 选项
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed_video.mp4';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] p-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 h-full">
          {/* Image upload module */}
          <Card className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden h-full shadow-lg transition-transform hover:scale-105">
            <CardHeader className="pb-4 border-b border-[#333]">
              <CardTitle className="flex items-center text-xl font-semibold text-[#f8f9fa]">
                <ImageIcon className="mr-3 h-6 w-6 text-[#ff922b]" />
                Image Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`relative flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed ${
                  imagePreview ? "border-[#4a4a4a]" : "border-[#333]"
                } bg-[#242424] p-6 transition-all hover:border-[#ff922b]`}
                onClick={() => imageInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleImageDrop}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-xl"
                  />
                ) : (
                  <>
                    <Upload className="mb-3 h-12 w-12 text-[#6b7280]" />
                    <p className="mb-2 text-base font-medium text-[#f8f9fa]">Drag and drop an image or click to upload</p>
                    <p className="text-sm text-[#6b7280]">Supports JPG, PNG, GIF, etc.</p>
                  </>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-[#333]">
              <Button
                variant="outline"
                className="border-[#4a4a4a] bg-[#1a1a1a] text-[#f8f9fa] hover:bg-[#333] hover:text-[#ff922b] transition-colors"
                onClick={() => {
                  setImageFile(null)
                  setImagePreview(null)
                  setProcessedImage(null)
                  setImageProgress(0)
                  setImageProcessed(false)
                }}
                disabled={!imageFile || imageProcessing}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button
                className="bg-[#ff922b] text-[#f8f9fa] hover:bg-[#fd7e14] transition-colors"
                onClick={processImage}
                disabled={!imageFile || imageProcessing || imageProcessed}
              >
                {imageProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : imageProcessed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Start Processing
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Processed image display */}
          <Card className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden h-full shadow-lg transition-transform hover:scale-105">
            <CardHeader className="pb-4 border-b border-[#333]">
              <CardTitle className="flex items-center text-xl font-semibold text-[#f8f9fa]">
                <ImageIcon className="mr-3 h-6 w-6 text-[#ff922b]" />
                Processed Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-72 rounded-2xl border border-[#4a4a4a] bg-[#242424] p-6">
                {imageProcessing ? (
                  <div className="flex h-full flex-col items-center justify-center">
                    <RefreshCw className="mb-4 h-12 w-12 animate-spin text-[#ff922b]" />
                    <Progress value={imageProgress} className="mb-3 w-3/4 bg-[#333]" />
                    <p className="text-sm text-[#6b7280]">{imageProgress}% Completed</p>
                  </div>
                ) : processedImage ? (
                  <img
                    src={processedImage || "/placeholder.svg"}
                    alt="Processed"
                    className="h-full w-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-[#6b7280]">
                    <p className="text-sm">The processed image will be displayed here</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t border-[#333]">
              {processedImage && (
                <Button
                  className="bg-[#ff922b] text-[#f8f9fa] hover:bg-[#fd7e14] transition-colors"
                  onClick={downloadProcessedImage}
                >
                  Download Result
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Video upload module */}
          <Card className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden h-full shadow-lg transition-transform hover:scale-105">
            <CardHeader className="pb-4 border-b border-[#333]">
              <CardTitle className="flex items-center text-xl font-semibold text-[#f8f9fa]">
                <Video className="mr-3 h-6 w-6 text-[#ff922b]" />
                Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`relative flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed ${
                  videoPreview ? "border-[#4a4a4a]" : "border-[#333]"
                } bg-[#242424] p-6 transition-all hover:border-[#ff922b]`}
                onClick={() => videoInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleVideoDrop}
              >
                {videoPreview ? (
                  <video src={videoPreview} controls className="h-full w-full object-contain rounded-xl" />
                ) : (
                  <>
                    <Upload className="mb-3 h-12 w-12 text-[#6b7280]" />
                    <p className="mb-2 text-base font-medium text-[#f8f9fa]">Drag and drop a video or click to upload</p>
                    <p className="text-sm text-[#6b7280]">Supports MP4, WebM, AVI, etc.</p>
                  </>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-[#333]">
              <Button
                variant="outline"
                className="border-[#4a4a4a] bg-[#1a1a1a] text-[#f8f9fa] hover:bg-[#333] hover:text-[#ff922b] transition-colors"
                onClick={() => {
                  setVideoFile(null)
                  setVideoPreview(null)
                  setProcessedVideo(null)
                  setVideoProgress(0)
                  setVideoProcessed(false)
                }}
                disabled={!videoFile || videoProcessing}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button
                className="bg-[#ff922b] text-[#f8f9fa] hover:bg-[#fd7e14] transition-colors"
                onClick={processVideo}
                disabled={!videoFile || videoProcessing || videoProcessed}
              >
                {videoProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : videoProcessed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Start Processing
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Processed video display */}
          <Card className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden h-full shadow-lg transition-transform hover:scale-105">
            <CardHeader className="pb-4 border-b border-[#333]">
              <CardTitle className="flex items-center text-xl font-semibold text-[#f8f9fa]">
                <Video className="mr-3 h-6 w-6 text-[#ff922b]" />
                Processed Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-72 rounded-2xl border border-[#4a4a4a] bg-[#242424] p-6">
              {videoProcessing ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <RefreshCw className="mb-4 h-12 w-12 animate-spin text-[#ff922b]" />
                  <Progress value={videoProgress} className="mb-3 w-3/4 bg-[#333]" />
                  <p className="text-sm text-[#6b7280]">{videoProgress}% Completed</p>
                </div>
              ) : processedVideo ? (
                <video src={processedVideo} controls className="h-full w-full object-contain rounded-xl" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-[#6b7280]">
                  <p className="text-sm">The processed video will be displayed here</p>
                </div>
              )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t border-[#333]">
              {processedVideo && (
                <Button
                  className="bg-[#ff922b] text-[#f8f9fa] hover:bg-[#fd7e14] transition-colors"
                  onClick={downloadProcessedVideo}
                >
                  Download Result
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
