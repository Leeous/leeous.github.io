import React, { useEffect, useState } from "react";
import { fetchAllDiscussions, fetchDiscussionByNumber, fetchReadme } from "../lib/github";
import type { Discussion } from "../lib/github";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import Spinner from "../components/Spinner";
import GiscusComment from "../components/GiscusComments";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";

export default function ProjectPage() {
  const { slug } = useParams<{slug: string}>();
  const [project, setProject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    setProject(null);

    console.log(slug);

    (async () => {
      try {
        const projectData = await fetchReadme(slug); 
        setProject(projectData)
      } catch ( error ) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.")
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);


  // Loading
  if (loading) return <Spinner />;

  // // On error
  if (error) return <main className="page"><p style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</p></main>;

  if (!project) return null; // fallback, should rarely happen

  const components: Components = {
    h1: ({ ...props }) => <h1 className="post-h1" {...props} />,
    h2: ({ ...props }) => <h2 className="post-h2" {...props} />,
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>
  };

  return (
    <>
      {/* <Helmet>
        <title>{post.title} | Leeous</title>
        <meta property="og:title" content={post.title + " | Leeous"} />
        <meta property="og:description" content={removeMd(post.body.slice(0, 200)) + "..."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.leeous.com/blog/${slug}`} />
        <meta property="og:image" content={"https://www.leeous.com/default-image.png"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title + " | Leeous"} />
        <meta name="twitter:description" content={removeMd(post.body.slice(0, 200)) + "..."} />
        <meta name="twitter:image" content={"https://www.leeous.com/default-image.png"} />
      </Helmet>
      */}
      
      <main className="page">
        <div className="post">
          <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
            {project}
          </ReactMarkdown>
        </div>
      </main> 
    </>
  );
}
