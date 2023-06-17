"use client"
import { DATA_FIELDS } from '@/lib/admin/fields'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce';
import React, { useRef, useState } from 'react'

type State = {
  id: string,
  name: string
  required?: boolean,
  className?: string,
  placeholder?: string,
  defaultValue?: any,
  onChange?: (data: any) => void,
}

const AdminFormFieldRichText: React.FC<State> = ({
  id,
  name,
  required = false,
  className = '',
  placeholder,
  defaultValue,
  onChange
}) => {
  const icon = DATA_FIELDS.find(v => v.fieldName == 'Plain text')?.icon

  const editorRef = useRef<TinyMCEEditor | null>(null)
  
  // const [editorContent, setEditorContent] = useState(value);

  const handleEditorChange = (content: string, editor: TinyMCEEditor) => {
    // setEditorContent(content)

    if (onChange) {
      onChange(content)
    }
  }

  return (
    <label htmlFor={id} className={`rounded bg-gray-200 focus-within:bg-gray-300 select-none ${className}`}>
      <p className="text-sm font-semibold flex items-center space-x-2 px-3 py-2">
        <span className="icon w-4 h-4" dangerouslySetInnerHTML={{__html: icon || ''}}></span>
        {name}
      </p>
      {/* <textarea name={name} value={editorContent} readOnly className='sr-only' /> */}
      <style>{`
        .tox-tinymce { border-radius: 5px }
        .tox-statusbar__branding {
          display: none
        }
        .tox-editor-header {
          padding: 4px 2px !important;
        }
        .tox-toolbar__group {
          padding: 0px 2px !important;
        }
        .tox-toolbar__group > * {
          margin: 0 !important;
        }
        .tox-toolbar__primary > * + * {
          border-left: 1px solid #ccc !important;
        }
      `}</style>
      <Editor
        onInit={(evt, editor) => {editorRef.current = editor}}
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onEditorChange={handleEditorChange}
        initialValue={defaultValue}
        init={{
          height: 300,
          min_height: 300,
          menubar: false,
          "plugins": [
            "advlist","autolink", "autoresize",
            "lists","link","image","charmap","preview","anchor","searchreplace","visualblocks",
            "fullscreen","insertdatetime","media","table","help","wordcount", "code", "codesample"
          ],
          toolbar: "styles | alignleft aligncenter alignright | bold italic forecolor backcolor | bullist numlist | link image table codesample | code fullscreen ",
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px }`,
          images_upload_url: '/api/admin/images/upload-tinymce'
        }}
      />
    </label>
  )
}

export default AdminFormFieldRichText