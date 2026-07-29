import type { Post } from "../types/post";

export const posts: Post[] = [
  {
    id: 1,
    username: "Alex",
    avatar: "https://i.pravatar.cc/100?ImageWithFallback=1",
    image: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300",
    caption: "Finally found this amazing Charizard card!",
    likes: 120,
    comments: 24,
    category: "Trading Cards",
  },
  {
    id: 2,
    username: "Sarah",
    avatar: "https://i.pravatar.cc/100?ImageWithFallback=2",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247",
    caption: "My latest vintage coin collection.",
    likes: 80,
    comments: 15,
    category: "Coins",
  },
];
