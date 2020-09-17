import { createElement as e } from 'react';
import { useStore } from '../../lib/components/StoreLayer';
import t from '../../lib/tailwind.css';
import classNames from 'classnames';

const btn = classNames(
  t.ml_4,
  t.bg_transparent,
  t.text_blue_700,
  t.font_semibold,
  t.py_2,
  t.px_4,
  t.border,
  t.border_blue_300,
  t.rounded,
  t.hover_border_blue_400,
  t.focus_bg_blue_100,
  t.hover_bg_blue_100
);

const box = classNames(t.mt_4, t.ml_4);

export function App() {
  const [count, setCount] = useStore((state) => state.count);
  return e('div', {className: box},
    `Hello ${count}`,
    e('button', {
      className: btn,
      onClick: () => setCount((state) => {
        state.count += 1;
      })
    }, 'Click!')
  );
}