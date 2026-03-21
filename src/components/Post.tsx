type Post = {
  title: string,
  body: string,
  date: string
}

import ReactMarkdown, { type Components } from "react-markdown";

const components: Components = {
  a: ({ href = "", className, children, ...props }) => (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[className, "post-link"].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  ),
  blockquote: ({ className, children, ...props }) => (
    <blockquote
      {...props}
      className={[className, "post-blockquote"].filter(Boolean).join(" ")}
    >
      {children}
    </blockquote>
  ),
  p: ({ className, children, ...props }) => (
    <p {...props} className={[className, "post-content"].filter(Boolean).join(" ")}>
      {children}
    </p>
  )
};

export default function Post({ title, date, body }: Post) {
  return (
    <article className="post">
      <h2 className='post-title'>{title}</h2>
      <p className="post-date">{date}</p>
      <section className="post-content">
        <ReactMarkdown components={components}>
          {body}
        </ReactMarkdown>
      </section>
    </article>
  );
}