import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { css } from '@emotion/react';
import { Paste } from '@prisma/client';

export type HeaderEditableTitleProps = {
  paste?: Paste;
  isEditable: boolean;
  defaultTitle: string;
  onPasteTitleEdit: OnPasteTitleEdit;
};

export type OnPasteTitleEdit = (oldTitle: string, newTitle: string) => void;

function HeaderEditableTitle({
  paste,
  defaultTitle,
  onPasteTitleEdit,
  isEditable = true,
}: HeaderEditableTitleProps) {
  const [title, setTitle] = useState(() =>
    paste ? paste.title : defaultTitle,
  );

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
      const newTitle = titleElRef.current.innerText;
      if (newTitle !== title) {
        onPasteTitleEdit(title, newTitle);
        setTitle(newTitle);
      }
    }
  };

  return (
    <p
      ref={titleElRef}
      spellCheck="false"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      css={css`
        align-items: center;
        color: var(--gray-6);
        outline: none;
        margin: 0 auto;
        padding: 3px 6px;
        border-radius: 3px;

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
      `}
    >
      {title}
    </p>
  );
}

export default HeaderEditableTitle;
