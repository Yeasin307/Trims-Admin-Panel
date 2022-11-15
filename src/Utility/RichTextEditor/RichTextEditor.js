import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";

const RichTextEditor = ({ field, placeholder, id }) => {

    return (
        <>
            <EditorToolbar
                toolbarId={id}
            />
            <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange(field.name)}
                placeholder={placeholder}
                modules={modules(id)}
                formats={formats}
            />
        </>
    );
};

export default RichTextEditor;