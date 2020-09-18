import { createElement as e } from 'react';
import t from '../../assets/tailwind.module.css';
import classNames from 'classnames';
import { useStore } from '../../lib/components/StoreLayer';
import { useController } from '../../lib/components/ControllerLayer';

export function App() {
  return e('div', {className: classNames(t.container, t.mx_auto)},
    e(AppHeader),
    e(AppBody)
  );
}

function AppBody() {
  const [issues] = useStore((state) => state.issues);
  return e('div', {className: classNames(t.items_center, t.py_20)},
    issues?.map((issue) => {
      return e('div', {
          key: issue.idReadable,
          className: classNames(t.py_2, t.mb_5)
        },
        e('span',
          {className: classNames(t.mr_3, t.text_sm, t.text_gray_800, t.bg_gray_100, t.p_1, t.rounded)},
          issue.idReadable),
        e('span', {
            className: classNames(t.text_blue_700)
          },
          issue.summary
        ),
        e('div', {className: classNames(t.text_sm, t.text_gray_700, t.p_1)},
          issue.trimmedDescription)
      );
    })
  );
}

function AppHeader() {
  const ctrl = useController();

  return e('header', {
      className: classNames(
        t.flex, t.bg_white,
        t.fixed, t.top_0,
        t.inset_x_0, t.z_50, t.h_16, t.items_center
      )
    },
    e('div', {className: classNames(t.flex, t.w_full, t.max_w_screen_xl, t.relative, t.mx_auto)},
      e('div', {
          className: classNames(t.flex, t.flex_grow, t.min_w_0, t.lg_w_3_4, t.xl_w_4_5)
        },
        e('input', {
          onKeyPress: ({key, target: {value}}) => {
            if (key === 'Enter') {
              ctrl.search(value);
            }
          },
          className: classNames(
            t.transition_colors, t.duration_100, t.ease_in_out,
            t.py_2, t.pr_4, t.pl_10, t.block, t.w_full,
            t.appearance_none, t.leading_normal, t.border, t.border_transparent,
            t.rounded_lg, t.focus_outline_none, t.text_left, t.select_none, t.truncate,
            t.focus_bg_white, t.focus_border_gray_300, t.bg_gray_200
          )
        })
      )
    )
  );
}