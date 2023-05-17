import { useRef, useEffect, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { api } from 'src/api';
import postGame from 'src/api/postGame';

import { gameQuery } from 'src/store/game';

type Arrow = 'arrowright' | 'arrowleft' | 'arrowup' | 'arrowdown';

const Game = (): JSX.Element => {
  const { mode } = useParams<{ mode: GameMode }>();
  const { id, template } = useRecoilValue(gameQuery(mode));

  const payloadRef = useRef(template);
  const config = { length: template.length };
  const ref = useRef<HTMLInputElement[][]>(Array.from(config, () => Array.from(config)));

  const initialErrors = Array.from(config, () => Array.from<boolean>(config));

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    ref.current[0][0].focus();
  }, []);

  const handleFocusInput = (key: Arrow, y: number, x: number): void => {
    let node;
    const nodes = ref.current;

    switch (key) {
      case 'arrowright':
        node = nodes[y][x + 1];
        break;
      case 'arrowleft':
        node = nodes[y][x - 1];
        break;
      case 'arrowup':
        node = nodes[y - 1];
        break;
      case 'arrowdown':
        node = nodes[y + 1];
        break;
      default:
        ref.current[y][x].focus();
        break;
    }

    node && (Array.isArray(node) ? node[x].focus() : node.focus());
  };

  const handleChange = (y: number, x: number, value: string): void => {
    // TODO got no idea but we get error here, in next js this is file solution without erros
    // payloadRef.current[y][x] = value;

    payloadRef.current = payloadRef.current.map((row, rowIndex) => {
      if (rowIndex === y) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === x) {
            return value;
          }
          return cell;
        });
      }

      return row;
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (isDone) return;

    try {
      const response = await api(postGame, undefined, { id, template: payloadRef.current, mode });

      // setIsLoading(true);

      setErrors(response);
    } finally {
      // setIsLoading(false);
    }
  };

  const isDone = errors.every((row) => row.every((item) => item === false));

  const btnColorType = isDone ? 'green' : 'blue';
  const buttonSize = mode === 'easy' ? 'col-span-4' : 'col-span-9';
  const buttonColor = `bg-${btnColorType}-700 hover:bg-${btnColorType}-800`;

  const buttonStyle = `${buttonSize} ${buttonColor}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid m-auto ${mode === 'easy' ? 'grid-cols-4 max-w-xs' : 'grid-cols-9 max-w-xl'} gap-4`}
    >
      {template.map((row, y) =>
        row.map((value, x) => {
          const color = errors[y][x] ? 'text-red-600' : 'text-black';

          return (
            <input
              defaultValue={value}
              key={`${value}${x}`}
              onChange={(e) => handleChange(y, x, e.target.value)}
              ref={(el) => (ref.current[y][x] = el as HTMLInputElement)}
              onKeyDown={(e) => handleFocusInput(e.key.toLowerCase() as Arrow, y, x)}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 text-center ${color}`}
            />
          );
        }),
      )}
      <button className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none ${buttonStyle}`}>
        {isDone ? 'Решено!!!' : 'Проверить решение'}
      </button>
    </form>
  );
};

export default Game;
