import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderActionButton from 'components/header/HeaderActionButton';
import NormalEditor from 'components/editor/NormalEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import HeaderActionSection from 'components/header/HeaderActionSection';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import { usePasteDraft } from 'lib/context/PasteDraftContext';
import { VscSave, VscDiscard, VscNewFile } from 'react-icons/vsc';
import { Paste } from '@prisma/client';
import HeaderPasteTitle from 'components/header/HeaderPasteTitle';
import { useRouter } from 'next/router';
import axios from 'axios';

function NewPastePage() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { pasteDraft, setPasteDraft, resetPasteDraft } = usePasteDraft();

  const handleTitleChange = (oldTitle: string, newTitle: string) => {
    setPasteDraft((state) => ({
      ...state,
      title: newTitle,
    }));
  };

  const editorContentChangeTimeoutRef = useRef<number | null>(null);
  const handleEditorContentChange = (content: string) => {
    if (editorContentChangeTimeoutRef.current) {
      clearTimeout(editorContentChangeTimeoutRef.current);
      editorContentChangeTimeoutRef.current = null;
    }

    editorContentChangeTimeoutRef.current = window.setTimeout(() => {
      setPasteDraft((state) => ({
        ...state,
        content,
      }));

      editorContentChangeTimeoutRef.current = null;
    }, 750);
  };

  const handleEditorContentSave = async () => {
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
    
    router.push('/' + response.data.id);
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
        />
      </BaseBody>
    </BaseMain>
  );
}

export default NewPastePage;
