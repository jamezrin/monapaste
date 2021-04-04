import { HTMLAttributes, KeyboardEvent } from 'react';

import { css } from '@emotion/react';

import useOuterClick from '@/lib/hooks/useOuterClick';

import NiceOverlay from './NiceOverlay';

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onShouldClose?: (reason: CloseReason) => void;
  overlayOpacity?: number;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  [x: string]: any;
};

export enum CloseReason {
  CLICK_OUTSIDE = 'CLICK_OUTSIDE',
  ESCAPE_PRESSED = 'ESCAPE_PRESSED',
  OTHER = 'OTHER',
}

function NiceModal({
  isOpen,
  onShouldClose,
  overlayOpacity,
  children,
  wrapperProps,
  ...restProps
}: ModalProps) {
  const modalInnerRef = useOuterClick(() => {
    if (onShouldClose) {
      onShouldClose(CloseReason.CLICK_OUTSIDE);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      e.preventDefault();
      if (onShouldClose) {
        onShouldClose(CloseReason.ESCAPE_PRESSED);
      }
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
      {...restProps}>
      <div ref={modalInnerRef} id="nicemodal-wrapper" {...wrapperProps}>
        {children}
      </div>
    </NiceOverlay>
  );
}

export default NiceModal;
