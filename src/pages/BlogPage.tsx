import posts from "../assets/data/blog_data.json"
import Post from "../components/Post";
import { useLayoutEffect } from "react";

export default function BlogPage() {
  // Ensure user is scrolled to the top of screen if using <Link> to get to blog
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <main className='blog-page page'>
      {posts.map((post) => {
        return(
          <Post key={post.title} title={post.title} date={post.published_date} body={post.content}/>
        );
      }).reverse()}
    </main>
  )
}