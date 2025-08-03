import { useEffect, useState } from "react";
import { fetchDiscussions } from "../lib/github";
import type { Discussion } from "../lib/github";
import BlogPostPreview from "../components/BlogPostPreview";
import { slugify } from "../lib/utils";
import Spinner from "../components/Spinner";

export default function BlogPage() {
  const [posts, setPosts] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDiscussions().then(setPosts).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner/>

  return (
    <main className="page">
      {posts.length !== 0 &&
      posts.map((post) => (
        <BlogPostPreview
          key={post.number}
          post={post}
          slug={post.title !== undefined ? slugify(post.title) : ""}
        />
       ))}
      {posts.length === 0 &&
        <p>No posts found.</p>
      }
    </main>
  );
}
