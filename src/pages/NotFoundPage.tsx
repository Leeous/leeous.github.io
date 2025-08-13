import { Helmet } from "react-helmet"

export default function NotFoundPage() {
  return(
    <>
      <Helmet>
        <title>Not found (404) | Leeous</title>
      </Helmet>
      <main className="page">
        <h4>Not found (404)</h4>
      </main>
    </>
  )
}