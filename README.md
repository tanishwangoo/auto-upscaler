# Auto Image Upscaler

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-beta-yellow)

A modern web application for AI-powered image upscaling, providing high-quality image enhancement using various AI models.

## 🌟 Features

- **Multiple AI Models Support**
  - General Photo (Ultrasharp)
  - Real-ESRGAN (x4plus & x4fast)
  - Ultramix Balanced
  - Remacri
  - Digital Art Specialized Models

- **Advanced Image Processing**
  - Customizable scaling strength (1x-5x)
  - Real-time image comparison
  - Support for multiple image formats (JPEG, PNG, WebP)

- **User Management**
  - Secure authentication via PropelAuth
  - Personal image dashboard
  - Image history tracking

- **Interactive UI**
  - Drag-and-drop image upload
  - Real-time preview
  - Before/After comparison slider
  - Responsive design

## 🚀 Installation

### Prerequisites

- Node.js (Latest LTS version)
- NPM or Yarn
- PropelAuth account

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd autoupscaler-ui
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_AUTH_URL='your-propelauth-url'
```

4. Start the development server:
```bash
npm run dev
```

## 💻 Usage

1. **Authentication**
   - Log in using PropelAuth credentials
   - Access your personal dashboard

2. **Upscaling Images**
   - Upload an image from the dashboard
   - Select an AI model
   - Adjust scaling strength
   - Process and download the enhanced image

3. **Managing Images**
   - View upscaling history
   - Compare original and enhanced versions
   - Download or delete processed images

## 🔧 Technology Stack

- **Frontend Framework**: Next.js 14
- **UI Components**: 
  - Shadcn UI
  - Tailwind CSS
  - Radix UI
- **Authentication**: PropelAuth
- **Image Processing**: Custom backend API
- **State Management**: React Hooks
- **Styling**: TailwindCSS with custom configurations

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── create-task/     # Image upload functionality
│   ├── dashboard/       # User dashboard
│   ├── img-config/      # Image configuration
│   └── job-result/      # Processing results
├── components/          # Reusable UI components
│   └── ui/             # Shadcn UI components
├── lib/                 # Utility functions and auth
└── public/             # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain component modularity
- Write meaningful commit messages
- Update documentation as needed

## 🔜 Future Improvements

- [ ] Batch processing support
- [ ] Additional AI models integration
- [ ] Advanced image editing features
- [ ] Mobile app development
- [ ] API rate limiting and optimization
- [ ] Enhanced error handling
- [ ] Offline processing capabilities

## ⚠️ Requirements

- Image size limit: ~10MB
- Supported formats: JPEG, PNG, WebP
- Modern browser with JavaScript enabled
- Stable internet connection

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links
https://www.upscaleimage.xyz
