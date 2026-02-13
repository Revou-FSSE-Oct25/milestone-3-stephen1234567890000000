"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/component/Container";
import useAuthStore from "@/store/useAuthStore";

export default function AdminPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          alert("Product updated");
          setForm({ title: "", price: "", description: "" });
          setEditingId(null);
          fetchProducts();
        }
      } else {
        // Create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: parseFloat(form.price),
          }),
        });

        if (res.ok) {
          alert("Product created");
          setForm({ title: "", price: "", description: "" });
          fetchProducts();
        }
      }
    } catch (error) {
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        alert("Product deleted");
        fetchProducts();
      }
    } catch (error) {
      alert("Failed to delete product");
    }

    const handleCancel = () => {
      setForm({ title: "", price: "", description: "" });
      setEditingId(null);
    };

    return (
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 sticky top-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  {editingId ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="Product title"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="0.00"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Product description"
                      rows="4"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90"
                    >
                      {editingId ? "Update" : "Add"}
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 py-2 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">
                Products ({products.length})
              </h2>

              {loading ? (
                <p className="text-neutral-400">Loading...</p>
              ) : products.length === 0 ? (
                <p className="text-neutral-400">No products yet</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700 hover:border-neutral-600 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-accent font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-xs text-neutral-400">
                          ID: {product.id}
                        </span>
                      </div>

                      {product.description && (
                        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 py-2 px-3 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 py-2 px-3 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    );
  };
}
