import { render } from 'react-dom';
import { createElement as e } from 'react';
import { StoreLayer } from '../lib/components/StoreLayer';
import { App } from './components/App';
import { store } from './AppStore';

function main() {
  render(
    e(StoreLayer, {store}, e(App)),
    document.getElementById('app'));
}

main();