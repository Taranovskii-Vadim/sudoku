import { useRecoilValue } from 'recoil';

import { levelsState } from 'src/store/levels';

import Card from './components/Card';

const Home = (): JSX.Element => {
  const state = useRecoilValue(levelsState);

  return (
    <div className="flex items-center justify-around h-full">
      {state.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Home;
