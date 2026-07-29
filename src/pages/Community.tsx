
import PostCard from "../components/PostCard";
import { useEffect,useState } from "react";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import type { Post } from "../types/post";
import { Search } from "lucide-react";
import { inputPill } from "../components/marketplace/FilterBar";
import { cn } from "../lib/utils";
const Community = () => {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filteredPosts = posts
    .filter((post) => post.caption.toLowerCase().includes(search.toLowerCase()))
    .filter((post) => (category ? post.category === category : true));
    useEffect(() => {
      const loadPosts = async () => {
        setLoading(true);

        try {
          const response = await fetch("/data/posts.json");

          if (!response.ok) {
            throw new Error("Failed to load posts.");
          }

          const data = await response.json();
          setPosts(data);
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

      loadPosts();
    }, []);
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorState message={error} />;
    }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24  sm:px-6 sm:flex-row sm:items-center sm:justify-between">
      <header className="max-w-2xl text-left">
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.95]">
          Community
        </h1>
        <p className="mt-5 text-base text-muted-foreground">
          The shelves, the reveals and the long stories behind the pieces.
        </p>
      </header>
      <div className="flex items-start mt-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 mb-6 text-left sm:w-56 "
        >
          <option value="">All Categories</option>
          <option value="Trading Cards">Trading Cards</option>
          <option value="Coins">Coins</option>
        </select>
      </div>

      <div className="relative mt-6 w-full lg:w-225 md:w-170  mb-6 sm:w-70">
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
      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          description="Try changing your search or category."
        />
      ) : (
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 *:mb-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
