import { createElement as e } from 'react';
import classNames from 'classnames';
import t from '../../assets/tailwind.module.css';

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

export function Button({...props}) {
  return e('button', {
    ...props,
    className: classNames(btn, props.className)
  });
}