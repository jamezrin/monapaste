import styled from '@emotion/styled';

export const BaseMain = styled.main`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const BaseHeader = styled.header`
  --height: 40px;
  height: var(--height);
  min-height: var(--height);
  background: var(--gray-12);

  display: flex;
  flex-direction: row;
`;

export const BaseBody = styled.section`
  flex-grow: 1;
  overflow: hidden;
`;
