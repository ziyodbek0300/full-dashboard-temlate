import { useMemo } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("java", java);

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "tsx",
  py: "python",
  rs: "rust",
  go: "go",
  json: "json",
  css: "css",
  scss: "css",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  md: "markdown",
  mdx: "markdown",
  yaml: "yaml",
  yml: "yaml",
  java: "java",
  toml: "yaml",
};

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "ico",
  "bmp",
]);

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

function useIsDarkMode() {
  return document.documentElement.classList.contains("dark");
}

interface FileViewerProps {
  filename: string;
  content: string;
  size: number;
  downloadUrl: string | null;
}

export function FileViewer({
  filename,
  content,
  size,
  downloadUrl,
}: FileViewerProps) {
  const isDark = useIsDarkMode();
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";

  const decoded = useMemo(() => {
    try {
      return atob(content);
    } catch {
      return content;
    }
  }, [content]);

  if (IMAGE_EXTENSIONS.has(ext) && downloadUrl) {
    return (
      <div className="flex justify-center rounded-md border bg-muted/30 p-8">
        <img
          src={downloadUrl}
          alt={filename}
          className="max-h-[600px] max-w-full object-contain"
        />
      </div>
    );
  }

  if (size > MAX_FILE_SIZE) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground">
          This file is too large to display ({(size / (1024 * 1024)).toFixed(1)}{" "}
          MB).
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download raw file
          </a>
        )}
      </div>
    );
  }

  const language = EXTENSION_TO_LANGUAGE[ext] ?? "text";

  return (
    <div className="overflow-hidden rounded-md border">
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.8125rem",
        }}
      >
        {decoded}
      </SyntaxHighlighter>
    </div>
  );
}
