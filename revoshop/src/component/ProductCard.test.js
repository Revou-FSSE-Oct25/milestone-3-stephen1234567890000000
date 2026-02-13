import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/component/ProductCard";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    images: ["https://example.com/image.jpg"],
  };

  it("should render product card", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should display product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("should have correct link href", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/1");
  });

  it("should display product image", () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
  });

  it("should handle string images format", () => {
    const productWithStringImage = {
      ...mockProduct,
      images: "https://example.com/image.jpg",
    };
    render(<ProductCard product={productWithStringImage} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("should use placeholder for missing images", () => {
    const productWithoutImages = {
      ...mockProduct,
      images: null,
    };
    render(<ProductCard product={productWithoutImages} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", "/placeholder.png");
  });
});
