// components/GiscusComment.tsx
import Giscus from "@giscus/react";

export default function GiscusComment({ number }: { number: number }) {
  return (
    <Giscus
      id="comments"
      repo="Leeous/leeous.github.io"
      repoId="MDEwOlJlcG9zaXRvcnkxODMyODkyMzg"
      category="Blog Posts"
      categoryId="DIC_kwDOCuzFls4CtgKV"
      mapping="number"
      term={String(number)}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="custom"
      lang="en"
      loading="lazy"
    />
  );
}
