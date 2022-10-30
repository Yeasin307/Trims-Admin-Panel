import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";

const RichTextEditor = ({ field }) => {

    return (
        <>
            <EditorToolbar
                toolbarId={'t1'}
            />
            <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange(field.name)}
                placeholder={"Enter Description"}
                modules={modules('t1')}
                formats={formats}
            />
        </>
    );
};

export default RichTextEditor;