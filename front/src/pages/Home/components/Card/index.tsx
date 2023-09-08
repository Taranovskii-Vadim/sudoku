import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { getGamePagePath } from 'src/routes';
import { Level } from 'src/store/levels/types';

import HeadingFive from 'src/components/HeadingFive';

interface Props {
  data: Level;
}

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  max-width: 24rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const TextWrapper = styled.div`
  padding: 20px;
`;

const Card = ({ data: { id, title, img } }: Props): JSX.Element => (
  <NavLink style={{ textDecoration: 'none' }} to={getGamePagePath(id)}>
    <Wrapper>
      <Image src={img} alt={`${id} mode image`} />
      <TextWrapper>
        <HeadingFive>{title}</HeadingFive>
      </TextWrapper>
    </Wrapper>
  </NavLink>
);

export default Card;
