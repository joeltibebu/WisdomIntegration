"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  minHeight?: string;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`px-2 py-1 rounded text-sm transition-colors ${
        active
          ? "bg-wisdom-blue text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

const COLORS = [
  { label: "Default", value: "" },
  { label: "Blue", value: "#1e4b9b" },
  { label: "Green", value: "#16a34a" },
  { label: "Red", value: "#dc2626" },
  { label: "Orange", value: "#ea580c" },
  { label: "Gray", value: "#6b7280" },
];

export function RichTextEditor({
  id,
  label,
  value,
  onChange,
  placeholder = "Write here…",
  error,
  required,
  minHeight = "200px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[inherit] px-4 py-3 prose prose-slate max-w-none text-sm",
        "data-placeholder": placeholder,
      },
    },
  });

  // Sync external value changes (e.g. when form resets)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-wisdom-text">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={`rounded-lg border ${error ? "border-red-400" : "border-wisdom-border"} bg-white overflow-hidden`}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
          {/* Undo / Redo */}
          <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarButton>
          <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarButton>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Headings */}
          <select
            title="Text style"
            value={
              editor.isActive("heading", { level: 1 }) ? "h1"
              : editor.isActive("heading", { level: 2 }) ? "h2"
              : editor.isActive("heading", { level: 3 }) ? "h3"
              : "p"
            }
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "p") editor.chain().focus().setParagraph().run();
              else editor.chain().focus().setHeading({ level: Number(v.replace("h", "")) as 1|2|3 }).run();
            }}
            className="text-xs rounded border border-slate-200 bg-white px-1.5 py-1 text-slate-600 focus:outline-none"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Bold / Italic / Underline */}
          <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolbarButton>
          <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolbarButton>
          <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></ToolbarButton>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Text color */}
          <select
            title="Text color"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) editor.chain().focus().unsetColor().run();
              else editor.chain().focus().setColor(v).run();
            }}
            className="text-xs rounded border border-slate-200 bg-white px-1.5 py-1 text-slate-600 focus:outline-none"
          >
            {COLORS.map((c) => (
              <option key={c.value} value={c.value} style={{ color: c.value || "inherit" }}>{c.label}</option>
            ))}
          </select>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Alignment */}
          <ToolbarButton title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>≡</ToolbarButton>
          <ToolbarButton title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>≡</ToolbarButton>
          <ToolbarButton title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>≡</ToolbarButton>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Lists */}
          <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• —</ToolbarButton>
          <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</ToolbarButton>

          {/* Indent / Outdent */}
          <ToolbarButton title="Indent" onClick={() => editor.chain().focus().sinkListItem("listItem").run()}>→</ToolbarButton>
          <ToolbarButton title="Outdent" onClick={() => editor.chain().focus().liftListItem("listItem").run()}>←</ToolbarButton>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Link */}
          <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>🔗</ToolbarButton>
        </div>

        {/* Editor area */}
        <div style={{ minHeight }}>
          <EditorContent editor={editor} id={id} />
        </div>
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
