type Post = {
  title: string,
  body: string,
  date: string
}

import ReactMarkdown from 'react-markdown';

export default function Post({ title, date, body }: Post) {
  return (
    <article className="post">
      <h2 className='post-title'>{title}</h2>
      <p className="post-date">{date}</p>
      <section className="post-content">
        <ReactMarkdown
          components={{
            a: ({...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </section>
    </article>
  );
}