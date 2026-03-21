import { Link } from "react-router-dom";
import type { Discussion } from "../lib/github/api";
import ReactMarkdown, { type Components } from "react-markdown";
import { formatDate } from "../lib/utils";

interface BlogPostPreviewProps {
  post: Discussion;
  slug: string;
}

const components: Components = {
  p: ({ className, ...props }) => (
    <p {...props} className={[className, "post-content"].filter(Boolean).join(" ")} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote {...props} className={[className, "post-blockquote"].filter(Boolean).join(" ")} />
  ),
  a: ({ href = "", className, children, ...props }) => {
    const mergedClassName = [className, href.startsWith("/") ? "read-more" : ""]
      .filter(Boolean)
      .join(" ");

    if (href.startsWith("/")) {
      return (
        <Link to={href} className={mergedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} className={mergedClassName}>
        {children}
      </a>
    );
  }
};

export default function BlogPostPreview({ post, slug }: BlogPostPreviewProps) {
  return (
    <div className="post-preview post">
      <h1 className="post-title">
        <Link to={`/blog/${slug}`}>
          {post.title}
        </Link>
      </h1>
      <h2 className="post-date">{formatDate(post.createdAt)}</h2>
      <ReactMarkdown components={components}>
        {`${post.body.slice(0, 300)}... [Read more](/blog/${slug})`}
      </ReactMarkdown>
      
    </div>
  );
}
