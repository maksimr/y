import { Store } from '../lib/Store';
import produce from 'immer';

export const store = new Store({}, produce);
