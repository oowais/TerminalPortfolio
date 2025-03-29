# Terminal Portfolio

A modern, interactive terminal-themed portfolio website that simulates a command-line interface. Built with Vue 3 and TypeScript, this portfolio showcases my projects and skills in a unique, engaging way.

## 🌟 Features

- **Terminal Interface**: Authentic terminal-like experience with:
  - Command history navigation
  - Tab completion
  - Custom command parsing
  - Typing effect animations
- **Interactive Commands**:
  - `help`: List all available commands
  - `about`: Display information about me
  - `projects`: View my project showcase
  - `skills`: List technical skills
  - `contact`: Show contact information
  - `clear`: Clear the terminal screen
- **Modern Tech Stack**: Built with Vue 3, TypeScript, and Vite
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Terminal-inspired dark theme for better readability

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS with custom terminal theme
- **Icons**: Font Awesome
- **Font**: JetBrains Mono (perfect for terminal aesthetics)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/oowais/TerminalProtfolio.git
cd TerminalProtfolio
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The development server will start with hot module replacement enabled.

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
TerminalProtfolio/
├── src/                    # Source files
│   ├── components/        # Vue components
│   ├── composables/       # Vue composables
│   ├── assets/           # Static assets
│   ├── data/             # Portfolio data
│   └── stores/           # State management
├── public/                # Public static assets
│   └── favicon/          # Multi-resolution favicons
├── index.html            # Entry HTML file
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## 🔧 Configuration

The portfolio content can be customized by modifying the following files:

- `src/data/portfolio.ts`: Personal information and content
- `src/data/commands.ts`: Available terminal commands
- `src/assets/styles/terminal.css`: Terminal appearance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Owais

---

Made with ❤️ using Vue 3 and TypeScript
