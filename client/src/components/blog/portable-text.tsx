import type { PortableTextBlock, PortableTextChild } from "@shared/blog";
import { Fragment, type ReactNode } from "react";

function Children({ block }: { block: PortableTextBlock }) {
  const marks = new Map(block.markDefs?.map(mark => [mark._key, mark]) || []);
  return <>{block.children?.map((child: PortableTextChild, index) => {
    let content: ReactNode = child.text || "";
    child.marks?.slice().reverse().forEach(mark => {
      if (mark === "strong") content = <strong>{content}</strong>;
      else if (mark === "em") content = <em>{content}</em>;
      else {
        const definition = marks.get(mark);
        if (definition?._type === "link" && definition.href) {
          const external = /^https?:\/\//.test(definition.href);
          content = <a href={definition.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{content}</a>;
        }
      }
    });
    return <Fragment key={child._key || index}>{content}</Fragment>;
  })}</>;
}

export function PortableText({ value = [] }: { value?: PortableTextBlock[] }) {
  const output: ReactNode[] = [];
  for (let index = 0; index < value.length; index++) {
    const block = value[index];
    if (block._type === "image" && block.asset?.url) output.push(<figure key={block._key}><img src={block.asset.url} alt={block.alt || ""} width={block.asset.metadata?.dimensions?.width} height={block.asset.metadata?.dimensions?.height} loading="lazy" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>);
    else if (block._type === "divider") output.push(<hr key={block._key} />);
    else if (block.listItem) {
      const items = [block]; while (value[index + 1]?.listItem === block.listItem) items.push(value[++index]);
      const List = block.listItem === "number" ? "ol" : "ul";
      output.push(<List key={block._key}>{items.map(item => <li key={item._key}><Children block={item} /></li>)}</List>);
    } else if (block.style === "h2") output.push(<h2 key={block._key}><Children block={block} /></h2>);
    else if (block.style === "h3") output.push(<h3 key={block._key}><Children block={block} /></h3>);
    else if (block.style === "blockquote") output.push(<blockquote key={block._key}><Children block={block} /></blockquote>);
    else output.push(<p key={block._key}><Children block={block} /></p>);
  }
  return <div className="blog-prose">{output}</div>;
}
