import { useParams, Link } from "react-router-dom";
import ImageWithFallback from "../components/common/ImageWithFallback";
import { usePost } from "../context/PostContext";
import { useEffect, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import type { Post } from "../types/post";
import { ArrowLeft, Bookmark, Heart, MessageCircle } from "lucide-react";
import { cn } from "../lib/utils";

const PostDetails = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  // const post = posts.find((item) => item.id === Number(id));
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      try {
        const response = await fetch("/data/posts.json");

        if (!response.ok) {
          throw new Error("Failed to load post.");
        }

        const data = await response.json();

        const foundPost = data.find((item: Post) => item.id === Number(id));

        setPost(foundPost || null);
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

    loadPost();
  }, [id]);

  if (!post) {
    return (
      <div className="text-center mt-10">
        <EmptyState title="Post not found" description="Try another search." />
        {/* <h2 className="text-2xl font-bold">Post not found</h2> */}

        <Link
          to="/community"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Back to Community
        </Link>
      </div>
    );
  }

    const { likedPosts, savedPosts, toggleLike, toggleSave } = usePost();

    const liked = likedPosts.includes(post.id);

    const saved = savedPosts.includes(post.id);

    const likes = liked ? post.likes + 1 : post.likes;

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorState message="404 Page not found" />;
    }

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <Link
        to="/community"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to community
      </Link>

      <header className="mt-10 text-center">
        <p className="eyebrow">Collector story</p>
        <h1 className="mx-auto mt-5 max-w-2xl text-[clamp(1.9rem,5vw,3.25rem)] font-bold leading-[1.03]">
          {post.caption}
        </h1>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft font-display text-sm font-bold text-charcoal">
            {post.author[0]}
          </span>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium">{post.author}</p>
            <p className="truncate text-xs text-muted-foreground">
              {post.handle}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-12 overflow-hidden rounded-4xl border border-border bg-card p-3 shadow-soft">
        <img
          src={post.image}
          alt={post.caption}
          width={1024}
          height={1280}
          className="aspect-4/3 w-full rounded-3xl object-cover"
        />
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-charcoal">
        {post.body}
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => toggleLike(post.id)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm transition-all hover:-translate-y-0.5"
        >
          <Heart className={cn("h-4 w-4", liked && "fill-gold text-gold")} />
          {(post.likes + (liked ? 1 : 0)).toLocaleString()}
        </button>
        <button
          type="button"
          onClick={() => toggleSave(post.id)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm transition-all hover:-translate-y-0.5"
        >
          <Bookmark className={cn("h-4 w-4", saved && "fill-gold text-gold")} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <MessageCircle className="h-5 w-5" /> Comments ({post.comments.length}
          )
        </h2>
        <ul className="mt-6 grid gap-4">
          {post.comments.map((c: { author: string; text: string }) => (
            <li
              key={c.author}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <p className="text-sm font-medium">{c.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
    // <div className="max-w-5xl mx-auto py-10">
    //   <Link to="/community" className="text-blue-600 hover:underline">
    //     ← Back
    //   </Link>

    //   <div className="grid md:grid-cols-2 gap-10 mt-6">
    //     {/* Image */}

    //     <ImageWithFallback
    //       src={post.image}
    //       alt={post.caption}
    //       className="w-full rounded-lg shadow-lg object-cover"
    //     />

    //     {/* Details */}

    //     <div>
    //       <div className="flex gap-4 mb-6">
    //         <ImageWithFallback
    //           src={post.avatar}
    //           alt={post.username}
    //           className="w-14 h-14 rounded-full"
    //         />

    //         <div>
    //           <h2 className="text-2xl font-bold">{post.username}</h2>

    //           <p className="text-gray-500">Community Member</p>
    //         </div>
    //       </div>

    //       <h3 className="text-xl font-semibold mb-4">Caption</h3>

    //       <p className="mb-6">{post.caption}</p>

    //       <div className="space-y-3">
    //         <p>
    //           <strong>Category:</strong> {post.category}
    //         </p>

    //         <p>
    //           <strong>Likes:</strong> {post.likes}
    //         </p>

    //         <p>
    //           <strong>Comments:</strong> {post.comments.length}
    //         </p>
    //         <div className="flex gap-4 mt-8">
    //           <button
    //             onClick={() => toggleLike(post.id)}
    //             className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
    //           >
    //             {liked ? "❤️ Liked" : "🤍 Like"}
    //           </button>

    //           <button
    //             onClick={() => toggleSave(post.id)}
    //             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
    //           >
    //             {saved ? "🔖 Saved" : "🔖 Save"}
    //           </button>
    //         </div>
    //         <ul className="space-y-4">
    //           {post.comments.map((comment) => (
    //             <li key={comment.id}>
    //               <div className="flex gap-3">
    //                 <img src={comment.avatar} />

    //                 <div>
    //                   <h4>{comment.author}</h4>
    //                   <p>{comment.handle}</p>

    //                   <p>{comment.text}</p>
    //                 </div>
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostDetails;
