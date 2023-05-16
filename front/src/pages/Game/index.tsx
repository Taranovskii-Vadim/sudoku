import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { gameQuery } from 'src/store/game';

type Arrow = 'arrowright' | 'arrowleft' | 'arrowup' | 'arrowdown';

const Game = (): JSX.Element => {
  const { mode } = useParams<{ mode: GameMode }>();
  const { id, template } = useRecoilValue(gameQuery(mode));

  const config = { length: template.length };
  const payloadRef = useRef(template);
  const ref = useRef<HTMLInputElement[][]>(Array.from(config, () => Array.from(config)));

  useEffect(() => {
    ref.current[0][0].focus();
  }, []);

  const handleFocusInput = (key: Arrow, y: number, x: number): void => {
    let node;
    const nodes = ref.current;

    // if (errors[y][x]) {
    //   const copy = JSON.parse(JSON.stringify(errors));
    //   copy[y][x] = null;

    //   setErrors(copy);
    // }

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
    payloadRef.current[y][x] = value;
  };

  // const handleSubmit = async (e: FormEvent): Promise<void> => {
  //   try {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     const body = JSON.stringify({ id, data: payloadRef.current, mode });
  //     const config = { method: 'POST', body };

  //     const response = await fetch(`${API_PREFIX}/game/check`, config);
  //     const errors: boolean[][] = await response.json();

  //     setErrors(errors);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <form className={`grid grid-cols-${mode === 'easy' ? 4 : 9} gap-4`}>
      {template.map((row, y) =>
        row.map((value, x) => (
          <input
            value={value}
            key={`${value}${x}`}
            onChange={(e) => handleChange(y, x, e.target.value)}
            ref={(el) => (ref.current[y][x] = el as HTMLInputElement)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 text-center"
            onKeyDown={(e) => handleFocusInput(e.key.toLowerCase() as Arrow, y, x)}
          />
          // <Grid key={`${value}${x}`} xs={12 / row.length}>
          //   <Input
          //     value={value}
          //     data-testid="inp"
          //     aria-label={`${y}${x}`}
          //     ref={(el) => (ref.current[y][x] = el as FormElement)}
          //     style={{ textAlign: 'center' }}
          //     status={!errors[y][x] ? 'default' : 'error'}
          //     onChange={(e) => handleChange(y, x, e.target.value)}
          //     onKeyDown={(e) => handleFocusInput(e.key.toLowerCase() as Arrow, y, x)}
          //   />
          // </Grid>
        )),
      )}
      <button className={`bg-slate-600 text-center`}>submit</button>
      {/* <Submit isDone={isDone} isLoading={isLoading} text={isDone ? 'Решено!!!' : 'Проверить решение'} /> */}
    </form>
  );
};

export default Game;
