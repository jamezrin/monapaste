import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderPasteInfo from 'components/header/HeaderPasteInfoSection';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import HeaderPasteTitle from 'components/header/HeaderPasteTitle';
import HeaderActionButton from 'components/header/HeaderActionButton';
import NormalEditor from 'components/editor/NormalEditor';
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
import { ApiError } from 'lib/errors';
import { OnPasteTitleEdit } from 'components/header/HeaderPasteTitle';

type UserPrefs = {
  userTheme: string;
};

export type SinglePagePasteProps = {
  paste?: Paste;
  pasteRev?: PasteRev;
  userPrefs: UserPrefs;
  error?: ApiError;
};

function SinglePastePage({
  paste,
  pasteRev,
  userPrefs,
  error,
}: SinglePagePasteProps) {
  const [session, loading] = useSession();
  if (error) {
    return <div>{error.type}</div>;
  }

  const handlePasteTitleEdit = (oldTitle: string, newTitle: string) => {};

  const handleTitleChange = () => {};

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start">
          <HeaderActionButton>
            <VscSave title="Save" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscRepoForked title="Fork" />
          </HeaderActionButton>
          <HeaderActionButton>
            <VscNewFile title="New" />
          </HeaderActionButton>
          <HeaderActionButton>
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
        <NormalEditor
          defaultContent={pasteRev.content}
          defaultLanguage={pasteRev.languageName}
        />
      </BaseBody>
    </BaseMain>
  );
}

export default SinglePastePage;
