import { NextResponse } from "next/server";

let products = [];

// GET single product
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    // Load products jika belum
    if (products.length === 0) {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        cache: "force-cache",
      });
      products = await res.json();
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// PUT update product
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();

    // Load products jika belum
    if (products.length === 0) {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        cache: "force-cache",
      });
      products = await res.json();
    }

    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE product
async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    // Load products jika belum
    if (products.length === 0) {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        cache: "force-cache",
      });
      products = await res.json();
    }

    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export { GET, PUT, DELETE };
