import { Link } from "react-router-dom";
import type { Discussion } from "../lib/github";
import ReactMarkdown from "react-markdown";

interface BlogPostPreviewProps {
  post: Discussion;
  slug: string;
}

export default function BlogPostPreview({ post, slug }: BlogPostPreviewProps) {
  console.log(post)
  return (
    <div className="post-preview">
      <h1>{post.title}</h1>
      <h2>{post.createdAt}</h2>
      <ReactMarkdown>
        {post.body.slice(0, 300) + "..."}
      </ReactMarkdown>
      <Link to={`/blog/${slug}`} className="read-more-button">
        Read more
      </Link>
    </div>
  );
}
