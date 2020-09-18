import { render } from 'react-dom';
import { createElement as e } from 'react';
import { StoreLayer } from '../lib/components/StoreLayer';
import { App } from './components/App';
import { store } from './AppStore';
import { ControllerLayer } from '../lib/components/ControllerLayer';

function main() {
  const ctrl = {
    search(q = '') {
      fetch(`https://youtrack.jetbrains.com/api/issues?$top=100&fields=idReadable,summary,trimmedDescription&query=${q}`)
        .then((res) => res.json())
        .then((issues) => {
          store.swap((state) => {
            state.issues = issues;
          });
        });
    }
  };

  ctrl.search();

  render(
    e(ControllerLayer, {value: ctrl},
      e(StoreLayer, {store}, e(App))
    ),
    document.getElementById('app'));
}

main();