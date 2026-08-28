# Campus Marketplace

A student-to-student campus marketplace built with React, Vite, TypeScript, and Tailwind CSS. Students can discover affordable items nearby, connect with sellers, and keep useful things in circulation on campus.

## Features

- Animated landing page with floating marketplace listing cards.
- Marketplace feed with sample listings for books, electronics, hostel essentials, furniture, cycles, and more.
- Listing filters for all items, nearby items, items under INR 500, books, electronics, and hostel items.
- Interactive category cards with hover states.
- Search interface with example item suggestions.
- Interactive campus map with item pins and nearby listing details.
- Seller profiles showing course, year, rating, and items sold.
- “How it works” section covering listing, discovery, connecting, buying or selling, and reuse.
- Responsive layout for desktop and mobile screens.

## Requirements

- Node.js 18 or newer
- npm or pnpm

## Run Locally

1. Open a terminal in the project directory:

   ```powershell
   cd "f:\hackl 1"
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

   Or, with pnpm:

   ```powershell
   pnpm install
   ```

3. Start the development server:

   ```powershell
   npm run dev
   ```

   Or:

   ```powershell
   pnpm dev
   ```

4. Open the local URL printed by Vite. The configured server normally runs at:

   ```text
   http://localhost:8443
   ```

Use `npm run dev` or `pnpm dev`; `npm dev` is not a valid npm script command.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format the source files with oxfmt |

The equivalent pnpm commands are also supported.

## Project Structure

- `src/App.tsx` - Main application and marketplace UI
- `src/index.css` - Global styles and Tailwind CSS entrypoint
- `src/main.tsx` - React application entrypoint
- `index.html` - Vite HTML shell
- `vite.config.ts` - Vite and Tailwind configuration

## Environment Variables

This demo does not require environment variables. Keep API keys and other secrets out of source control. Local environment files such as `.env` and `.env.local` are ignored by Git.
