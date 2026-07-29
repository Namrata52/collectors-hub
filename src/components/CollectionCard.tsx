import type { Product } from "../types/product";
import { useCollection } from "../context/CollectionContext";
import ImageWithFallback from "./common/ImageWithFallback";

  type Props = {
    product: Product;
    collectionType: "owned" | "wishlist" | "selling";
  };
const CollectionCard = ({ product, collectionType }: Props) => {
  const { removeOwned, removeWishlist, removeSelling, moveItem } =
    useCollection();

  return (
    <>
      <div className="border rounded-lg p-4 bg-white">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-52 w-full object-cover rounded"
        />

        <h2 className="font-bold mt-3">{product.title}</h2>

        <p>{product.category}</p>

        <p>Estimated Value: ${product.price + 40}</p>
        <button
          onClick={() => {
            if (collectionType === "owned") {
              removeOwned(product.id);
            }

            if (collectionType === "wishlist") {
              removeWishlist(product.id);
            }

            if (collectionType === "selling") {
              removeSelling(product.id);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Remove
        </button>
        <select
          onChange={(e) =>
            moveItem(
              product,
              collectionType,
              e.target.value as "owned" | "wishlist" | "selling",
            )
          }
          defaultValue={collectionType}
          className="border rounded p-2 mt-3 w-full"
        >
          <option value="owned">Owned</option>
          <option value="wishlist">Wishlist</option>
          <option value="selling">Selling</option>
        </select>
      </div>
    </>
  );
};

export default CollectionCard;
