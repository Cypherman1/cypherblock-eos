import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

const history = createHistory();
history.listen((location) => {
  ReactGA.set({page: location.pathname});
  ReactGA.pageview(location.pathname);
});

export default history;
