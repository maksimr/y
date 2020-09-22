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
        .then((res) => {
          return res.status > 199 && res.status < 300 ? res.json() : res.json().then((error) => Promise.reject(error));
        })
        .then((issues) => {
          ctrl.updateIssues(issues);
        }, (error) => {
          ctrl.updateIssues([], error);
        });
    },
    updateIssues(issues, error = null) {
      store.swap((state) => {
        state.issues = issues;
        state.issuesError = error;
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