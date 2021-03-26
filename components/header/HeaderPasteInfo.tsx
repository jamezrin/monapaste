import { css } from '@emotion/react';

import HeaderEditableTitle from './HeaderEditableTitle';

function HeaderPasteInfo() {
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
      <HeaderEditableTitle />
    </div>
  );
}

export default HeaderPasteInfo;
