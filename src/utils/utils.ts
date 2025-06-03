import type { CollectionEntry } from "astro:content";
import * as path from "node:path";
import * as fs from "node:fs";

// This configuration object defines the locale and options for formatting dates.
const dateConfig = {
  locale: "en-GB",
  options: {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
};

// This creates a new Intl.DateTimeFormat object for formatting dates based on the specified locale and options.
const dateFormat = new Intl.DateTimeFormat(
  dateConfig.locale,
  dateConfig.options as Intl.DateTimeFormatOptions
);

// This function formats a date into a human-readable string based on the provided locale and options.
export function getFormattedDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) {
  if (typeof options !== "undefined") {
    return new Date(date).toLocaleDateString(dateConfig.locale, {
      ...(dateConfig.options as Intl.DateTimeFormatOptions),
      ...options,
    });
  }

  return dateFormat.format(new Date(date));
}

// This function sorts an array of posts by their publish date in descending order.
export function sortMDByDate(posts: CollectionEntry<"blog">[] = []) {
  return posts.sort(
    (a, b) =>
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
  );
}

// This function extracts unique tags from an array of posts and returns them as an array.
export function getUniqueTags(posts: CollectionEntry<"blog">[] = []) {
  const uniqueTags = new Set<string>();
  posts.forEach((post) => {
    post.data.tags.map((tag) => uniqueTags.add(tag));
  });
  return Array.from(uniqueTags);
}

// This function returns an object where each key is a unique tag and its value is the count of how many times that tag appears across all posts.
export function getUniqueTagsWithCount(posts: CollectionEntry<"blog">[] = []): {
  [key: string]: number;
} {
  return posts.reduce((prev, post) => {
    const runningTags: { [key: string]: number } = { ...prev };
    post.data.tags.forEach((tag) => {
      runningTags[tag] = (runningTags[tag] || 0) + 1;
    });
    return runningTags;
  }, {});
}

// Function to get package version from node_modules
export function getPackageVersion(packageName: string) {
  try {
    const packagePath = path.resolve(
      process.cwd(),
      "node_modules",
      packageName,
      "package.json"
    );
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return { name: packageName, version: packageJson.version };
  } catch (error: any) {
    console.warn(`Could not find version for ${packageName}:`, error.message);
    return { name: packageName, version: null }; // Fallback to just the package name if version can't be found
  }
}
