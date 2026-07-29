import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import ImageWithFallback from "../common/ImageWithFallback";
import { Heart, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import Badge from "../common/Badge";
import { useCollection } from "../../context/CollectionContext";
type Props = {
  product: Product;
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
const ProductCard = ({ product }: Props) => {
  const entries = useCollection();
  
  return (
    <div>
      <article className="lift group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="relative m-3 overflow-hidden rounded-2xl bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            // width={1024}
            // height={1280}
            className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge variant="gold" >{product.category}</Badge>
            <Badge  variant="dark">{product.condition}</Badge>
          </div>
          {/* <button
            type="button"
            
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-card/85 shadow-soft backdrop-blur transition-transform hover:scale-110"
          >
            <Heart
              className={cn(
                "h-4 w-4",
               
              )}
            />
          </button> */}
        </div>

        <div className="flex flex-1 flex-col gap-4 px-5 pb-5 text-left">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold">{product.title}</h3>
            <p className="mt-1 flex items-center  gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {product.location} · {product.seller}
              </span>
            </p>
          </div>
          <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="min-w-0 truncate font-display text-xl font-bold">
              {formatPrice(product.price)}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="shrink-0 rounded-full border border-primary px-4 py-2 font-display text-xs font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
      {/* <ImageWithFallback
        src={product.image}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold">{product.title}</h2>

        <p>{product.category}</p>

        <p>{product.condition}</p>

        <p className="font-bold">£{product.price}</p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          View Details
        </button>
        <Link
          to={`/product/${product.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block mt-4"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default ProductCard;
