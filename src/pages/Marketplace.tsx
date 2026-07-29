import ProductCard from "../components/marketplace/ProductCard";
import { useEffect, useState } from "react";
import FilterBar from "../components/marketplace/FilterBar";
import EmptyState from "../components/common/EmptyState";
import Loading from "../components/common/Loading";
import type { Product } from "../types/product";
import ErrorState from "../components/common/ErrorState";

const Marketplace = () => {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [condition, setCondition] = useState("");

  const [sort, setSort] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filteredProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((product) => (category ? product.category === category : true))
    .filter((product) => (condition ? product.condition === condition : true))
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      // Default: newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch("/data/products.json");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          <ErrorState message="Failed to fetch products" />;
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message="404 Page not found" />;
  }
  return (
    <>
      <header className="max-w-2xl text-left px-4 mt-5 ">
        {/* <p className="eyebrow">6,842 listings · 94 countries</p> */}
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.95] ">
          Marketplace
        </h1>
        <p className="mt-5 text-base text-muted-foreground">
          Every piece independently graded, photographed in natural light and
          shipped insured.
        </p>
      </header>

      <FilterBar
        search={search}
        category={category}
        condition={condition}
        sort={sort}
        setSearch={setSearch}
        setCategory={setCategory}
        setCondition={setCondition}
        setSort={setSort}
      />

      {filteredProducts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nothing matches yet"
          description="Try a different category or clear your search to see the full gallery."
        />
      )}
    </>
  );
};

export default Marketplace;
