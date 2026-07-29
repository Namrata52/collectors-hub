# CollectorsHub

A responsive React + TypeScript web application built as part of a React Web Developer Internship Assignment.

CollectorsHub is a platform where collectors can browse collectible items in a marketplace, explore community posts, and organize their personal collections through an intuitive and modern user interface.

---

## Live Demo

**Live Website:** https://your-vercel-link.vercel.app

## GitHub Repository

**Repository:** https://github.com/Namrata52/collectors-hub

---

## Features

### Marketplace

Browse collectible items available for sale.

#### Implemented Features

- Browse marketplace listings
- Search products by title
- Filter by category
- Filter by condition
- Sort products by:
  - Price (Low to High)
  - Price (High to Low)
  - Newest
- Product detail page
- Add items to Wishlist
- Add items to Owned Collection
- Prevent duplicate additions to collections
- Display product category, condition, seller, location and price
- Responsive product cards
- Image fallback for missing images

---

### Community Feed

Discover collectibles shared by the community.

#### Implemented Features

- Browse community posts
- Search posts
- Filter posts by category
- Masonry/Pinterest-style responsive layout
- Post detail page
- Like posts
- Save posts
- Display author information
- Display likes and comments
- Responsive community cards

---

### My Collection

Manage your personal collectibles.

#### Collection Types

- Owned
- Wishlist

#### Implemented Features

- View all saved items
- Search collection
- Filter by collection type
- Sort by:
  - Date Added
  - Estimated Value
- Move items between Wishlist and Owned
- Remove items from collections
- Prevent duplicate items
- Estimated values (mock data)

---

## User Experience Features

- Responsive design for:
  - Mobile
  - Tablet
  - Desktop
- Loading state while fetching data
- Error state for failed requests
- Empty states when no results are available
- Helpful search and filter feedback
- Clean reusable UI components
- Hover animations
- Smooth image transitions
- Responsive navigation with mobile menu
- Local state management using React Context API
- Local Storage persistence

---

## Edge Cases Handled

- Duplicate products cannot be added to the same collection.
- Loading indicator displayed while data is being fetched.
- Error message displayed if data loading fails.
- Empty states for:
  - No products found
  - No posts found
  - Empty collections
- Missing images handled gracefully using a fallback component.
- Filters and search work together correctly.
- Like and Save interactions update instantly.

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- React Router DOM
- Tailwind CSS
- Vite

### State Management

- React Context API

### Icons

- Lucide React

### Data

- Mock JSON files

---

## Project Structure

```
src
│
├── components
│   ├── common
│   ├── marketplace
│   └── collection
│
├── context
│
├── pages
│
├── data
│
├── types
│
├── hooks
│
└── utils
```

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/yourusername/collectors-hub.git
```

### Navigate into the project

```bash
cd collectors-hub
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Assumptions Made

- Authentication is not required.
- Marketplace and community data are loaded from local mock JSON files.
- Estimated collection values are mock values.
- Wishlist and Owned collections are managed using React Context API.
- Images are loaded from public URLs with a fallback component for missing images.
- Data persistence is limited to the cu session.

---

## Libraries Used

| Library | Purpose |
|----------|---------|
| React | UI Library |
| TypeScript | Type Safety |
| React Router DOM | Client-side Routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Vite | Development & Build Tool |

---

## Additional Improvements

Beyond the assignment requirements, the following enhancements were implemented:

- Modern responsive UI inspired by contemporary marketplace platforms.
- Reusable component architecture.
- Masonry-style community feed.
- Responsive navigation with hamburger menu.
- Custom badges for categories and conditions.
- Image fallback component.
- Modular folder structure for scalability.
- Utility helper functions.
- Consistent typography and spacing.
- Interactive hover effects and transitions.

---

## Future Improvements

- Selling collection support
- Infinite scrolling
- Backend integration
- User authentication
- Comments functionality
- Pagination
- Real-time updates

---

## Author

**Namrata Lilaria**

Built as part of the React Web Developer Internship Assignment.
