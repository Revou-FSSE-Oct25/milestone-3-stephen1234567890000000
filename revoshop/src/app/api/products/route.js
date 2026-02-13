import { NextResponse } from "next/server";

let products = [];

// GET all products
async function GET() {
  try {
    // Fetch dari API eksternal jika cache kosong
    if (products.length === 0) {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        cache: "force-cache",
      });
      products = await res.json();
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST new product
async function POST(request) {
  try {
    const body = await request.json();

    // Validasi
    if (!body.title || !body.price) {
      return NextResponse.json(
        { error: "Title dan price diperlukan" },
        { status: 400 }
      );
    }

    // Buat product baru
    const newProduct = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      ...body,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export { GET, POST };
