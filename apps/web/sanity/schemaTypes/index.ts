import type { SchemaTypeDefinition } from "sanity";
import author from "./author";
import blockContent from "./blockContent";
import event from "./event";
import newsArticle from "./newsArticle";
import post from "./post";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  author,
  post,
  newsArticle,
  event,
];
