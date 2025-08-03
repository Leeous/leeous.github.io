import { Link } from "react-router-dom";
import type { Discussion } from "../lib/github";
import ReactMarkdown from "react-markdown";
import { formatDate } from "../lib/utils";

interface BlogPostPreviewProps {
  post: Discussion;
  slug: string;
}

const components: Components = {
  h1: ({ ...props }) => <h1 className="post-h1" {...props} />,
  h2: ({ ...props }) => <h2 className="post-h2" {...props} />,
  a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>
};

export default function BlogPostPreview({ post, slug }: BlogPostPreviewProps) {
  return (
    <div className="post-preview post">
      <h1 className="post-title">{post.title}</h1>
      <h2 className="post-date">{formatDate(post.createdAt)}</h2>
      <ReactMarkdown components={components}>
        {post.body.slice(0, 200) + "..."}
      </ReactMarkdown>
      <Link to={`/blog/${slug}`} className="read-more-button">
        Read more
      </Link>
    </div>
  );
}
