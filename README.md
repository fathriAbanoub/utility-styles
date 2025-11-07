# bob-styles 🎨

[![NPM version](https://img.shields.io/npm/v/bob-styles.svg)](https://www.npmjs.com/package/bob-styles)
[![License](https://img.shields.io/npm/l/bob-styles.svg)](LICENSE)

**A modern, reusable CSS utility library for building responsive UI components, with a powerful font management system and e-commerce-ready typography.**

Bob Styles provides a complete toolkit for developers, featuring a utility-first workflow, pre-built components, and an intelligent font system to streamline your design process and ensure consistency.

---

## ✨ Key Features

- **🤖 Smart Font System**: Four curated font categories (UI, E-commerce, Blog, Code) with automatic Google Fonts integration and fallback detection.
- **🧩 Component-First Architecture**: A collection of pre-built components and a system that promotes modular and reusable design.
- **⚡ Utility-First Workflow**: A comprehensive set of utility classes for rapid development, inspired by modern CSS frameworks.
- **🎨 CSS Custom Properties**: Automatically generates CSS variables for easy theming and consistency.
- **🚀 Performance Optimized**: Built-in tools for dead code elimination, critical CSS extraction, and bundle size analysis.
- **SCSS Based**: Fully customizable and extendable using the power of SASS.

---

## 🚀 Installation

### via npm
Install the package in your project directory:
```bash
npm install bob-styles
```

or via CDN:

```html
<link rel="stylesheet" href="path/to/bob-styles/dist/index.css" />
<script src="path/to/bob-styles/dist/js/font-detection.js"></script>
```

---

## Usage


### Import in SCSS

```scss
@import "bob-styles/src/index.scss";
```

### via CDN
For quick demos or prototyping, you can use the compiled files directly.
```html
<link rel="stylesheet" href="https://unpkg.com/bob-styles/dist/index.css" />
<script src="https://unpkg.com/bob-styles/dist/js/font-detection.js"></script>
```

---

##  Quick Start

Here is a basic example of a responsive header using `bob-styles` utility classes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bob Styles Demo</title>
    <link rel="stylesheet" href="dist/index.css">
    <script src="dist/js/font-detection.js"></script>
</head>
<body>

    <nav class="flex justify-between items-center p-4 shadow-md">
      <div class="font-bold text-xl ui-primary-font">MyLogo</div>
      <ul class="flex gap-4">
        <li><a href="#" class="ui-secondary-font">Home</a></li>
        <li><a href="#" class="ui-secondary-font">About</a></li>
        <li><a href="#" class="ui-secondary-font">Contact</a></li>
      </ul>
    </nav>

    <main class="p-6">
        <h1 class="text-3xl font-bold blog-primary-font">Welcome to Bob Styles</h1>
        <p class="mt-2 text-lg blog-secondary-font">
            This is a demo of the powerful features available in the library.
        </p>
    </main>

</body>
</html>
```

---

## 📚 Documentation

For a deep dive into the library's features, please refer to our comprehensive documentation in the **[Project Wiki](https://github.com/fathriAbanoub/utility-styles/wiki)**.

- **[Font System](https://github.com/fathriAbanoub/utility-styles/wiki/Font-System)**: Detailed guide on the font categories and typography classes.
- **[Utility Classes](https://github.com/fathriAbanoub/utility-styles/wiki/Utility-Classes)**: A complete reference for all available utility classes.
- **[Components](https://github.com/fathriAbanoub/utility-styles/wiki/Components)**: Examples and usage of pre-built components.

---

## 🛠️ Building from Source

If you want to customize the library or contribute, you can build it from the source files.

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the build process:**
    ```bash
    npm run build
    ```
    This will compile all `.scss` files into `dist/index.css` and copy JavaScript files to `dist/js`.

3.  **Watch for changes (development):**
    ```bash
    npm run dev
    ```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.