import { Suspense } from "react";
import BlogClient from "./blogClient";

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
