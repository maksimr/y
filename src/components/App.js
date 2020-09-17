import { createElement as e } from 'react';
import { useStore } from '../../lib/components/StoreLayer';

export function App() {
  const [count, setCount] = useStore((state) => state.count);
  return e('div', null,
    `Hello ${count}`,
    e('button', {
      onClick: () => setCount((state) => {
        state.count += 1;
      })
    }, 'Click!')
  );
}