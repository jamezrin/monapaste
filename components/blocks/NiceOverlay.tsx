import { useRef, useState, useEffect, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  opacity?: number;
};

const overlayElementId = 'niceoverlay-portal';

const defaultOpacity = 0.4;

const OverlayInner = styled.div<{ opacity: number } & any>`
  z-index: 99999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, ${(props) => props.opacity});
`;

function NiceOverlay({
  opacity = defaultOpacity,
  isOpen,
  children,
  ...restProps
}: OverlayProps) {
  const portalElementRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      portalElementRef.current = document.createElement('div');
      portalElementRef.current.setAttribute('id', overlayElementId);
      document.body.appendChild(portalElementRef.current);
    }

    setRender(isOpen);

    return () => {
      if (portalElementRef.current) {
        document.body.removeChild(portalElementRef.current);
        portalElementRef.current = null;
      }
    };
  }, [isOpen]);

  if (!render) {
    return null;
  }

  return createPortal(
    <OverlayInner opacity={opacity} {...restProps}>
      {children}
    </OverlayInner>,
    portalElementRef.current,
  );
}

export default NiceOverlay;
