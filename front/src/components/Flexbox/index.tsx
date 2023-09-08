import styled from 'styled-components';

type Props = {
  height?: string;
};

const Flexbox = styled.div<Props>`
  height: ${({ height }) => height || 'initial'};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Flexbox;
