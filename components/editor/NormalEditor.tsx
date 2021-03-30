import { useRef, useState, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

type Props = {
  content?: string;
  language?: string;
  userTheme?: string;
  onContentSave?: () => any;
  onContentChange?: (content: string) => any;
  onEditorWillMount?: (monaco: Monaco) => any;
  onEditorDidMount?: (editor: any, monaco: Monaco) => any;
};

const sampleCode = `import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`;

function handleSampleDataAction(editor) {
  const value = editor.getValue();
  if (value.length > 0) {
    editor.setValue(value + '\n' + sampleCode);
  } else {
    editor.setValue(sampleCode);
  }
}

const editorOptions = {
  padding: {
    top: 8,
  },
};

function NormalEditor({
  userTheme = 'vs-dark',
  content,
  language,
  onContentSave,
  onContentChange,
  onEditorWillMount,
  onEditorDidMount,
}: React.PropsWithChildren<Props>) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor, monaco: Monaco) => {
    editor.addAction({
      id: 'sample-data-action',
      label: 'MonaPaste: Append sample code',
      contextMenuGroupId: 'MonaPaste',
      run: handleSampleDataAction,
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Insert,
      ],
    });

    editor.addAction({
      id: 'save-action',
      label: 'MonaPaste: Save paste contents',
      contextMenuGroupId: 'MonaPaste',
      run: () => onContentSave(),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    });

    editorRef.current = editor;

    if (onEditorDidMount) {
      onEditorDidMount(editor, monaco);
    }
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    if (onEditorWillMount) {
      onEditorWillMount(monaco);
    }

    // TODO: Register other languages
  };

  const handleEditorContentChange = () => {
    if (onContentChange) {
      onContentChange(editorRef.current.getValue());
    }
  };

  return (
    <Editor
      theme={userTheme}
      defaultValue={null}
      defaultLanguage={null}
      value={content}
      language={language}
      beforeMount={handleEditorWillMount}
      onChange={handleEditorContentChange}
      onMount={handleEditorDidMount}
      options={editorOptions}
    />
  );
}

export default NormalEditor;
