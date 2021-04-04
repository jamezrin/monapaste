import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';
import { useRef } from 'react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderPasteInfo from 'components/header/HeaderPasteInfoSection';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import HeaderPasteTitle from 'components/header/HeaderPasteTitle';
import HeaderActionButton from 'components/header/HeaderActionButton';
import DiffPasteEditor from 'components/editor/DiffPasteEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import HeaderActionSection from 'components/header/HeaderActionSection';
import { User, Paste, PasteRev } from '@prisma/client';
import {
  VscCode,
  VscHeart,
  VscHistory,
  VscNewFile,
  VscRepoForked,
  VscSave,
  VscSettings,
} from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { AppError } from 'lib/errors';
import axios from 'axios';
import { Monaco } from '@monaco-editor/react';

type UserPrefs = {
  userTheme: string;
};

export type DiffPastePageProps = {
  paste?: Paste;
  pasteRev?: PasteRev;
  userPrefs: UserPrefs;
  error?: AppError;
};

function DiffPastePage({
  paste,
  pasteRev,
  userPrefs,
  error,
}: DiffPastePageProps) {
  const [session, loading] = useSession();
  const router = useRouter();
  const editorRef = useRef<any>(null);

  if (error) {
    return <div>{error.type}</div>;
  }

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
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

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start"></HeaderActionSection>

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
        <DiffPasteEditor />
      </BaseBody>
    </BaseMain>
  );
}

export default DiffPastePage;
