import { useCollection } from "../context/CollectionContext";
import { useState } from "react";
import CollectionCard from "../components/CollectionCard";
import EmptyState from "../components/common/EmptyState";
import { cn } from "../lib/utils";
import { Search } from "lucide-react";
import { inputPill } from "../components/marketplace/FilterBar";

const Collection = () => {
  const { owned, wishlist, selling } = useCollection();
  const [activeTab, setActiveTab] = useState<"owned" | "wishlist" | "selling">(
    "owned",
  );
  const [search, setSearch] = useState("");
  const currentItems =
    activeTab === "owned"
      ? owned
      : activeTab === "wishlist"
        ? wishlist
        : selling;
  const filteredItems = currentItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <section className="flex flex-col items-center">
        <header>
          <h1 className=" mt-5 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.95] ">
            My collection
          </h1>
        </header>

        <div className="relative mt-6 w-full lg:w-200 md:w-160 sm:w-100 mb-6 ">
          <Search className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or category"
            aria-label="Search listings"
            className={cn(inputPill, "bg-card pl-14 shadow-float")}
          />
        </div>

        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab("owned")}
            className={cn(
              "rounded-full border px-5 py-2 transition-all duration-300",
              activeTab === "owned"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
            )}
          >
            Owned
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={cn(
              "rounded-full border px-5 py-2 transition-all duration-300",
              activeTab === "wishlist"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
            )}
          >
            Wishlist
          </button>

          <button
            onClick={() => setActiveTab("selling")}
            className={cn(
              "rounded-full border px-5 py-2 transition-all duration-300",
              activeTab === "selling"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
            )}
          >
            Selling
          </button>
        </div>
      </section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((product) => (
          <CollectionCard
            key={product.id}
            product={product}
            collectionType={activeTab}
          />
        ))}
      </div>
      {currentItems.length === 0 && (
        <div className="text-center py-20">
          <EmptyState
            title="No items yet"
            description="Browse Marketplace to add collectibles."
          />
          {/* <h2 className="text-2xl">No items yet</h2>

          <p>Browse Marketplace to add collectibles.</p> */}
        </div>
      )}
    </>
  );
};

export default Collection;
