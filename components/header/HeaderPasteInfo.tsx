import { css } from '@emotion/react';

import HeaderEditableTitle from './HeaderEditableTitle';

function HeaderPasteInfo({ paste }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
        margin: 0 1em;
      `}
    >
      <HeaderEditableTitle paste={paste} />
    </div>
  );
}

export default HeaderPasteInfo;
