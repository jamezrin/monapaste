import { useState } from 'react';
import { signOut } from 'next-auth/client';
import { css } from '@emotion/react';

import useOuterClick from 'lib/hooks/useOuterClick';
import { Session } from 'next-auth';

function UserProfileButton(props) {
  return (
    <div
      {...props}
      css={css`
        background: var(--gray-11);
        padding: 0.25em 0.5em;
        color: var(--gray-6);
      `}
      role="button"
      aria-pressed="false"
      tabIndex={0}
    >
      {props.children}
    </div>
  );
}

type Props = {
  session: Session;
};

function HeaderUserProfile({ session }: Props) {
  const [open, setOpen] = useState(false);
  const userAreaRef = useOuterClick(() => {
    setOpen(false);
  });

  return (
    <div
      css={css`
        position: relative;
      `}
      ref={userAreaRef}
      onClick={() => setOpen(!open)}
    >
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 0.45em;
          user-select: none;
          cursor: pointer;

          background: var(${open ? '--gray-11' : '--gray-15'});

          &:hover {
            background: var(--gray-11);
          }
        `}
      >
        <div
          css={css`
            --diameter: 35px;
            width: var(--diameter);
            height: var(--diameter);
            flex-shrink: 0;

            border-radius: 50%;
            border: 1px solid var(--gray-8);
            background-color: var(--gray-5);

            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
            background-image: url(${session.user.image});
          `}
        />

        <div
          css={css`
            padding: 0 1em;
            color: var(--gray-4);
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {session.user.name}
        </div>
      </div>

      <div
        css={css`
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 10000;
          display: ${open ? 'block' : 'none'};
        `}
      >
        <UserProfileButton>Your pastes</UserProfileButton>
        <UserProfileButton>Liked pastes</UserProfileButton>
        <UserProfileButton>Public pastes</UserProfileButton>
        <UserProfileButton>Preferences</UserProfileButton>
        <UserProfileButton onClick={() => signOut()}>Logout</UserProfileButton>
      </div>
    </div>
  );
}

export default HeaderUserProfile;
