


# 🛒 FershCart | E-Commerce Platform

Welcome to FershCart, a modern, full-featured e-commerce platform built with the latest web technologies to deliver a seamless and professional shopping experience for users and customers. The project aims to provide a complete online store supporting all essential and advanced operations such as product browsing, cart management, orders, checkout, account management, and more—all with a modern, user-friendly interface.

The platform is designed to be flexible and scalable, with a focus on performance, security, and user experience, and supports all devices and screen sizes.





## 🛠️ Technologies & Tools Used

- **Next.js**: Modern React framework for advanced web apps (SSR/SSG/CSR) with dynamic routing and API routes.
- **TypeScript**: Strongly-typed language that adds static types to JavaScript for better safety and fewer bugs.
- **TailwindCSS**: Utility-first CSS framework for building fast, responsive, and modern UIs.
- **Font Awesome**: Popular icon library for professional UI icons.
- **Next Fonts**: Leverages Next.js font optimization for better performance.
- **Axios**: Powerful HTTP client for easy and secure RESTful API requests.
- **React Hook Form**: Advanced form management library for React with validation and high performance.
- **Zod**: Flexible and customizable data validation library.
- **Redux Toolkit**: Centralized and efficient client state management.
- **React Toastify**: Interactive and attractive toast notification library.
- **AOS (Animate On Scroll)**: Library for scroll-based animations and effects.
- **ESLint & Prettier**: Code quality and formatting tools.
- **PostCSS**: CSS processing and optimization tool during build.
- **Config files**: tsconfig.json, eslint.config.mjs, next.config.ts for project configuration.

Each tool or library was carefully chosen to serve a specific purpose and deliver the best performance and user experience.


# Pages 


## 🚀 Getting Started & Installation

1. **Prerequisites:**
    - Node.js (latest LTS recommended)
    - npm or yarn

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the project locally:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Then open: [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
    ```bash
    npm run build
    npm start
    ```

5. **Extra formatting:**
    - To lint or format code: `npm run lint` or `npm run format`



## 🗂️ Project Structure & Key Folders

- **src/app/**: Contains all app pages (Next.js App Router), organized by feature (authentication, dashboard, platform, etc.).
- **src/components/**: Shared UI components (Navbar, Footer, LoadingSpinner, etc.) and reusable UI elements.
- **src/features/**: Each main feature (auth, cart, products, wishlist, etc.) has its own folder with components, screens, hooks, server, types, utils, etc.
- **src/store/**: Redux store setup and global state management.
- **src/assets/**: Images and fonts used in the UI.
- **src/styles/**: Main CSS files, Tailwind, and AOS customizations.
- **src/utils/**: Helper functions (e.g., localStorage management for cart/wishlist).
- **src/lib/**: Helper libraries (e.g., fontawesome setup).
- **src/config/**: Static or dynamic configuration files.
- **public/**: Public assets like images and logos.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **next.config.ts**: Next.js configuration.
- **eslint.config.mjs**: ESLint configuration for code quality.

The project is organized for easy development, maintenance, and future scalability.

### 🔥 Main Features

- User authentication (sign up, login) with email verification and password reset.
- Browse products by categories and brands with search and filtering.
- Product details page with images, specs, reviews, and add review.
- Cart management for both logged-in users and guests (localStorage support).
- Wishlist management for both logged-in users and guests.
- Checkout process with order summary and payment.
- Order tracking and detailed order history.
- Profile management (edit info, change password).
- Static pages: About, Privacy Policy, Terms & Conditions, Contact Us.
- Interactive toast notifications for success/error.
- Full Arabic support and responsive design for all devices.
- High performance and fast page loads thanks to Next.js optimizations.
- Protected routes for private pages (token-based auth).
- Rich user experience with animations (AOS) and modern design.


## 🗂️ Main Pages & User Flows

1. **Home:** Highlights featured products, offers, categories, and brands.
2. **Categories:** Browse products by category with filtering and search.
3. **Brands:** View all brands and browse products by brand.
4. **Products:** List all products with filtering and search options.
5. **Product Details:** Product info, images, reviews, and add to cart/wishlist.
6. **Cart:** Manage cart items with edit and remove options.
7. **Wishlist:** Save favorite products (for logged-in users and guests).
8. **Checkout:** Order summary, shipping, and payment details.
9. **Orders:** View order history and order details.
10. **Sign Up:** Create a new account with email verification.
11. **Login:** User login for registered users.
12. **Forget Password:** Send verification code to reset password.
13. **Reset Password:** Enter new password after verification.
14. **Verify Code:** Enter code sent to email for verification.
15. **Profile:** Manage user info and change password.
16. **About:** Project and team information.
17. **Privacy Policy:** View privacy policy.
18. **Terms:** View terms and conditions.
19. **Contact:** Contact form for support or inquiries.
20. **Not Found:** Shown for invalid or non-existent routes.

### Basic User Flow:
- Users can browse products without registration.
- To purchase or add to wishlist, users are prompted to sign up/login.
- After login, users can manage cart, orders, profile, and wishlist.
- All pages are mobile-friendly and easy to use.

