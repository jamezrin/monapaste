import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import styles from '../../styles/Header.module.css';

function HeaderTitle() {
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
      className={styles.title}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onBlur={handleBlur}
      ref={titleElRef}
    />
  );
}

export default HeaderTitle;
