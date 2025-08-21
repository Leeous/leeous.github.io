// components/GiscusComment.tsx
import Giscus from "@giscus/react";

export default function GiscusComments({ projectName, number }: { number?: number, projectName?: string }) {

  // return (
  //   <Giscus
  //     id="comments"
  //     repo="Leeous/leeous.github.io"
  //     repoId="MDEwOlJlcG9zaXRvcnkxODMyODkyMzg"
  //     category="Blog Posts"
  //     categoryId="DIC_kwDOCuzFls4CtgKV"
  //     mapping="number"
  //     term={String(number)}
  //     reactionsEnabled="1"
  //     emitMetadata="0"
  //     inputPosition="bottom"
  //     theme="custom"
  //     lang="en"
  //     loading="lazy"
  //   />
  // );

  return (
    <Giscus
      id="comments"
      repo="Leeous/leeous.github.io"
      repoId="MDEwOlJlcG9zaXRvcnkxODMyODkyMzg"
      category={number ? "Blog Posts" : "Project Discussions"}
      categoryId={number ? "DIC_kwDOCuzFls4CtgKV" : "DIC_kwDOCuzFls4CuXEP"}
      mapping={number ? "number" : "specific"}
      term={number ? String(number) : projectName}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="custom"
      lang="en"
    />
  );
}
