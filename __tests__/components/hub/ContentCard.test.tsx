import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ContentCard } from "@/components/hub/ContentCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const baseProps = {
  title: "Test Title",
  slug: "test-title",
  content_type: "blog" as const,
};

describe("ContentCard", () => {
  describe("devotional accent", () => {
    it("renders devotional-accent for content_type=devotional", () => {
      render(<ContentCard {...baseProps} content_type="devotional" />);
      expect(screen.getByTestId("devotional-accent")).toBeInTheDocument();
    });

    it("does NOT render devotional-accent for content_type=blog", () => {
      render(<ContentCard {...baseProps} content_type="blog" />);
      expect(screen.queryByTestId("devotional-accent")).not.toBeInTheDocument();
    });

    it("does NOT render devotional-accent for content_type=guide", () => {
      render(<ContentCard {...baseProps} content_type="guide" />);
      expect(screen.queryByTestId("devotional-accent")).not.toBeInTheDocument();
    });
  });

  describe("excerpt", () => {
    it("shows excerpt text when provided", () => {
      render(<ContentCard {...baseProps} excerpt="Some excerpt text" />);
      expect(screen.getByText("Some excerpt text")).toBeInTheDocument();
    });

    it("does not show excerpt text when not provided", () => {
      const { container } = render(<ContentCard {...baseProps} />);
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("content-type badge", () => {
    it('shows "Blog" badge for blog type', () => {
      render(<ContentCard {...baseProps} content_type="blog" />);
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });

    it('shows "Devotional" badge for devotional type', () => {
      render(<ContentCard {...baseProps} content_type="devotional" />);
      expect(screen.getByText("Devotional")).toBeInTheDocument();
    });

    it('shows "Guide" badge for guide type', () => {
      render(<ContentCard {...baseProps} content_type="guide" />);
      expect(screen.getByText("Guide")).toBeInTheDocument();
    });
  });

  describe("featured_image", () => {
    it("renders an img when featured_image is provided", () => {
      render(<ContentCard {...baseProps} featured_image="/img/test.jpg" />);
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/img/test.jpg");
    });

    it("does not render an img when featured_image is not provided", () => {
      render(<ContentCard {...baseProps} />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });
});