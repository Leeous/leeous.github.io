import posts from "../assets/data/blog_data.json"
import Post from "../components/Post";

export default function Blog() {
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