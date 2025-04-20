"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Paperclip,
  Send,
  X,
  FileJson,
  Loader2,
} from "lucide-react";

// Define message type
type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  files?: FileData[];
};

// Define file data type
type FileData = {
  id: string;
  name: string;
  type: string;
  url: string;
  content?: string; // For JSON file content
};

export function Analytics() {
  // State management
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "你好!我是千帆乒乓球助手,Pingpong Up Everyday!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!input.trim() && files.length === 0) return;

    // Generate a unique ID
    const messageId = Date.now().toString();

    // Add a user message
    const userMessage: MessageType = {
      id: messageId,
      role: "user",
      content: input,
      files: files.length > 0 ? [...files] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");
    setFiles([]);

    try {
      const response = await fetch("http://localhost:5000/page/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: data.answer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `请求失败: ${data.error}`,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `发生网络错误: ${error}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles: FileData[] = [];
    const newProgress: { [key: string]: number } = { ...uploadProgress };

    Array.from(e.target.files).forEach((file) => {
      const fileId = Date.now() + Math.random().toString(36).substring(2, 9);
      newProgress[fileId] = 0;

      // Create a file URL
      const fileUrl = URL.createObjectURL(file);

      // Add the file to the list
      newFiles.push({
        id: fileId,
        name: file.name,
        type:
          file.type ||
          (file.name.endsWith(".json")
            ? "application/json"
            : "application/octet-stream"),
        url: fileUrl,
      });

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          if (newProgress[fileId] < 100) {
            newProgress[fileId] += 10;
            return newProgress;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 200);

      // Read the content if it's a JSON file
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            // Update file content
            setFiles((prevFiles) =>
              prevFiles.map((prevFile) =>
                prevFile.id === fileId ? { ...prevFile, content } : prevFile
              )
            );
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(file);
      }
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setUploadProgress(newProgress);

    // Clear the file input to allow re-uploading the same file
    e.target.value = "";
  };

  // Remove a file
  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));

    // 清除上传进度
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  // 定义 formatJSON 方法，用于格式化 JSON 内容
  const formatJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      console.error('JSON 格式化失败:', error);
      return jsonString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-xl h-[calc(100vh-3rem)]">
          <CardHeader className="pb-2 border-b border-gray-800 rounded-t-2xl">
            <CardTitle className="flex items-center justify-center text-white text-lg font-medium">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-orange-600">AI</AvatarFallback>
              </Avatar>
              QF Pingpong AI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
            <Tabs
              defaultValue="chat"
              className="flex-1 flex flex-col"
            >
              <TabsContent
                value="chat"
                className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden"
              >
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        } transition-all duration-300`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-orange-600">
                              QF
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col max-w-[80%]">
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-orange-600 text-white"
                                : "bg-gray-800 text-white"
                            } shadow-sm`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>

                          {/* File preview */}
                          {message.files && message.files.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-sm"
                                >
                                  {file.type.includes("image") ? (
                                    <div className="relative">
                                      <img
                                        src={file.url || "/placeholder.svg"}
                                        alt={file.name}
                                        className="max-h-60 max-w-full object-contain mx-auto"
                                      />
                                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                        {file.name}
                                      </div>
                                    </div>
                                  ) : file.type.includes("video") ? (
                                    <div className="relative">
                                      <video
                                        src={file.url}
                                        controls
                                        className="max-h-60 max-w-full mx-auto"
                                      />
                                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                        {file.name}
                                      </div>
                                    </div>
                                  ) : (file.type.includes("json") ||
                                      file.name.endsWith(".json")) &&
                                    file.content ? (
                                    <div className="p-3">
                                      <div className="flex items-center text-xs text-gray-400 mb-1">
                                        <FileJson className="h-3 w-3 mr-1" />
                                        {file.name}
                                      </div>
                                      <pre className="text-xs text-gray-300 overflow-x-auto p-2 bg-gray-950 rounded">
                                        {formatJSON(file.content)}
                                      </pre>
                                    </div>
                                  ) : (
                                    <div className="p-3 flex items-center">
                                      <FileJson className="h-5 w-5 mr-2 text-gray-400" />
                                      <span className="text-sm text-gray-300 truncate">
                                        {file.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-gray-600">
                              U
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start transition-all duration-300">
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-orange-600">
                            QF
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-gray-800 text-white shadow-sm">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                {/* 新增文件预览区域 */}
                {files.length > 0 && (
                  <div className="p-4 border-t border-gray-800 space-y-2">
                    <div className="text-white text-sm font-medium">Preview</div>
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-sm p-3 flex items-center"
                        >
                          <FileJson className="h-5 w-5 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-300 truncate flex-1">
                            {file.name}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => removeFile(file.id)}
                            className="bg-gray-900 text-white"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {uploadProgress[file.id] !== undefined && (
                            <div className="ml-2 h-1 bg-gray-800 rounded-full w-16">
                              <div
                                className="h-full bg-orange-600 rounded-full"
                                style={{ width: `${uploadProgress[file.id]}%` }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="flex-1  cursor:pointer">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleSendMessage}
                      className="bg-orange-600 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-900 text-white"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="files"
                className="flex-1 flex flex-col p-4 m-0 data-[state=inactive]:hidden"
              >
                <div className="space-y-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-sm p-3 flex items-center"
                    >
                      <FileJson className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-300 truncate flex-1">
                        {file.name}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => removeFile(file.id)}
                        className="bg-gray-900 text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {uploadProgress[file.id] !== undefined && (
                        <div className="ml-2 h-1 bg-gray-800 rounded-full w-16">
                          <div
                            className="h-full bg-orange-600 rounded-full"
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
