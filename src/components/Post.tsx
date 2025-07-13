type Post = {
  title: string,
  body: string,
  date: string
}

import ReactMarkdown from 'react-markdown';

export default function Post({ title, date, body }: Post) {
  return (
    <article className="post">
      <h2>{title}</h2>
      <p className="post-date">{date}</p>
      <div className="post-body">
        <ReactMarkdown
          components={{
            a: ({...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>
    </article>
  );
}