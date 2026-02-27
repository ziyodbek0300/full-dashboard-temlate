import {
  File,
  FileCode,
  FileJson,
  FileText,
  FileType,
  Image,
  Folder,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EXTENSION_ICONS: Record<string, LucideIcon> = {
  ts: FileCode,
  tsx: FileCode,
  js: FileCode,
  jsx: FileCode,
  py: FileCode,
  rb: FileCode,
  go: FileCode,
  rs: FileCode,
  java: FileCode,
  c: FileCode,
  cpp: FileCode,
  h: FileCode,
  css: FileCode,
  scss: FileCode,
  html: FileCode,
  vue: FileCode,
  svelte: FileCode,
  json: FileJson,
  yaml: FileJson,
  yml: FileJson,
  toml: FileJson,
  md: FileText,
  mdx: FileText,
  txt: FileText,
  csv: FileText,
  png: Image,
  jpg: Image,
  jpeg: Image,
  gif: Image,
  svg: Image,
  webp: Image,
  ico: Image,
  woff: FileType,
  woff2: FileType,
  ttf: FileType,
  eot: FileType,
};

interface FileIconProps {
  name: string;
  type: "file" | "dir" | "symlink" | "submodule";
  className?: string;
}

export function FileIcon({ name, type, className }: FileIconProps) {
  if (type === "dir") {
    return <Folder className={className} />;
  }

  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const Icon = EXTENSION_ICONS[ext] ?? File;
  return <Icon className={className} />;
}
