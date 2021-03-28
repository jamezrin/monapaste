import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import {
  makeEditorOptions,
  registerSampleDataAction,
  registerSaveAction,
  StandaloneCodeEditor,
  StandaloneCodeEditorConstructionOpts,
} from 'lib/monaco';

type Props = {
  content: string;
  language: string;
  userTheme?: string;
};

function NormalEditor({ content, language, userTheme }: Props) {
  //const editorRef = useRef<StandaloneCodeEditor>(null);

  function handleEditorDidMount(editor: StandaloneCodeEditor, monaco: Monaco) {
    //editorRef.current = editor;
    registerSampleDataAction(editor);
    registerSaveAction(editor, () => {
      // TODO: Handle save
    });
  }

  function handleEditorWillMount(monaco: Monaco) {
    // TODO: Register other languages
  }

  return (
    <Editor
      theme={userTheme}
      defaultLanguage={language}
      defaultValue={content}
      beforeMount={handleEditorWillMount}
      //onMount={handleEditorDidMount}
      options={makeEditorOptions()}
    />
  );
}

NormalEditor.defaultProps = {
  userTheme: 'vs-dark',
};

export default NormalEditor;
