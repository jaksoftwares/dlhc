"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { useEffect } from 'react'

export function RichTextEditor() {
  const { documentContent, setDocumentContent, isExporting } = useEditorStore()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We disable headings to enforce letterhead body consistency
        codeBlock: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: documentContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDocumentContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px]',
      },
    },
  })

  // Sync external changes (like loading from DB) into the editor
  useEffect(() => {
    if (editor && editor.getHTML() !== documentContent) {
      editor.commands.setContent(documentContent)
    }
  }, [documentContent, editor])

  if (!editor) {
    return null
  }

  // During PDF export, we completely hide the toolbar so it doesn't print
  return (
    <div className="relative group w-full">
      
      {!isExporting && (
        <div className="absolute -top-12 left-0 right-0 bg-white border shadow-sm rounded-md p-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto mx-auto w-fit">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('underline') ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-slate-200 mx-1"></div>

          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* The actual editable area */}
      <div className={`p-4 border border-transparent rounded transition-colors ${!isExporting && 'hover:border-blue-200/50 hover:bg-blue-50/20'}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
