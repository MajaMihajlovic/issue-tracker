import { Controller, Url, History } from 'cx/ui';

export default class extends Controller {
    init() {
        this.store.delete('user');
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        History.pushState({}, null, Url.resolve('~/'));
    }
}
