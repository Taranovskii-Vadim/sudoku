import Card from './components/Card';

import { LEVELS } from './constants';

const Home = (): JSX.Element => (
  <div className="flex items-center justify-around h-full">
    {LEVELS.map((item) => (
      <Card key={item.id} data={item} />
    ))}
  </div>
);

export default Home;
