import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText } from "lucide-react";

interface ReadmePreviewProps {
  content: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  return (
    <div className="rounded-md border">
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">README.md</span>
      </div>
      <div className="prose prose-sm max-w-none p-6 dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
}
