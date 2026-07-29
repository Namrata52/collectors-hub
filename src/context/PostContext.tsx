import { createContext, useContext, useEffect, useState } from "react";

type PostContextType = {
  likedPosts: number[];
  savedPosts: number[];

  toggleLike: (id: number) => void;
  toggleSave: (id: number) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  useEffect(() => {
    const liked = localStorage.getItem("likedPosts");
    const saved = localStorage.getItem("savedPosts");

    if (liked) {
      setLikedPosts(JSON.parse(liked));
    }

    if (saved) {
      setSavedPosts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  }, [savedPosts]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSave = (id: number) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <PostContext.Provider
      value={{
        likedPosts,
        savedPosts,
        toggleLike,
        toggleSave,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used inside PostProvider");
  }

  return context;
};
