export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-in", {
    timeZone: "UTC",
  });
}

export function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPost = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    // filterOutDrafts if TRUE
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if TRUE
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);
    return acc;
  }, []);

  if (typeof limit == "number") {
    return filteredPost.slice(0, limit);
  }

  return filteredPost;
}
