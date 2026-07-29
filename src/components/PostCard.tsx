import type { Post } from "../types/post";
import { usePost } from "../context/PostContext";
import { Link } from "react-router-dom";
import ImageWithFallback from "./common/ImageWithFallback";
import { Bookmark, Heart } from "lucide-react";
type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const { likedPosts, savedPosts, toggleLike, toggleSave } = usePost();
  const liked = likedPosts.includes(post.id);

  const saved = savedPosts.includes(post.id);

  const likes = liked ? post.likes + 1 : post.likes;
  return (
    <>
      <Link to={`/post/${post.id}`}>
        <article className="mb-6 group break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col  gap-3">
            <ImageWithFallback
              src={post.image}
              alt={post.caption}
              className="w-full rounded-2xl aspect-3/4object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 font-semibold">
                {post.author[0]}
              </span>

              <div>
                <h3 className="font-medium">{post.username}</h3>

                <p className="text-sm text-muted-foreground">
                  {post.handle.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 text-[15px] leading-snug flex items-start flex-col gap-2">
            <p className="text-left">{post.caption}</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center text-xs">
                <Heart fill="black" /> <span>{likes}</span>
              </button>

              <button>
                <Bookmark />
              </button>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

export default PostCard;
