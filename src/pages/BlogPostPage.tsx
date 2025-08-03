import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllDiscussions, fetchDiscussionByNumber } from "../lib/github";
import type { Discussion } from "../lib/github";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "../lib/utils";
import Spinner from "../components/Spinner";
import GiscusComment from "../components/GiscusComments";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Discussion | null>(null);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      const discussions = await fetchAllDiscussions(); // this must return basic info like title & number
      const matched = discussions.find(d => slugify(d.title) === slug);
      if (!matched) return;

      const fullPost = await fetchDiscussionByNumber(matched.number);
      setPost(fullPost);
    })();
  }, [slug]);

  // Loading
  if (!post) return <Spinner/> ;

  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1 className="post-h1" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="post-h2" {...props} />
    )
  }


  return (
    <main className="page">
      <div className="post">
        <h1 className="post-title">{post.title}</h1>
        <h2 className="post-date">{post.createdAt}</h2>
        {post.createdAt !== "Blog post not found." &&
        <hr style={{height: "5px", backgroundColor: "white"}}/>
        }
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        <GiscusComment number={post.number}/>
      </div>
    </main>
  );
}
