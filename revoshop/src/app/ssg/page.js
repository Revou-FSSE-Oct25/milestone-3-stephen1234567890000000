import Container from "@/component/Container";

// This page is fully statically generated at build time (SSG)
export const dynamic = "force-static";

export default function SSGPage() {
  const faqs = [
    {
      q: "Apa itu RevoShop?",
      a: "RevoShop adalah demo toko online yang dibuat untuk tugas dan latihan menggunakan Next.js dan Tailwind CSS.",
    },
    {
      q: "Bagaimana cara memesan produk?",
      a: "Klik pada produk untuk melihat detail, lalu gunakan tombol 'Add to Cart' untuk menambahkan ke keranjang.",
    },
    {
      q: "Apakah ini mendukung pre-rendering?",
      a: "Halaman ini dihasilkan secara statis pada build time (SSG). Konten tidak melakukan fetch runtime.",
    },
    {
      q: "Bisakah saya mengubah konten ini?",
      a: "Ya — ubah file src/app/ssg/page.js untuk memperbarui pertanyaan dan jawaban.",
    },
  ];

  return (
    <Container>
      <section className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-neutral-400 mb-8">
          Halaman ini di-render secara statis pada build time dan cocok untuk
          konten seperti FAQ.
        </p>

        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">
                {item.q}
              </h3>
              <p className="text-neutral-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
