"use client";

import React, { useState } from "react";
import { Button } from "./Button";

interface PDFDownloadButtonProps {
  url: string;
  fileName?: string;
  label?: string;
  className?: string;
}

export function PDFDownloadButton({
  url,
  fileName = "report.pdf",
  label = "Download Report",
  className = "",
}: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError("Could not download the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={["flex flex-col gap-1", className].join(" ")}>
      <Button
        variant="outline"
        onClick={handleDownload}
        isLoading={isLoading}
        disabled={isLoading}
        aria-label={isLoading ? "Downloading…" : label}
      >
        {!isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )}
        {isLoading ? "Downloading…" : label}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
