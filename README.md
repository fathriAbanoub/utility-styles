# bob-styles 🎨

A modern, reusable CSS utility library for building responsive UI components, with built-in font management and e-commerce-ready typography.

Bob Styles provides a set of **utility classes**, **component styles**, and **font stacks** for UI, e-commerce, blogs, and code-related projects. It simplifies development and ensures consistency across your designs.

---

## Features ✨

- **Responsive Layout Utilities**: Flexbox, grid, spacing, alignment, and more.
- **Prebuilt Components**: Header sections, text blocks, and layout helpers.
- **Font Management**: Automatic Google Fonts imports with fallback detection.
- **E-commerce Typography**: Predefined classes for headings, body, price, and buttons.
- **Utility-first Design**: Quickly compose layouts without writing custom CSS.
- **SCSS-based**: Extendable and easy to maintain.

---

## Installation

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

### HTML Example

```html
<body class="ui-font">
  <header class="head">
    <div class="headerleft">
      <h1 class="font-heading">My Store</h1>
      <p class="font-body">Your favorite products</p>
    </div>
    <ul class="headerright">
      <li><span>Login</span></li>
      <li><span>Cart</span></li>
    </ul>
  </header>

  <main class="flex flex-col gap-4 p-4">
    <p class="font-body text-base">Welcome to our shop!</p>
    <button class="font-button rounded shadow transition">Shop Now</button>
  </main>
</body>
```

### Apply Font Classes

```html
<p class="ui-primary-font font-medium text-lg">UI Primary Font</p>
<p class="ecommerce-primary-font font-heading">E-commerce Heading</p>
<p class="blog-primary-font font-semibold">Blog Content</p>
<p class="code-primary-font font-normal">Code Sample</p>
```

---

## Available Utilities

- **Flex & Layout**: `.flex`, `.flex-col`, `.flex-center`, `.items-center`, `.justify-between`
- **Spacing**: `.p-1..6`, `.m-1..6`, `.gap-1..6`
- **Typography**: `.text-sm..3xl`, `.font-light..bold`
- **Borders & Rounding**: `.rounded`, `.rounded-md`, `.rounded-lg`, `.rounded-full`
- **Shadows**: `.shadow`, `.shadow-md`, `.shadow-lg`
- **Visibility**: `.hidden`, `.block`, `.inline-block`
- **Positioning**: `.relative`, `.absolute`, `.sticky`, `.top-0`, `.z-10..50`
- **Overflow & Cursor**: `.overflow-hidden`, `.cursor-pointer`, `.select-none`
- **Responsive Classes**: `.sm:hidden`, `.md:flex`, `.lg:block`, `.xl:flex`

> Full SCSS utilities are available in `src/index.scss`.

---

## Build

Bob Styles provides a simple build script:

```bash
npm run build
# or watch for development
npm run dev
```

- Compiles SCSS to `dist/index.css`.
- Copies JavaScript font detection script to `dist/js/font-detection.js`.

---

## Contributing

Contributions are welcome! Please read our Contributing Guidelines before submitting a pull request.

```

## License

MIT © 2025 [fathriAbanoub](https://github.com/fathriAbanoub)

```
