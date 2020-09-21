import { render } from 'react-dom';
import { createElement as e } from 'react';
import { StoreLayer } from '../lib/components/StoreLayer';
import { App } from './components/App';
import { store } from './AppStore';
import { ControllerLayer } from '../lib/components/ControllerLayer';
import { Query } from '../lib/Query';

function main() {
  const ctrl = {
    search(q = '') {
      const fields = Query.fields(['idReadable', 'summary', 'trimmedDescription']);
      fetch(`https://youtrack.jetbrains.com/api/issues?$top=100&fields=${fields}&query=${q}`)
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