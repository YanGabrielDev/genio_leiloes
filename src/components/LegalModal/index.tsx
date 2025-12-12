import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SafeMarkdownRenderer } from "../SafeMarkdownRenderer";

interface LegalModalProps {
  title: string;
  content: string;
  children: React.ReactNode;
}

export function LegalModal({ title, content, children }: LegalModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="prose dark:prose-invert">
          <SafeMarkdownRenderer content={content} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
