---

# Auto Image Upscaler
Check it out at https://upscaleimage.xyz !
This project is a web application built with Next.js that uses AI to upscale images, allowing users to transform low-resolution images into high-quality ones. It leverages modern web technologies, including **TypeScript**, **Tailwind CSS**, **Radix UI**, and **React** components, to deliver a fast, reliable, and secure user experience.

## Features

- **AI-Powered Image Upscaling**: Provides several AI models to upscale images with different styles and qualities.
- **User Authentication**: Includes secure user login and management through **PropelAuth**.
- **Dynamic Image Comparison**: Side-by-side slider view to compare before-and-after images.
- **Flexible UI**: Components built with **Tailwind CSS** and Radix UI to ensure a responsive, user-friendly interface.
- **Error Handling**: Real-time alerts and error handling for smooth user experience.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [License](#license)

## Getting Started

To get started, you need to have **Node.js** and **npm** installed. Clone the repository and follow the steps below:

```bash
git clone https://github.com/yourusername/auto-image-upscaler.git
cd auto-image-upscaler
npm install
```

### Environment Setup

The project requires specific environment variables to run. Add these variables to a `.env.local` file in the `lib` directory:

```plaintext
NEXT_PUBLIC_AUTH_URL='https://auth.upscaleimage.xyz'
```

### Running the Project

You can start the development server with:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

Here's an overview of the main directories and files:

- **`/app`**: Contains the core pages and components used in the app.
- **`/components/ui`**: Houses reusable UI components like buttons, alerts, cards, and sliders.
- **`/lib`**: Includes authentication and utility functions.
- **`/public`**: Stores static assets like images and fonts.
- **`tailwind.config.ts`**: Tailwind CSS configuration with custom color schemes and styles.

## Key Components

### 1. Image Upload and Configuration
Users can upload images and choose AI models for upscaling. This feature is handled by `CreateTask` and `ImgConfigCard` components.

### 2. Image Comparison
Users can view side-by-side comparisons of original and upscaled images using the `ImageCompareSlider` component.

### 3. Error Handling
Components such as `AlertComponent` and `UpscaleError` provide real-time feedback for any issues during image processing.

### 4. Authentication
Secure user authentication and session handling are managed by `ClientAuthProvider` with **PropelAuth** integration.

## Environment Variables

- **`NEXT_PUBLIC_AUTH_URL`**: This is the URL for the authentication provider, required for user login and security.

## Available Scripts

- **`dev`**: Runs the app in development mode.
- **`build`**: Builds the app for production.
- **`start`**: Runs the app in production mode.
- **`lint`**: Checks for linting errors using ESLint.

## Deployment

To deploy this application, you can use **Vercel** or any other hosting provider that supports Next.js.

```bash
npm run build
npm run start
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions! If you have suggestions for improvements, please fork the repository and submit a pull request.

---
