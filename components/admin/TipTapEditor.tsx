"use client";

/**
 * Minimal TipTap editor with a small toolbar (bold, H2). Currently unused in favor of
 * the fuller-featured `RichEditor`; kept as a lightweight reference implementation.
 */

import { Prisma } from "@/libs/generated/client";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TipTapEditorProps = {
  content?: Prisma.InputJsonValue | null;
  onChange: (json: JSONContent, html: string) => void;
};

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: (content ?? { type: "doc", content: [] }) as JSONContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as JSONContent, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[300px] lg:min-h-[400px] p-6 font-['Liberation_Serif:Regular'] text-[#1b1c1c] text-base leading-relaxed"
      }
    }
  });

  return (
    <div className="bg-white border border-[#c1c6d7] rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-[#fbf9f8] border-b border-[#c1c6d7] px-4 py-3 flex flex-wrap gap-2.5 items-center">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 text-xs font-bold border rounded hover:bg-gray-200 bg-white">
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-2 py-1 text-xs font-bold border rounded hover:bg-gray-200 bg-white">
          H2
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
