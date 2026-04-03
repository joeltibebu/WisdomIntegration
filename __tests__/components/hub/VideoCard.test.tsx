/**
 * Unit tests for VideoCard component.
 * Validates: Requirements 3.3, 4.4, 5.4
 */

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { VideoCard } from "@/components/hub/VideoCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const baseProps = {
  title: "Test Video",
  description: "A test video description",
  video_url: "https://example.com/video",
  category: "education",
  is_featured: false,
};

describe("VideoCard", () => {
  describe("featured ribbon", () => {
    it("renders featured-ribbon when is_featured=true", () => {
      render(<VideoCard {...baseProps} is_featured={true} />);
      expect(screen.getByTestId("featured-ribbon")).toBeInTheDocument();
    });

    it("does NOT render featured-ribbon when is_featured=false", () => {
      render(<VideoCard {...baseProps} is_featured={false} />);
      expect(screen.queryByTestId("featured-ribbon")).not.toBeInTheDocument();
    });
  });

  describe("play button", () => {
    it("renders the play button", () => {
      render(<VideoCard {...baseProps} />);
      expect(screen.getByTestId("play-button")).toBeInTheDocument();
    });
  });

  describe("Video badge", () => {
    it('renders a "Video" badge', () => {
      render(<VideoCard {...baseProps} />);
      expect(screen.getByText("Video")).toBeInTheDocument();
    });
  });

  describe("title and description", () => {
    it("renders the title", () => {
      render(<VideoCard {...baseProps} />);
      expect(screen.getByText("Test Video")).toBeInTheDocument();
    });

    it("renders the description", () => {
      render(<VideoCard {...baseProps} />);
      expect(screen.getByText("A test video description")).toBeInTheDocument();
    });
  });
});
