import axios from 'axios';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  VscCode,
  VscHeart,
  VscHistory,
  VscNewFile,
  VscRepoForked,
  VscSave,
  VscSettings,
} from 'react-icons/vsc';

import { css } from '@emotion/react';
import { Monaco } from '@monaco-editor/react';
import { User, Paste, PasteRev } from '@prisma/client';

import SinglePasteEditor from '@/components/editor/SinglePasteEditor';
import HeaderActionButton from '@/components/header/HeaderActionButton';
import HeaderActionSection from '@/components/header/HeaderActionSection';
import HeaderHelpAction from '@/components/header/HeaderHelpAction';
import HeaderLoginAction from '@/components/header/HeaderLoginAction';
import HeaderPasteInfo from '@/components/header/HeaderPasteInfoSection';
import HeaderPasteInfoSection from '@/components/header/HeaderPasteInfoSection';
import HeaderPasteTitle from '@/components/header/HeaderPasteTitle';
import HeaderUserProfile from '@/components/header/HeaderUserProfile';
import { BaseMain, BaseHeader, BaseBody } from '@/components/layout/BaseLayout';
import { AppError } from '@/lib/errors';

type UserPrefs = {
  userTheme: string;
};

export type SinglePagePasteProps = {
  paste?: Paste;
  pasteRev?: PasteRev;
  userPrefs: UserPrefs;
  error?: AppError;
};

function SinglePastePage({
  paste,
  pasteRev,
  userPrefs,
  error,
}: SinglePagePasteProps) {
  const [session, loading] = useSession();
  const router = useRouter();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const [language, setLanguage] = useState<string>();

  if (error) {
    return <div>{error.type}</div>;
  }

  const handleEditorDidMount = (editor, monaco: Monaco) => {
    editorRef.current = editor;
  };

  const handleTitleChange = (oldTitle: string, newTitle: string) => {
    axios.post(
      `/api/paste/${paste.id}/rename`,
      {},
      {
        params: { title: newTitle },
        withCredentials: true,
      },
    );
  };

  const handleOpenNew = (e) => {
    router.push('/');
  };

  const handleOpenRaw = (e) => {
    router.push(`/${paste.id}/raw`);
  };

  const updatePasteNewRev = () => {
    const content = editorRef.current.getValue();

    axios.post(`/api/paste/${paste.id}/rev_create`, content, {
      headers: { 'Content-Type': 'text/plain' },
      params: { language: language },
      withCredentials: true,
    });

    //router.replace(router.asPath);
  };

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start">
          <HeaderActionButton onClick={(e) => updatePasteNewRev()}>
            <VscSave title="Save" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscRepoForked title="Fork" />
          </HeaderActionButton>
          <HeaderActionButton onClick={handleOpenNew}>
            <VscNewFile title="New" />
          </HeaderActionButton>
          <HeaderActionButton onClick={handleOpenRaw}>
            <VscCode title="Raw" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscHeart title="Heart" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscHistory title="Revisions" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscSettings title="Settings" />
          </HeaderActionButton>
        </HeaderActionSection>

        <HeaderPasteInfoSection>
          <HeaderPasteTitle
            pasteTitle={paste.title}
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
          defaultContent={pasteRev.content}
          defaultLanguage={pasteRev.languageName}
          onContentSave={() => updatePasteNewRev()}
          onEditorDidMount={handleEditorDidMount}
        />
      </BaseBody>
    </BaseMain>
  );
}

export default SinglePastePage;
