import { useRef, useEffect, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { api } from 'src/api';
import postGame from 'src/api/postGame';

import { gameQuery } from 'src/store/game';

import { Arrow } from './types';

type Props = { mode: GameMode };

const Form = styled.form<Props>`
  margin: auto;
  display: grid;
  gap: 1rem;
  padding-top: 12px;
  max-width: ${({ mode }) => (mode === 'easy' ? 20 : 36)}rem;
  grid-template-columns: repeat(${({ mode }) => (mode === 'easy' ? 4 : 9)}, minmax(0, 1fr));
`;

const Field = styled.input<{ color: string | false }>`
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.625rem;
  background-color: #f9fafb;
  color: ${({ color }) => color || '#111827'};
  &:focus {
    border-color: #3b82f6;
  }
`;

const Submit = styled.button<Props & { isDone: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: ${({ isDone }) => (isDone ? '#15803d' : '#1d4ed8')};
  grid-column: ${({ mode }) => (mode === 'easy' ? 'span 4 / span 4' : 'span 9 / span 9')};
  &:hover {
    background-color: ${({ isDone }) => (isDone ? '#166534' : '#1e40af')};
  }
`;

const Loader = styled.svg`
  color: white;
  display: inline;
  margin-right: 0.75rem;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Game = (): JSX.Element => {
  const { mode } = useParams<{ mode: GameMode }>();
  const { id, template } = useRecoilValue(gameQuery(mode));

  const payloadRef = useRef(template);
  const config = { length: template.length };

  const [isLoading, setIsLoading] = useState(false);

  const errorsInit = Array.from(config, () => Array.from<boolean>(config));
  const ref = useRef<HTMLInputElement[][]>(Array.from(config, () => Array.from(config)));

  const [errors, setErrors] = useState(errorsInit);

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
    try {
      e.preventDefault();

      setIsLoading(true);
      const response = await api(postGame, undefined, { id, template: payloadRef.current, mode });

      setErrors(response);
    } finally {
      setIsLoading(false);
    }
  };

  const isDone = errors.every((row) => row.every((item) => item === false));

  return (
    <Form mode={mode as GameMode} onSubmit={handleSubmit}>
      {template.map((row, y) =>
        row.map((value, x) => (
          <Field
            type="text"
            defaultValue={value}
            key={`${value}${x}`}
            color={errors[y][x] && '#dc2626'}
            onChange={(e) => handleChange(y, x, e.target.value)}
            ref={(el) => (ref.current[y][x] = el as HTMLInputElement)}
            onKeyDown={(e) => handleFocusInput(e.key.toLowerCase() as Arrow, y, x)}
          />
        )),
      )}
      <Submit isDone={isDone} mode={mode as GameMode} type="submit" disabled={isLoading || isDone}>
        {isLoading ? (
          <Loader aria-hidden="true" role="status" viewBox="0 0 100 101" fill="none">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </Loader>
        ) : null}
        {isLoading ? 'Обработка результатов...' : isDone ? 'Решено!!!' : 'Проверить решение'}
      </Submit>
    </Form>
  );
};

export default Game;
