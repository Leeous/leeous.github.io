type Post = {
  title: string,
  body: string,
  date: string
}

export default function Post({title, body, date}: Post) {
  return( 
    <article>
      <h1>{title}</h1>
      <h2>{date}</h2>
      <section dangerouslySetInnerHTML={{__html: body}}></section>
    </article>
  )
}