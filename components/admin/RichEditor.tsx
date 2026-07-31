// "use client";

// import uploadImage from "@/actions/uploadImage";
// import { Prisma } from "@/lib/generated/client";
// import { Color } from "@tiptap/extension-color";
// import Highlight from "@tiptap/extension-highlight";
// import Image from "@tiptap/extension-image";
// import TextAlign from "@tiptap/extension-text-align";
// import { TextStyle } from "@tiptap/extension-text-style";
// import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import {
//   AlignCenter,
//   AlignLeft,
//   Bold,
//   Heading2,
//   Heading3,
//   Highlighter,
//   ImageIcon,
//   Italic,
//   Lightbulb,
//   Link2,
//   List,
//   ListOrdered,
//   Minus,
//   Strikethrough
// } from "lucide-react";

// type RichEditorProps = {
//   initialContent?: Prisma.InputJsonValue | null;
//   initialHtml?: string | null;
//   onChange: (json: JSONContent, html: string) => void;
//   titleSlot?: React.ReactNode; // 🌟 タイトルを受け取るためのプロパティを追加
// };

// const EMPTY_DOCUMENT: JSONContent = {
//   type: "doc",
//   content: []
// };

// const removeEmptyImageTags = (html: string) => html.replace(/<img(?![^>]*\bsrc=)[^>]*>/gi, "");

// const editorExtensions = [
//   StarterKit.configure({
//     link: {
//       openOnClick: false
//     }
//   }),
//   TextStyle,
//   Color,
//   Highlight.configure({ multicolor: true }),
//   Image,
//   TextAlign.configure({ types: ["heading", "paragraph"] })
// ];

// const RichEditor = ({ initialContent, initialHtml, onChange, titleSlot }: RichEditorProps) => {
//   const initialEditorContent =
//     initialHtml && initialHtml.trim().length > 0
//       ? removeEmptyImageTags(initialHtml)
//       : initialContent
//         ? (initialContent as unknown as JSONContent)
//         : EMPTY_DOCUMENT;

//   const editor = useEditor({
//     extensions: editorExtensions,
//     content: initialEditorContent,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getJSON() as JSONContent, editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "tiptap-content prose prose-neutral max-w-none focus:outline-none min-h-[600px] p-8 font-['Liberation_Serif:Regular'] text-[#1b1c1c] leading-relaxed " +
//           "prose-headings:font-['Liberation_Serif:Bold'] prose-headings:text-[#1b1c1c] prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-[2rem] prose-h2:leading-tight prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-[1.5rem] prose-h3:leading-snug " +
//           "prose-p:my-3 prose-ul:my-4 prose-ol:my-4 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:my-1 prose-li:marker:text-[#0058c3] " +
//           "prose-blockquote:border-l-4 prose-blockquote:border-[#0058c3] prose-blockquote:bg-[#f0f5ff] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r prose-blockquote:not-italic prose-blockquote:text-[#1b1c1c]"
//       }
//     }
//   });

//   if (!editor) return null;

//   const addImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = async (e) => {
//       const file = (e.target as HTMLInputElement).files?.[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("type", "content-images");

//       try {
//         const res = await uploadImage(formData);
//         if (res.success && res.url) {
//           editor.chain().focus().setImage({ src: res.url }).run();
//         } else {
//           alert(`アップロード失敗: ${res.error}`);
//         }
//       } catch (error) {
//         console.error(error);
//         alert("アップロード中にエラーが発生しました。");
//       }
//     };
//     input.click();
//   };

//   const setLink = () => {
//     const url = window.prompt("URLを入力してください");
//     if (url === null) return;
//     if (url === "") {
//       editor.chain().focus().extendMarkRange("link").unsetLink().run();
//       return;
//     }
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   };

//   return (
//     <div className="bg-white border border-[#c1c6d7] rounded shadow-sm flex flex-col relative">
//       {/* 🌟 ここからが上部固定（Sticky）されるエリア 🌟 */}
//       <div className="sticky top-0 z-20 bg-white rounded-t shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
//         {/* PostFormから渡されたタイトルをここに表示 */}
//         {titleSlot && <div className="p-6 border-b border-[#e9e8e7]">{titleSlot}</div>}

//         {/* ツールバー */}
//         <div className="flex flex-wrap items-center gap-1 p-2 bg-[#fbf9f8] border-b border-[#c1c6d7] text-[#414754]">
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 2 }) ? "bg-[#c1c6d7] text-black font-bold" : ""}`}
//             title="見出し2 (H2)">
//             <Heading2 className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 3 }) ? "bg-[#c1c6d7] text-black font-bold" : ""}`}
//             title="見出し3 (H3)">
//             <Heading3 className="w-4 h-4" />
//           </button>

//           <div className="w-px h-4 bg-[#c1c6d7] mx-1" />

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bold") ? "bg-[#c1c6d7] text-black" : ""}`}
//             title="太字">
//             <Bold className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("italic") ? "bg-[#c1c6d7] text-black" : ""}`}
//             title="斜体">
//             <Italic className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("strike") ? "bg-[#c1c6d7] text-black" : ""}`}
//             title="打ち消し線">
//             <Strikethrough className="w-4 h-4" />
//           </button>

//           <label
//             className="p-1.5 rounded hover:bg-[#e9e8e7] cursor-pointer flex items-center justify-center relative"
//             title="文字色">
//             <input
//               type="color"
//               onInput={(e) =>
//                 editor
//                   .chain()
//                   .focus()
//                   .setColor((e.target as HTMLInputElement).value)
//                   .run()
//               }
//               value={editor.getAttributes("textStyle").color || "#1b1c1c"}
//               className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
//             />
//             <span className="font-bold text-xs underline decoration-2 decoration-red-500">A</span>
//           </label>

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("highlight") ? "bg-[#c1c6d7] text-black" : ""}`}
//             title="イエローマーカー">
//             <Highlighter className="w-4 h-4 text-yellow-600" />
//           </button>

//           <div className="w-px h-4 bg-[#c1c6d7] mx-1" />

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("left").run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "left" }) ? "bg-[#c1c6d7]" : ""}`}>
//             <AlignLeft className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("center").run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "center" }) ? "bg-[#c1c6d7]" : ""}`}>
//             <AlignCenter className="w-4 h-4" />
//           </button>

//           <div className="w-px h-4 bg-[#c1c6d7] mx-1" />

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bulletList") ? "bg-[#c1c6d7]" : ""}`}>
//             <List className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("orderedList") ? "bg-[#c1c6d7]" : ""}`}>
//             <ListOrdered className="w-4 h-4" />
//           </button>

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border border-[#0058c3] text-[#0058c3] bg-[#f0f5ff] hover:bg-[#d9e8ff] ml-1 transition-colors`}
//             title="要約・ポイントメモを挿入">
//             <Lightbulb className="w-3.5 h-3.5" />
//             <span>要約ボックス</span>
//           </button>

//           <div className="w-px h-4 bg-[#c1c6d7] mx-1" />

//           <button
//             type="button"
//             onClick={setLink}
//             className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("link") ? "bg-[#c1c6d7]" : ""}`}>
//             <Link2 className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={addImage}
//             className="p-1.5 rounded hover:bg-[#e9e8e7] text-[#0058c3]"
//             title="画像を挿入">
//             <ImageIcon className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setHorizontalRule().run()}
//             className="p-1.5 rounded hover:bg-[#e9e8e7]"
//             title="区切り線">
//             <Minus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default RichEditor;

"use client";

import { Prisma } from "@/lib/generated/client";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  Bold,
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
  Strikethrough
} from "lucide-react";

type RichEditorProps = {
  initialContent?: Prisma.InputJsonValue | null;
  initialHtml?: string | null;
  onChange: (json: JSONContent, html: string) => void;
  titleSlot?: React.ReactNode;
};

const EMPTY_DOCUMENT: JSONContent = {
  type: "doc",
  content: []
};

const removeEmptyImageTags = (html: string) => html.replace(/<img(?![^>]*\bsrc=)[^>]*>/gi, "");

const editorExtensions = [
  StarterKit.configure({
    link: {
      openOnClick: false
    }
  }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Image,
  TextAlign.configure({ types: ["heading", "paragraph"] })
];

const RichEditor = ({ initialContent, initialHtml, onChange, titleSlot }: RichEditorProps) => {
  const initialEditorContent =
    initialHtml && initialHtml.trim().length > 0
      ? removeEmptyImageTags(initialHtml)
      : initialContent
        ? (initialContent as unknown as JSONContent)
        : EMPTY_DOCUMENT;

  const editor = useEditor({
    extensions: editorExtensions,
    content: initialEditorContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as JSONContent, editor.getHTML());
    },
    editorProps: {
      attributes: {
        // 🌟 min-h-[600px] などを削除し、min-h-full に変更（スクロールエリア全体をクリック可能にするため）
        class:
          "tiptap-content prose prose-neutral max-w-none focus:outline-none min-h-full p-8 font-['Liberation_Serif:Regular'] text-[#1b1c1c] leading-relaxed " +
          "prose-headings:font-['Liberation_Serif:Bold'] prose-headings:text-[#1b1c1c] prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-[2rem] prose-h2:leading-tight prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-[1.5rem] prose-h3:leading-snug " +
          "prose-p:my-3 prose-ul:my-4 prose-ol:my-4 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:my-1 prose-li:marker:text-[#0058c3] " +
          "prose-blockquote:border-l-4 prose-blockquote:border-[#0058c3] prose-blockquote:bg-[#f0f5ff] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r prose-blockquote:not-italic prose-blockquote:text-[#1b1c1c]"
      }
    }
  });

  if (!editor) return null;

  const addImage = () => {
    // ...中略（既存のアップロードロジックそのまま）
  };

  const setLink = () => {
    // ...中略（既存のリンク挿入ロジックそのまま）
  };

  return (
    <div className="bg-white border border-[#c1c6d7] rounded shadow-sm flex flex-col h-full overflow-hidden">
      {/* 🌟 1. タイトルとツールバーの固定エリア (shrink-0で潰れないようにする) */}
      <div className="shrink-0 bg-white rounded-t border-b border-[#c1c6d7] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] z-10">
        {titleSlot && <div className="p-6 border-b border-[#e9e8e7]">{titleSlot}</div>}

        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#fbf9f8] text-[#414754]">
          {/* ツールバーの各ボタンはそのまま */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 2 }) ? "bg-[#c1c6d7] text-black font-bold" : ""}`}
            title="見出し2 (H2)">
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("heading", { level: 3 }) ? "bg-[#c1c6d7] text-black font-bold" : ""}`}
            title="見出し3 (H3)">
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[#c1c6d7] mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bold") ? "bg-[#c1c6d7] text-black" : ""}`}
            title="太字">
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("italic") ? "bg-[#c1c6d7] text-black" : ""}`}
            title="斜体">
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("strike") ? "bg-[#c1c6d7] text-black" : ""}`}
            title="打ち消し線">
            <Strikethrough className="w-4 h-4" />
          </button>
          <label
            className="p-1.5 rounded hover:bg-[#e9e8e7] cursor-pointer flex items-center justify-center relative"
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
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("highlight") ? "bg-[#c1c6d7] text-black" : ""}`}
            title="イエローマーカー">
            <Highlighter className="w-4 h-4 text-yellow-600" />
          </button>
          <div className="w-px h-4 bg-[#c1c6d7] mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "left" }) ? "bg-[#c1c6d7]" : ""}`}>
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive({ textAlign: "center" }) ? "bg-[#c1c6d7]" : ""}`}>
            <AlignCenter className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[#c1c6d7] mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("bulletList") ? "bg-[#c1c6d7]" : ""}`}>
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("orderedList") ? "bg-[#c1c6d7]" : ""}`}>
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border border-[#0058c3] text-[#0058c3] bg-[#f0f5ff] hover:bg-[#d9e8ff] ml-1 transition-colors`}
            title="要約・ポイントメモを挿入">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>要約ボックス</span>
          </button>
          <div className="w-px h-4 bg-[#c1c6d7] mx-1" />
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded hover:bg-[#e9e8e7] ${editor.isActive("link") ? "bg-[#c1c6d7]" : ""}`}>
            <Link2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-1.5 rounded hover:bg-[#e9e8e7] text-[#0058c3]"
            title="画像を挿入">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded hover:bg-[#e9e8e7]"
            title="区切り線">
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 🌟 2. スクロール可能な本文エリア */}
      <div
        className="flex-1 overflow-y-auto cursor-text bg-white custom-scrollbar"
        onClick={() => editor.chain().focus().run()} // 空白部分をクリックしてもエディタにフォーカスさせる
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichEditor;
