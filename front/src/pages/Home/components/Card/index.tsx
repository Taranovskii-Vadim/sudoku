import { NavLink } from 'react-router-dom';

import { getGamePagePath } from 'src/routes';
import { Level } from 'src/store/levels/types';

interface Props {
  data: Level;
}

const Card = ({ data: { id, title, img } }: Props): JSX.Element => (
  <NavLink to={getGamePagePath(id)}>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <img className="rounded-t-lg h-40 object-cover w-full" src={img} alt={`${id} mode image`} />
      <div className="p-5">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      </div>
    </div>
  </NavLink>
);

export default Card;
