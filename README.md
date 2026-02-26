# Classified-ads-website - Modern Classified Ads Platform

Classified-ads-website is a premium, fully responsive, and feature-rich static website template designed for classified ads platforms, marketplaces, and directory listings. It features a modern UI with built-in Light/Dark modes, RTL support, and interactive dashboards for both users and administrators.

## 🚀 Features

*   **Modern & Premium Design**: Clean aesthetics with glassmorphism effects, smooth gradients, and micro-interactions.
*   **Theme System**: Fully integrated Dark & Light mode toggle with persistent user preference.
*   **Localization Support**: Native RTL (Right-to-Left) support for languages like Arabic and Hebrew, toggleable via a UI button.
*   **Responsive Layout**: Mobile-first design that adapts perfectly to desktops, tablets, and mobile devices.
*   **Interactive Dashboards**:
    *   **User Dashboard**: Manage listings, view earnings, chat interface, and settings.
    *   **Admin Dashboard**: comprehensive analytics, user management, and moderation tools.
*   **Data Visualization**: Integrated ApexCharts for earnings, user activity, and performance metrics.
*   **Dynamic Components**: Interactive maps, animated counters, sliders, and modal popups.

## 🛠️ Tech Stack

*   **HTML5**: Semantic and accessible markup.
*   **CSS3**: Custom styles + **Tailwind CSS** (via CDN v3.4) for utility-first styling.
*   **JavaScript (Vanilla)**: No heavy frameworks, ensuring fast load times and easy customization.
*   **Libraries**:
    *   [Tailwind CSS](https://tailwindcss.com/) (Styling)
    *   [ApexCharts](https://apexcharts.com/) (Data Visualization)
    *   [Lucide Icons](https://lucide.dev/) (Scalable Vector Icons)
    *   [Google Fonts](https://fonts.google.com/) (Inter & Outfit fonts)

## 📂 Project Structure

```text
classified-ads-website/
├── Assets/                 # Images and static assets
├── 404.html               # Custom Error Page
├── about.html             # About Us page
├── admin_dashboard.html   # Admin Control Panel
├── contact.html           # Contact Support page with regional maps
├── index.html             # Homepage Version 1 (Hero Search Focus)
├── index2.html            # Homepage Version 2 (Modern Grid Layout)
├── login.html             # Authentication (Login/Register) page
├── main.js                # Core logic (Animations, interactions, form handling)
├── pricing-booking.html   # Pricing plans and booking flow
├── rtltoggle.js           # Logic for handling RTL/LTR direction switching
├── services.html          # Our Services page
├── style.css              # Custom overrides and animations
└── user_dashboard.html    # User Dashboard (Wallet, Listings, Chats)
```

## ⚡ Quick Start

Since this is a static website, no build process or server installation is required.

1.  **Clone or Download** the repository.
2.  **Open** the project folder.
3.  **Launch** `index.html` or `index2.html` directly in your web browser.

> **Tip:** For the best development experience, use the "Live Server" extension in VS Code to see changes instantly.

## 🎨 Customization

### Changing Colors
The site primarily uses Tailwind's color palette (Indigo, Slate, Rose, Emerald). You can customize the look by:
1.  Modifying the `colors` object in the `<script>` sections of the HTML files (for Charts).
2.  Updating the Tailwind class names in the HTML (e.g., changing `bg-indigo-600` to `bg-blue-600`).
3.  Editing custom styles in `style.css`.

### Adding/Removing Pages
*   To add a link to the navigation, update the `<nav>` section in all HTML files.
*   The `main.js` file contains shared logic; ensure it is included in any new page you create.

## 📱 Dashboards

### User Dashboard (`user_dashboard.html`)
*   **Overview**: Quick stats on views and inquiries.
*   **My Listings**: Manage active, pending, and sold items.
*   **Wallet**: View balance and transaction history.
*   **Messages**: fully styled chat interface.

### Admin Dashboard (`admin_dashboard.html`)
*   **Analytics**: Comprehensive charts for traffic and revenue.
*   **User Management**: Tables for managing registered users.
*   **Moderation**: Tools to approve or reject listings.

## 📄 License

This project is open-source and available for personal and commercial use. Using standard MIT License.
