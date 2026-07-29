import type { ChangeEvent } from "react";
import { cn } from "../../lib/utils";
import { Search } from "lucide-react";

type Props = {
  search: string;
  category: string;
  condition: string;
  sort: string;

  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setCondition: (value: string) => void;
  setSort: (value: string) => void;
};

export const inputPill =
  "w-full rounded-full border border-transparent bg-input px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-gold/50 focus:bg-card";
const FilterBar = ({
  search,
  category,
  condition,
  sort,
  setSearch,
  setCategory,
  setCondition,
  setSort,
}: Props) => {
  return (
    <>
      <div className="relative mt-12">
        <Search className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search by title or category"
          aria-label="Search listings"
          className={cn(inputPill, "bg-card pl-14 shadow-float")}
        />
      </div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="border rounded p-2"
      /> */}
      <div className="flex gap-3 mt-8 flex-wrap mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 flex gap-3 mt-8 flex-wrap"
        >
          <option value="">All Categories</option>
          <option value="Trading Cards">Trading Cards</option>
          <option value="Coins">Coins</option>
        </select>

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="border rounded p-2 gap-3 mt-8 "
        >
          <option value="">All Conditions</option>
          <option value="Mint">Mint</option>
          <option value="Excellent">Excellent</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded p-2  gap-3 mt-8"
        >
          <option value="">Newest</option>

          <option value="low">Price Low → High</option>

          <option value="high">Price High → Low</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
