import { useRef, useEffect, KeyboardEvent, FocusEvent } from 'react';

import styled from '@emotion/styled';

export type OnPasteTitleEdit = (oldTitle: string, newTitle: string) => void;

export type HeaderPasteTitleProps = {
  pasteTitle: string;
  onPasteTitleEdit: OnPasteTitleEdit;
  isEditable?: boolean;
};

const TitleParagraph = styled.p`
  align-items: center;
  color: var(--gray-6);
  outline: none;
  margin: 0 auto;
  padding: 3px 6px;
  border-radius: 3px;
  white-space: nowrap;

  &:hover,
  &:active,
  &:focus {
    background: var(--gray-11);
  }

  &:focus {
    border: 1px solid var(--gray-8);
    color: var(--gray-5);
    width: 100%;
  }
`;

function HeaderPasteTitle({
  pasteTitle,
  onPasteTitleEdit,
  isEditable = true,
}: HeaderPasteTitleProps) {
  const titleElRef = useRef<HTMLParagraphElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape' || e.code === 'Enter') {
      e.preventDefault();
      if (titleElRef.current) {
        titleElRef.current.blur();
      }
    }
  };

  const handleBlur = (e: FocusEvent) => {
    if (titleElRef.current) {
      const newTitleInput = titleElRef.current.innerText;
      if (pasteTitle !== newTitleInput) {
        if (newTitleInput.trim().length > 0) {
          onPasteTitleEdit(pasteTitle, newTitleInput);
        } else {
          titleElRef.current.innerText = pasteTitle;
        }
      }
    }
  };

  return (
    <TitleParagraph
      ref={titleElRef}
      spellCheck="false"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}>
      {pasteTitle}
    </TitleParagraph>
  );
}

export default HeaderPasteTitle;
