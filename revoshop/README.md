# RevoShop

A modern, responsive e-commerce platform for digital music and audio products, inspired by BeatStars. Built with Next.js 14, featuring a luxury metallic design theme, state management with Zustand, and optimized for performance and user experience.

## Features

- **Product Catalog**: Browse and search through a curated collection of digital products
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add, remove, and manage items in the cart with persistent state
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Luxury metallic theme with smooth animations and transitions
- **Performance Optimized**: Built with Next.js for fast loading and SEO optimization
- **State Management**: Efficient state handling using Zustand for cart functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom luxury theme
- **State Management**: Zustand
- **Font**: Geist (Google Fonts)
- **API**: Fake Store API (for product data)
- **Deployment**: Vercel (recommended)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 18.0 or higher)
- npm, yarn, pnpm, or bun package manager
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/revoshop.git
   cd revoshop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

### Navigation
- **Home**: Browse the product catalog
- **Products**: View all available products
- **Cart**: Manage your shopping cart
- **Admin**: Administrative features (placeholder)

### Shopping Flow
1. Browse products on the home page
2. Click on a product card to view details
3. Add items to cart from the product detail page
4. View and manage cart contents
5. Proceed to checkout (placeholder functionality)

## Project Structure

```
revoshop/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and luxury theme
│   │   ├── layout.js            # Root layout component
│   │   ├── page.js              # Home page
│   │   ├── cart/
│   │   │   └── page.jsx         # Shopping cart page
│   │   └── product/
│   │       └── [id]/
│   │           └── page.js      # Product detail page
│   ├── component/
│   │   ├── AddToCartButton.jsx  # Add to cart functionality
│   │   ├── Container.jsx        # Layout container
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Navbar.jsx           # Navigation header
│   │   └── ProductCard.jsx      # Product display card
│   └── store/
│       └── UseCartStore.js      # Zustand store for cart state
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com/) for product data. The API provides:

- Product catalog with images, descriptions, and pricing
- Category information
- Product details by ID

### API Endpoints Used

- `GET /api/v1/products` - Fetch all products
- `GET /api/v1/products/{id}` - Fetch specific product details

## Configuration

### Tailwind CSS

The project includes a custom luxury metallic theme defined in `tailwind.config.js`:

```javascript
colors: {
  luxury: {
    gold: "#FFD700",
    silver: "#C0C0C0",
    bronze: "#CD7F32",
    black: "#000000",
    white: "#FFFFFF",
    charcoal: "#36454F"
  }
}
```

### Environment Variables

No environment variables are required for basic functionality. For production deployment, consider adding:

- `NEXT_PUBLIC_API_URL` - Custom API endpoint (if not using Fake Store API)

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- Use ESLint for code linting
- Follow React and Next.js best practices
- Use meaningful component and variable names
- Keep components small and focused

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by BeatStars marketplace design
- Built with Next.js and Tailwind CSS
- Product data provided by Fake Store API
- Icons and assets from various open-source projects

## Contact

For questions or support, please open an issue on GitHub or contact the maintainer.

---

Built using Next.js and Tailwind CSS
