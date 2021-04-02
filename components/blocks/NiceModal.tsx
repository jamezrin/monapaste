import { HTMLAttributes, KeyboardEvent } from 'react';
import { css } from '@emotion/react';

import useOuterClick from 'lib/hooks/useOuterClick';
import NiceOverlay from './NiceOverlay';

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onFocusOutside?: () => any;
  overlayOpacity?: number;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
};

function NiceModal({
  isOpen,
  onFocusOutside,
  overlayOpacity,
  children,
  wrapperProps,
  ...restProps
}: ModalProps) {
  const modalInnerRef = useOuterClick(() => {
    if (onFocusOutside) onFocusOutside();
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      e.preventDefault();
      if (onFocusOutside) onFocusOutside();
    }
  };

  return (
    <NiceOverlay
      isOpen={isOpen}
      opacity={overlayOpacity}
      onKeyDown={handleKeyDown}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
      {...restProps}
    >
      <div ref={modalInnerRef} id="nicemodal-wrapper" {...wrapperProps}>
        {children}
      </div>
    </NiceOverlay>
  );
}

export default NiceModal;
