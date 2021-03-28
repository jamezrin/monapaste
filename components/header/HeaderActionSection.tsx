import styled from '@emotion/styled';

type HeaderActionSectionProps = {
  direction?: 'start' | 'end';
};

const HeaderActionSection = styled.div<HeaderActionSectionProps>`
  display: flex;
  flex-direction: row;
  flex-basis: 30%;
  justify-content: ${(props) => `flex-${props.direction}`};
`;

HeaderActionSection.defaultProps = {
  direction: 'start',
};

export default HeaderActionSection;
