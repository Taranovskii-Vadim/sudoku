import { useRecoilValue } from 'recoil';

import { levelsState } from 'src/store/levels';

import Flexbox from 'src/components/Flexbox';

import Card from './components/Card';

const Home = (): JSX.Element => {
  const state = useRecoilValue(levelsState);

  return (
    <Flexbox height="100%">
      {state.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </Flexbox>
  );
};

export default Home;
