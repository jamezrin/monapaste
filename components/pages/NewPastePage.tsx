import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';
import { useCallback, useContext, useRef, useState } from 'react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderActionButton from 'components/header/HeaderActionButton';
import NormalEditor from 'components/editor/NormalEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import HeaderActionSection from 'components/header/HeaderActionSection';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import PasteDraftContext, {
  usePasteDraft,
} from 'lib/context/PasteDraftContext';
import { VscSave, VscDiscard, VscNewFile, VscArchive } from 'react-icons/vsc';
import { Paste } from '@prisma/client';
import HeaderPasteTitle from 'components/header/HeaderPasteTitle';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Monaco } from '@monaco-editor/react';

function NewPastePage() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { pasteDraft, setPasteDraft, resetPasteDraft } = useContext(
    PasteDraftContext,
  );
  const editorRef = useRef<any>(null);

  const handleTitleChange = (oldTitle: string, newTitle: string) => {
    setPasteDraft((state) => ({
      ...state,
      title: newTitle,
    }));
  };

  const editorContentChangeTimeoutRef = useRef<number | null>(null);
  const handleEditorContentChange = () => {
    console.log('content change');

    if (editorContentChangeTimeoutRef.current) {
      clearTimeout(editorContentChangeTimeoutRef.current);
      editorContentChangeTimeoutRef.current = null;
    }

    const content = editorRef.current.getValue();

    editorContentChangeTimeoutRef.current = window.setTimeout(() => {
      setPasteDraft((state) => ({
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

    //resetPasteDraft();

    const pasteId = response.data.id;
    router.push('/' + pasteId);
  };

  const handleEditorContentSave = useCallback(() => {
    console.log('paste create', pasteDraft);
    //createPasteAndRedirect();
  }, []);

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
          <HeaderActionButton
            onClick={(e) => {
              console.log('meme', pasteDraft);
            }}
          >
            <VscArchive title="ASD" />
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
