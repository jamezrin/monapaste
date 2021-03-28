import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { Monaco } from '@monaco-editor/react';

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

export type CodeEditor = monaco.editor.ICodeEditor;
export type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
export type StandaloneCodeEditorConstructionOpts = monaco.editor.IStandaloneEditorConstructionOptions;
export type ActionRunHandler = (editor: monaco.editor.ICodeEditor) => any;

function handleSampleDataAction(editor: StandaloneCodeEditor) {
  const value = editor.getValue();
  if (value.length > 0) {
    editor.setValue(value + '\n' + sampleCode);
  } else {
    editor.setValue(sampleCode);
  }
}

export function registerSampleDataAction(editor: StandaloneCodeEditor) {
  console.log(editor);

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

export function registerSaveAction(
  editor: StandaloneCodeEditor,
  actionHandler: ActionRunHandler,
) {
  console.log(editor);

  editor.addAction({
    id: 'save-action',
    label: 'MonaPaste: Save paste contents',
    contextMenuGroupId: 'MonaPaste',
    run: () => actionHandler(editor),
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  });
}

export const makeEditorOptions = (): StandaloneCodeEditorConstructionOpts => ({
  padding: {
    top: 8,
  },
});
