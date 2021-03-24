import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

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

function NormalEditor() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

  const userTheme = 'vs-dark';

  const monacoOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    padding: {
      top: 8,
    },
  };

  function handleEditorSaveAction(editor: monaco.editor.IStandaloneCodeEditor) {
    console.log('executed save');
  }

  function handleSampleDataAction(editor: monaco.editor.IStandaloneCodeEditor) {
    const value = editor.getValue();
    if (value.length > 0) {
      editor.setValue(value + '\n' + sampleCode);
    } else {
      editor.setValue(sampleCode);
    }
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor;

    editor.addAction({
      id: 'save-action',
      label: 'MonaPaste: Save paste contents',
      contextMenuGroupId: 'MonaPaste',
      run: handleEditorSaveAction,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    });

    editor.addAction({
      id: 'sample-data-action',
      label: 'MonaPaste: Append sample code',
      contextMenuGroupId: 'MonaPaste',
      run: handleSampleDataAction,
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Insert,
      ],
    });
  }

  return (
    <Editor
      theme={userTheme}
      defaultLanguage="javascript"
      defaultValue={null}
      onMount={handleEditorDidMount}
      options={monacoOptions}
    />
  );
}

export default NormalEditor;
