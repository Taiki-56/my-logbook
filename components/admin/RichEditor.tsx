"use client";

import { uploadImageAction } from "@/actions/media";
import { Prisma } from "@/libs/generated/client";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Braces,
  Code,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Lightbulb,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Undo
} from "lucide-react";
import { useTranslations } from "next-intl";

type RichEditorProps = {
  initialContent?: Prisma.InputJsonValue | null;
  onChange: (json: JSONContent, html: string) => void;
};

const EMPTY_DOCUMENT: JSONContent = {
  type: "doc",
  content: []
};

const removeEmptyImageTags = (html: string) => html.replace(/<img(?![^>]*\bsrc=)[^>]*>/gi, "");

const editorExtensions = [
  StarterKit.configure({
    link: false,
    codeBlock: {
      HTMLAttributes: {
        class: "bg-[#1b1c1c] text-[#fbf9f8] rounded-md p-4 font-mono text-sm my-6 overflow-x-auto"
      }
    }
  }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-lg border border-[#c1c6d7] my-8 shadow-md mx-auto d-block"
    }
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class:
        "text-[#0058c3] underline decoration-2 decoration-[#0058c3]/30 hover:decoration-[#0058c3] transition-colors"
    }
  }),
  TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right", "justify"] })
];

const RichEditor = ({ initialContent, onChange }: RichEditorProps) => {
  const t = useTranslations("Admin.editor");

  const initialEditorContent = initialContent ? (initialContent as unknown as JSONContent) : EMPTY_DOCUMENT;

  const editor = useEditor({
    extensions: editorExtensions,
    content: initialEditorContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as JSONContent, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-content prose prose-neutral max-w-none focus:outline-none h-full lg:h-full lg:overflow-y-auto lg:custom-scrollbar p-6 md:p-8 font-['Liberation_Serif:Regular'] text-[#1b1c1c] leading-relaxed " +
          "prose-headings:font-['Liberation_Serif:Bold'] prose-headings:text-[#1b1c1c] " +
          /* H2スタイル */
          "prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-[1.75rem] prose-h2:leading-tight prose-h2:bg-[#f8f8f8] prose-h2:border-l-[5px] prose-h2:border-[#ee7e22] prose-h2:py-3 prose-h2:px-5 " +
          /* H3スタイル */
          "prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[1.35rem] prose-h3:leading-snug prose-h3:border-b-2 prose-h3:border-[#ee7e22] prose-h3:pb-2 " +
          "prose-p:my-3 prose-ul:my-4 prose-ol:my-4 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:my-1 prose-li:marker:text-[#0058c3] " +
          "prose-blockquote:border-l-4 prose-blockquote:border-[#0058c3] prose-blockquote:bg-[#f0f5ff] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r prose-blockquote:not-italic prose-blockquote:text-[#1b1c1c]"
      }
    }
  });

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "content-images");

      try {
        const res = await uploadImageAction(formData);
        if (res.success && res.url) {
          editor.chain().focus().setImage({ src: res.url }).run();
        } else {
          alert(`画像のアップロードに失敗しました: ${res.error}`);
        }
      } catch (error) {
        console.error(error);
        alert("アップロード中にエラーが発生しました。");
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = window.prompt("URLを入力してください");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="bg-white border border-[#c1c6d7] rounded-lg shadow-sm flex flex-col min-h-125 lg:h-full overflow-hidden relative">
      <div className="shrink-0 bg-[#fbf9f8] border-b border-[#c1c6d7] lg:sticky lg:top-0 lg:z-20 text-[#414754]">
        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#fbf9f8]">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded hover:bg-[#e9e8e7] disabled:opacity-30 disabled:hover:bg-transparent"
            title="元に戻す (Undo)">
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded hover:bg-[#e9e8e7] disabled:opacity-30 disabled:hover:bg-transparent"
            title="やり直す (Redo)">
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#c1c6d7] mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 2 }) ? "bg-[#c1c6d7] text-black font-bold" : "bg-white border"}`}
            title="見出し2 (H2)">
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 3 }) ? "bg-[#c1c6d7] text-black font-bold" : "bg-white border"}`}
            title="見出し3 (H3)">
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("paragraph") ? "bg-[#c1c6d7] text-black font-bold" : "bg-white border"}`}
            title="段落">
            <Pilcrow className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#c1c6d7] mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bold") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="太字">
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("italic") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="斜体">
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("strike") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="打ち消し線">
            <Strikethrough className="w-4 h-4" />
          </button>

          <label
            className="p-1.5 rounded hover:bg-[#e9e8e7] cursor-pointer flex items-center justify-center relative bg-white border"
            title="文字色">
            <input
              type="color"
              onInput={(e) =>
                editor
                  .chain()
                  .focus()
                  .setColor((e.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes("textStyle").color || "#1b1c1c"}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <span className="font-bold text-xs underline decoration-2 decoration-red-500">A</span>
          </label>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("highlight") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="イエローマーカー">
            <Highlighter className="w-4 h-4 text-yellow-600" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("code") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="インラインコード">
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("codeBlock") ? "bg-[#c1c6d7] text-black" : "bg-white border"}`}
            title="コードブロック">
            <Braces className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#c1c6d7] mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "left" }) ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "center" }) ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "right" }) ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "justify" }) ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#c1c6d7] mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bulletList") ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("orderedList") ? "bg-[#c1c6d7]" : "bg-white border"}`}>
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-bold border border-[#0058c3] text-[#0058c3] bg-[#f0f5ff] hover:bg-[#d9e8ff] transition-colors shadow-sm`}
            title="要約・ポイントメモを挿入">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>要約ボックス</span>
          </button>

          <div className="w-px h-4 bg-[#c1c6d7] mx-0.5" />

          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("link") ? "bg-[#c1c6d7]" : "bg-white border"}`}
            title="リンクを挿入">
            <Link2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-1.5 rounded hover:bg-[#e9e8e7] text-[#0058c3] bg-white border"
            title="画像を挿入">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded hover:bg-[#e9e8e7] bg-white border"
            title="区切り線">
            <Minus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 rounded hover:bg-[#eef2f6] text-gray-500 hover:text-red-600 bg-white border ml-auto"
            title="フォーマットを解除">
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto cursor-text bg-white custom-scrollbar relative"
        onClick={() => editor.chain().focus().run()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichEditor;
