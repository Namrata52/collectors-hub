import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import type { Product } from "../types/product";
import { useCollection } from "../context/CollectionContext";
import toast from "react-hot-toast";
import ImageWithFallback from "../components/common/ImageWithFallback";
import { ArrowLeft, Heart, MapPin, Plus, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";
import Badge from "../components/common/Badge";
const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { owned, wishlist, addToOwned, addToWishlist } = useCollection();

  const { id } = useParams();
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      try {
        const response = await fetch("/data/products.json");

        if (!response.ok) {
          throw new Error("Failed to load product.");
        }

        const data: Product[] = await response.json();

        const foundProduct = data.find((product) => product.id === Number(id));

        setProduct(foundProduct || null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message="404 Page not found" />;
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The product you're looking for doesn't exist."
      />
    );
  }
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    const isOwned = owned.some((item) => item.id === product.id);
  return (
    <div className="grid md:grid-cols-2 gap-10">

      <div className="min-w-0">
        <div className="overflow-hidden rounded-4xl border border-border bg-card p-3 shadow-soft">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            // width={1024}
            // height={1280}
            className="aspect-4/5 w-full rounded-3xl object-cover "
          />
        </div>
      </div>

      <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
        <div className="flex flex-wrap gap-2">
          <Badge variant="dark">{product.category}</Badge>
          <Badge variant="gold">{product.condition}</Badge>
        </div>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1] text-left">
          {product.title}
        </h1>
        <p className="mt-4 flex products-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          {product.location}
        </p>

        <div className="mt-8 rounded-4xl border border-border bg-card p-7 shadow-soft">
          <p className="eyebrow">Asking price</p>
          <p className="mt-2 font-display text-4xl font-bold">
            ${product.price}
          </p>
          <dl className="mt-7 grid grid-cols-2 gap-y-5 border-t border-border pt-6 text-sm">
            {[
              ["Condition", product.condition],
              ["Category", product.category],
              ["Seller", product.seller],
              ["Location", product.location],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="mt-1 truncate font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 grid gap-3">
            <button
              className="flex flex-wrap gap-3 items-center justify-center"
              
              onClick={() => {
                // if (isWishlisted) return;
                const added = addToWishlist(product);

                if (added) {
                  toast.success("Added to Collection");
                } else {
                  toast.error("Already exists");
                }
              }}
            >
              <Heart
                className={cn("h-4 w-4", isWishlisted && "fill-current")}/>

             
              
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
            <button
              className="flex flex-wrap gap-3 items-center justify-center"
              onClick={() => {
                // if (isOwned) return;

                const added = addToOwned(product);

                if (added) {
                  toast.success("Added to Collection");
                } else {
                  toast.error("Already exists");
                }
              }}
            >
              <Plus className="h-4 w-4" />
              {isOwned ? "Added to Collection" : "Add to Collection"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-left">
          <h2 className="text-xl font-bold">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
