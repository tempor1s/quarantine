import { createBrowserHistory as createHistory } from 'history';

/*
BrowserRouter creates a history object internally and accessing it is difficult, so creating this
allows us to use the history object easily. Ex: history.push('/');
*/

export default createHistory();

