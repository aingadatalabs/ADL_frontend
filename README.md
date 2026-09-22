# Ainga Data Labs — Frontend Application (`ADL_frontend`)

Production-ready web platform and interactive API playground for **Ainga Data Labs (ADL)**. Built with React 19, TypeScript, and Vite.

---

## 🛠 Tech Stack

* **Core Framework:** React 19 (`react`, `react-dom`)
* **Type System:** TypeScript (Strict mode, ES2023, Project References)
* **Build Tooling:** Vite v8 with `@tailwindcss/vite` (Tailwind CSS v4)
* **Linting & Quality:** ESLint 9 (Flat Config)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** `v20.x` or higher
* **Package Manager:** `npm` (v10+)

### Installation & Local Development

1. **Install dependencies:**
   ```bash
   npm install
Start the local development server:

Bash
npm run dev
Access the app locally at http://localhost:5173/.

Type-check and build for production:

Bash
npm run build
Preview production build locally:

Bash
npm run preview
📁 Project Architecture
Plaintext
ADL_frontend/
├── public/              # Static public assets (favicon.png, icons)
│   ├── api/             # Local API demo JSON mock fixtures
│   └── favicon.png      # ADL Brand Favicon
├── src/
│   ├── assets/          # Static media, icons, and image assets
│   ├── services/        # API client modules and data fetchers
│   ├── types/           # Core TypeScript type contracts & interfaces
│   ├── App.tsx          # Main application router and view views
│   ├── main.tsx         # Application entry point & DOM mount
│   └── index.css        # Global styles & Tailwind directives
├── index.html           # HTML template & head metadata
├── vite.config.ts       # Vite bundler & Tailwind v4 plugin config
├── tsconfig.json        # Root TypeScript orchestration config
├── tsconfig.app.json    # Application TypeScript configuration
└── tsconfig.node.json   # Tooling & build script TypeScript configuration
🧪 Interactive API Playground & Docs
Landing Page: / — Modular pipeline preview, catalog grid, case study, and API console.

API Documentation: /docs — Endpoint parameters, sample request code generator (cURL, Python HTTPX, JS), and response previewer.

📄 License
Proprietary — All rights reserved © Ainga Data Labs.