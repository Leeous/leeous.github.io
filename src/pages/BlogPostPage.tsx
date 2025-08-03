import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllDiscussions, fetchDiscussionByNumber } from "../lib/github";
import type { Discussion } from "../lib/github";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, slugify } from "../lib/utils";
import Spinner from "../components/Spinner";
import GiscusComment from "../components/GiscusComments";
import { Helmet } from "react-helmet";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Discussion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    setPost(null);

    (async () => {
      try {
        const discussions = await fetchAllDiscussions(); 
        const matched = discussions.find(d => slugify(d.title) === slug);

        if (!matched) {
          setError("Post not found (404).");
          setLoading(false);
          return;
        };

        const fullPost = await fetchDiscussionByNumber(matched.number);
        if (!fullPost) {
          setError("Post not found (404).")
          setLoading(false);
          return;
        }

        setPost(fullPost);
      } catch ( error ) {
        setError(`Failed to load post: ${error}`);
        setLoading(false);

      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Loading
  if (loading) return <Spinner />;

  // On error
  if (error) return <main className="page"><p style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</p></main>;

  if (!post) return null; // fallback, should rarely happen

  const components: Components = {
    h1: ({ ...props }) => <h1 className="post-h1" {...props} />,
    h2: ({ ...props }) => <h2 className="post-h2" {...props} />,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | My Blog</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.body.slice(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.leeous.com/blog/${slug}`} />
        {/* <meta property="og:image" content={post.image || "https://www.leeous.com/default-og-image.jpg"} /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.body.slice(0, 160)} />
        {/* <meta name="twitter:image" content={post.image || "https://www.leeous.com/default-twitter-image.jpg"} /> */}
      </Helmet>

      <main className="page">
        <div className="post">
          <h1 className="post-title">{post.title}</h1>
          <h2 className="post-date">{formatDate(post.createdAt)}</h2>
          <hr style={{ height: "5px", backgroundColor: "white" }} />
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {post.body}
          </ReactMarkdown>
          <hr style={{ height: "2.5px", backgroundColor: "white" }} />
          <GiscusComment number={post.number} />
        </div>
      </main>
    </>
  );
}
