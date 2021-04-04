import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { VscSave, VscNewFile, VscSettings } from 'react-icons/vsc';

import { css } from '@emotion/react';
import { Monaco } from '@monaco-editor/react';

import NiceModal from '@/components/blocks/NiceModal';
import SinglePasteEditor from '@/components/editor/SinglePasteEditor';
import HeaderActionButton from '@/components/header/HeaderActionButton';
import HeaderActionSection from '@/components/header/HeaderActionSection';
import HeaderHelpAction from '@/components/header/HeaderHelpAction';
import HeaderLoginAction from '@/components/header/HeaderLoginAction';
import HeaderPasteInfoSection from '@/components/header/HeaderPasteInfoSection';
import HeaderPasteTitle from '@/components/header/HeaderPasteTitle';
import HeaderUserProfile from '@/components/header/HeaderUserProfile';
import { BaseMain, BaseHeader, BaseBody } from '@/components/layout/BaseLayout';
import { PasteDraft, usePasteDraft } from '@/lib/context/PasteDraftContext';

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

  const clearContentChangeTimeout = () => {
    if (editorContentChangeTimeoutRef.current) {
      clearTimeout(editorContentChangeTimeoutRef.current);
      editorContentChangeTimeoutRef.current = null;
    }
  };

  const editorContentChangeTimeoutRef = useRef<number | null>(null);
  const handleEditorContentChange = () => {
    clearContentChangeTimeout();

    const content = editorRef.current.getValue();

    editorContentChangeTimeoutRef.current = window.setTimeout(() => {
      if (!shouldCreate) {
        updatePasteDraft((state) => ({
          ...state,
          content,
        }));
      }

      editorContentChangeTimeoutRef.current = null;
    }, 750);
  };

  const createPasteAndRedirect = async () => {
    clearContentChangeTimeout();

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

    const pasteId = response.data.id;
    router.push({
      pathname: '/[pasteId]',
      query: {
        pasteId: pasteId,
      },
    });

    resetPasteDraft();
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
  const handlePasteSave = () => {
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

  const handleResetAction = () => {
    clearContentChangeTimeout();
    resetPasteDraft();
  };

  useEffect(() => {
    if (shouldCreate) {
      createPasteAndRedirect();
    }
  }, [shouldCreate]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
  };

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const handleSettingsAction = () => {
    setSettingsOpen((currentOpen) => !currentOpen);
  };

  return (
    <>
      <NiceModal
        isOpen={settingsOpen}
        onShouldClose={(reason) => setSettingsOpen(false)}>
        <div
          css={css`
            width: 400px;
            height: 300px;
            background: #fff;
            border-radius: 4px;
          `}>
          Hello world!!
        </div>
      </NiceModal>
      <BaseMain>
        <BaseHeader>
          <HeaderActionSection direction="start">
            <HeaderActionButton onClick={(e) => handlePasteSave()}>
              <VscSave title="Save" />
            </HeaderActionButton>
            <HeaderActionButton onClick={(e) => handleResetAction()}>
              <VscNewFile title="Reset" />
            </HeaderActionButton>
            <HeaderActionButton onClick={(e) => handleSettingsAction()}>
              <VscSettings title="Settings" />
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
          <SinglePasteEditor
            content={pasteDraft.content}
            language={pasteDraft.language}
            onContentSave={handlePasteSave}
            onContentChange={handleEditorContentChange}
            onEditorDidMount={handleEditorDidMount}
          />
        </BaseBody>
      </BaseMain>
    </>
  );
}

export default NewPastePage;
