import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const sampleValue = `import React from 'react';
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

function NormalEditor() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

  const userTheme = 'vs-dark';

  const monacoOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    padding: {
      top: 8,
    },
  };

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor;
  }

  return (
    <Editor
      theme={userTheme}
      defaultLanguage="javascript"
      value={sampleValue}
      onMount={handleEditorDidMount}
      options={monacoOptions}
    />
  );
}

export default NormalEditor;
