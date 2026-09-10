/**
 * Rehype plugin: lift a lone <img> out of its wrapping <p>.
 *
 * Markdown turns `![alt](src)` into `<p><img></p>`, but the Spotlight template's MDX renders a bare
 * <img> as a direct child of .prose. That matters because the typography styles give <p> 28px
 * vertical margins and <img> 40px — so a wrapped image made the article 24px shorter than the
 * template. Unwrapping restores the template's DOM shape and spacing.
 *
 * Only paragraphs whose sole meaningful child is an image are unwrapped; a paragraph mixing text
 * and an inline image is left alone.
 */
export default function rehypeUnwrapImages() {
  const isBlank = (node) => node.type === 'text' && node.value.trim() === '';

  const walk = (node) => {
    if (!Array.isArray(node.children)) return;

    node.children = node.children.flatMap((child) => {
      walk(child);

      if (child.type === 'element' && child.tagName === 'p') {
        const meaningful = child.children.filter((c) => !isBlank(c));
        const onlyChildIsImage =
          meaningful.length === 1 && meaningful[0].type === 'element' && meaningful[0].tagName === 'img';

        if (onlyChildIsImage) return meaningful;
      }

      return child;
    });
  };

  return (tree) => walk(tree);
}
