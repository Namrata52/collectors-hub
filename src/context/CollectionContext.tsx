import { createContext, useContext, useEffect, useState } from "react";

import type { Product } from "../types/product";

type CollectionType = {
  owned: Product[];
  wishlist: Product[];
  selling: Product[];

  addToOwned: (product: Product) => boolean;
  addToWishlist: (product: Product) => boolean;
  addToSelling: (product: Product) => boolean;

  removeOwned: (id: number) => void;
  removeWishlist: (id: number) => void;
  removeSelling: (id: number) => void;

  moveItem: (
    product: Product,
    from: "owned" | "wishlist" | "selling",
    to: "owned" | "wishlist" | "selling",
  ) => void;
};
const CollectionContext = createContext<CollectionType | null>(null);

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [owned, setOwned] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selling, setSelling] = useState<Product[]>([]);

  useEffect(() => {
    const storedSelling = localStorage.getItem("selling");

    if (storedSelling) {
      setSelling(JSON.parse(storedSelling));
    }
    const storedOwned = localStorage.getItem("owned");
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedOwned) {
      setOwned(JSON.parse(storedOwned));
    }

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("owned", JSON.stringify(owned));
  }, [owned]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("selling", JSON.stringify(selling));
  }, [selling]);

  const addToOwned = (product: Product) => {
    const exists = owned.some((item) => item.id === product.id);

    if (exists) {
      return false;
    }

    setOwned([...owned, product]);

    return true;
  };

  const addToWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      return false;
    }

    setWishlist([...wishlist, product]);

    return true;
  };

  const removeOwned = (id: number) => {
    setOwned(owned.filter((item) => item.id !== id));
  };

  const removeWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const addToSelling = (product: Product) => {
    const exists = selling.some((item) => item.id === product.id);

    if (exists) return false;

    setSelling([...selling, product]);

    return true;
  };

  const removeSelling = (id: number) => {
    setSelling(selling.filter((item) => item.id !== id));
  };
  const moveItem = (
    product: Product,
    from: "owned" | "wishlist" | "selling",
    to: "owned" | "wishlist" | "selling",
  ) => {
    if (from === to) return;

    // Remove from current collection
    if (from === "owned") removeOwned(product.id);
    if (from === "wishlist") removeWishlist(product.id);
    if (from === "selling") removeSelling(product.id);

    // Add to destination (duplicate checks already exist)
    if (to === "owned") addToOwned(product);
    if (to === "wishlist") addToWishlist(product);
    if (to === "selling") addToSelling(product);
  };

  return (
    <CollectionContext.Provider
      value={{
        owned,
        wishlist,
        selling,
        addToOwned,
        addToWishlist,
        addToSelling,
        removeOwned,
        removeWishlist,
        removeSelling,
        moveItem,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};



export const useCollection = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error("useCollection must be used inside CollectionProvider");
  }

  return context;
};
