"use client";
import React, { useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

export default function Uploader({
  onUploadSuccess,
}: {
  onUploadSuccess: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
    setProgress(100);
    console.log("Error", err);
  };

  const onSuccess = (res: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    console.log("Success", res);
    onUploadSuccess(res.url);
  };

  const onUploadStart = () => {
    setUploading(true);
    setError(null);
    setProgress(0);
  };

  const onProgress = (progressEvent: ProgressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    setProgress(progress);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div>
        <IKUpload
          name="coverImage"
          fileName="image"
          accept="image/*"
          validateFile={validateFile}
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          onUploadProgress={onProgress}
          useUniqueFileName={true}
          folder="/bookhive"
        />
      </div>

      {uploading && (
        <div className="w-full mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span>Uploading...</span>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ease-in-out bg-blue-600`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {error && <div className="text-error text-sm text-red-600">{error}</div>}
    </ImageKitProvider>
  );
}
