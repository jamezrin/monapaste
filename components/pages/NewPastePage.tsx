import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Monaco } from '@monaco-editor/react';
import axios from 'axios';
import { VscSave, VscNewFile } from 'react-icons/vsc';

import NormalEditor from 'components/editor/NormalEditor';
import HeaderPasteTitle from 'components/header/HeaderPasteTitle';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderActionButton from 'components/header/HeaderActionButton';
import HeaderActionSection from 'components/header/HeaderActionSection';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import { PasteDraft, usePasteDraft } from 'lib/context/PasteDraftContext';

function NewPastePage() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { pasteDraft, updatePasteDraft, resetPasteDraft } = usePasteDraft();
  const editorRef = useRef<any>(null);

  const handleTitleChange = (oldTitle: string, newTitle: string) => {
    updatePasteDraft((state) => ({
      ...state,
      title: newTitle,
    }));
  };

  const editorContentChangeTimeoutRef = useRef<number | null>(null);
  const handleEditorContentChange = () => {
    if (editorContentChangeTimeoutRef.current) {
      clearTimeout(editorContentChangeTimeoutRef.current);
      editorContentChangeTimeoutRef.current = null;
    }

    const content = editorRef.current.getValue();

    editorContentChangeTimeoutRef.current = window.setTimeout(() => {
      updatePasteDraft((state) => ({
        ...state,
        content,
      }));

      editorContentChangeTimeoutRef.current = null;
    }, 750);
  };

  const createPasteAndRedirect = async () => {
    const response = await axios.post('/api/paste/create', pasteDraft.content, {
      headers: {
        'Content-Type': 'text/plain',
      },
      params: {
        title: pasteDraft.title,
        language: pasteDraft.language,
        visibility: pasteDraft.visibility,
      },
      withCredentials: true,
    });

    resetPasteDraft();

    const pasteId = response.data.id;
    router.push({
      pathname: '/[pasteId]',
      query: {
        pasteId: pasteId,
      },
    });
  };

  /**
   * Prevent stale state because of callback function memoization
   * Use this for functions used by the editor (onContentSave, onContentChange)
   *
   * https://github.com/facebook/react/issues/16154
   * https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
   * https://codesandbox.io/s/admiring-noyce-w0s6o
   */
  const pasteDraftRef = useRef<PasteDraft>();
  useEffect(() => {
    pasteDraftRef.current = pasteDraft;
  });

  const [shouldCreate, setShouldCreate] = useState(false);
  const handleEditorContentSave = () => {
    if (editorContentChangeTimeoutRef.current) {
      clearTimeout(editorContentChangeTimeoutRef.current);
      editorContentChangeTimeoutRef.current = null;

      const pasteDraft = pasteDraftRef.current;
      const content = editorRef.current.getValue();

      updatePasteDraft({
        ...pasteDraft,
        content,
      });
    }

    setShouldCreate(true);
  };

  useEffect(() => {
    if (shouldCreate) {
      createPasteAndRedirect();
    }
  }, [shouldCreate]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
  };

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start">
          <HeaderActionButton onClick={(e) => handleEditorContentSave()}>
            <VscSave title="Save" />
          </HeaderActionButton>
          <HeaderActionButton onClick={(e) => resetPasteDraft()}>
            <VscNewFile title="Reset" />
          </HeaderActionButton>
        </HeaderActionSection>

        <HeaderPasteInfoSection>
          <HeaderPasteTitle
            pasteTitle={pasteDraft.title}
            onPasteTitleEdit={handleTitleChange}
          />
        </HeaderPasteInfoSection>

        <HeaderActionSection direction="end">
          <HeaderHelpAction />
          {session ? (
            <HeaderUserProfile session={session} />
          ) : (
            <HeaderLoginAction />
          )}
        </HeaderActionSection>
      </BaseHeader>

      <BaseBody>
        <NormalEditor
          content={pasteDraft.content}
          language={pasteDraft.language}
          onContentSave={handleEditorContentSave}
          onContentChange={handleEditorContentChange}
          onEditorDidMount={handleEditorDidMount}
        />
      </BaseBody>
    </BaseMain>
  );
}

export default NewPastePage;
