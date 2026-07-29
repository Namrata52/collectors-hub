import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import ImageWithFallback from "../common/ImageWithFallback";
import { MapPin } from "lucide-react";
import Badge from "../common/Badge";
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
 
  
  return (
    <div>
      <article className="lift group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="relative m-3 overflow-hidden rounded-2xl bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            
            className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge variant="gold" >{product.category}</Badge>
            <Badge  variant="dark">{product.condition}</Badge>
          </div>
          
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
      
    </div>
  );
};

export default ProductCard;
