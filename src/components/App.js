import { createElement as e } from 'react';
import t from '../../assets/tailwind.module.css';
import classNames from 'classnames';
import { useStore } from '../../lib/components/StoreLayer';
import { useController } from '../../lib/components/ControllerLayer';
import SearchIcon from 'heroicons/react/outline/Search.jsx';

const containerCss = classNames(t.container, t.mx_auto, t.px_2);

export function App() {
  return e('div', {className: classNames(containerCss)},
    e(AppHeader),
    e(AppBody)
  );
}

function AppBody() {
  const [issues] = useStore((state) => state.issues);
  return e('div', {className: classNames(t.items_center, t.py_20)},
    e('div', {className: classNames(t.break_words, t.overflow_x_hidden)},
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
    )
  );
}

function AppHeader() {
  const ctrl = useController();

  const searchPanel = e('div', {className: classNames(t.w_full, t.relative)},
    e('div', {className: classNames(t.absolute, t.inset_y_0, t.pl_4, t.left_0, t.flex, t.items_center)},
      e(SearchIcon, {className: classNames(t.w_5, t.text_gray_600)})
    ),
    e('input', {
      onKeyPress: ({key, target: {value}}) => {
        if (key === 'Enter') {
          ctrl.search(value);
        }
      },
      className: classNames(
        t.transition_colors, t.duration_100, t.ease_in_out,
        t.py_2, t.pr_4, t.pl_12, t.block, t.w_full,
        t.appearance_none, t.leading_normal, t.border, t.border_transparent,
        t.rounded_lg, t.focus_outline_none, t.text_left, t.select_none, t.truncate,
        t.focus_bg_white, t.focus_border_gray_300, t.bg_gray_200
      )
    })
  );

  return e('header', {
      className: classNames(
        containerCss,
        t.flex, t.bg_white,
        t.fixed, t.top_0,
        t.inset_x_0, t.z_50, t.h_16, t.items_center
      )
    },
    searchPanel
  );
}