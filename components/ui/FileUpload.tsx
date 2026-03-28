"use client";

import React, { useRef, useState, useCallback } from "react";

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  maxSizeBytes?: number;
  onFileSelect: (file: File) => void;
  uploadProgress?: number; // 0–100, undefined = not uploading
  error?: string;
  disabled?: boolean;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  id,
  label,
  accept,
  maxSizeBytes,
  onFileSelect,
  uploadProgress,
  error,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const errorId = `${id}-error`;
  const displayError = error || localError;

  const validate = useCallback(
    (file: File): string | null => {
      if (maxSizeBytes && file.size > maxSizeBytes) {
        return `File is too large. Maximum size is ${formatBytes(maxSizeBytes)}.`;
      }
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const fileMime = file.type;
        const valid = acceptedTypes.some(
          (t) => t === fileMime || t === fileExt || t === "*"
        );
        if (!valid) {
          return `File type not allowed. Accepted: ${accept}`;
        }
      }
      return null;
    },
    [accept, maxSizeBytes]
  );

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file);
      if (err) {
        setLocalError(err);
        return;
      }
      setLocalError(null);
      setSelectedFile(file);
      onFileSelect(file);
    },
    [validate, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    []
  );

  const isUploading =
    uploadProgress !== undefined && uploadProgress >= 0 && uploadProgress < 100;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-wisdom-text">
        {label}
      </label>

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Upload file for ${label}`}
        aria-describedby={displayError ? errorId : undefined}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        className={[
          "flex flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:ring-offset-2",
          isDragging
            ? "border-wisdom-blue bg-blue-50"
            : "border-wisdom-border bg-wisdom-bg hover:border-wisdom-blue hover:bg-blue-50",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          displayError ? "border-red-400" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-wisdom-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        {selectedFile ? (
          <p className="text-sm text-wisdom-text font-medium">
            {selectedFile.name}{" "}
            <span className="text-wisdom-muted">
              ({formatBytes(selectedFile.size)})
            </span>
          </p>
        ) : (
          <>
            <p className="text-sm text-wisdom-text font-medium">
              Drag and drop a file here, or click to browse
            </p>
            {(accept || maxSizeBytes) && (
              <p className="text-xs text-wisdom-muted">
                {accept && `Accepted: ${accept}`}
                {accept && maxSizeBytes && " · "}
                {maxSizeBytes && `Max size: ${formatBytes(maxSizeBytes)}`}
              </p>
            )}
          </>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {isUploading && (
        <div className="mt-1" role="progressbar" aria-valuenow={uploadProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
          <div className="flex justify-between text-xs text-wisdom-muted mb-1">
            <span>Uploading…</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-wisdom-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {displayError && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {displayError}
        </p>
      )}
    </div>
  );
}
