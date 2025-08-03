import { Link } from "react-router-dom";
import type { Discussion } from "../lib/github";
import ReactMarkdown from "react-markdown";
import { formatDate } from "../lib/utils";

interface BlogPostPreviewProps {
  post: Discussion;
  slug: string;
}

export default function BlogPostPreview({ post, slug }: BlogPostPreviewProps) {
  return (
    <div className="post-preview post">
      <h1 className="post-title">{post.title}</h1>
      <h2 className="post-date">{formatDate(post.createdAt)}</h2>
      <ReactMarkdown>
        {post.body.slice(0, 200) + "..."}
      </ReactMarkdown>
      <Link to={`/blog/${slug}`} className="read-more-button">
        Read more
      </Link>
    </div>
  );
}
