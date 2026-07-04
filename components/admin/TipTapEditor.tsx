"use client";

import { Prisma } from "@/lib/generated/client";
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
        class: "prose max-w-none focus:outline-none min-h-[400px] p-6 font-['Liberation_Serif:Regular'] text-[#1b1c1c]"
      }
    }
  });

  return (
    <div className="bg-white border border-[#c1c6d7] rounded shadow-sm overflow-hidden">
      <div className="bg-[#fbf9f8] border-b border-[#c1c6d7] px-4 py-2 flex gap-2">
        {/* ここにツールバーを配置 */}
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 text-xs font-bold border rounded hover:bg-gray-200">
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-2 py-1 text-xs font-bold border rounded hover:bg-gray-200">
          H2
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
