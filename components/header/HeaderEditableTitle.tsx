import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { css } from '@emotion/react';

function HeaderEditableTitle() {
  const [paste, setPaste] = useState({
    title: 'Unnamed Paste',
  });

  const titleElRef = useRef<HTMLParagraphElement>(null);
  const [title, setTitle] = useState(() => paste.title);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape' || e.code === 'Enter') {
      e.preventDefault();
      titleElRef.current.blur();
    }
  };

  const handleInput = (e: FormEvent) => {
    setTitle(titleElRef.current.innerText);
  };

  const handleBlur = (e: FocusEvent) => {
    if (paste.title !== title) {
      setPaste({
        ...paste,
        title,
      });

      // TODO: update paste title
      console.log('paste rename to ', title);
    }
  };

  useEffect(() => {
    titleElRef.current.innerText = paste.title;
  }, [paste.title]);

  return (
    <p
      contentEditable="true"
      spellCheck="false"
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
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onBlur={handleBlur}
      ref={titleElRef}
    />
  );
}

export default HeaderEditableTitle;
