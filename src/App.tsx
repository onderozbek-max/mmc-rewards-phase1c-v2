import { useEffect, useState } from 'react';
import { A11yAnnouncementProvider, A11yDevAssertions } from '@walmart/ld-kit';
import { useInitializeStore } from '@walmart/ld-kit/store';
import { useInitializeTheming } from '@walmart/ld-kit/theming';
import '@walmart/ld-kit/styles.css';
import { getQueryState } from './lib/pass';
import { HomePage } from './pages/HomePage';
import { PassPage } from './pages/PassPage';
import { ProfilePage } from './pages/ProfilePage';

type AppPage = 'home' | 'pass' | 'profile';
type RouteState = Omit<ReturnType<typeof getQueryState>, 'page'> & { page: AppPage };

function getAppRouteState(search: string): RouteState {
  const query = getQueryState(search);
  const pageParam = new URLSearchParams(search).get('page');
  const page: AppPage = pageParam === 'pass' || pageParam === 'profile' ? pageParam : 'home';
  return { ...query, page };
}

function useRouteState(): RouteState {
  const [route, setRoute] = useState<RouteState>(() => getAppRouteState(window.location.search));

  useEffect(() => {
    const onPopState = () => setRoute(getAppRouteState(window.location.search));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return route;
}

export default function App() {
  useInitializeTheming("Member's Mark", ["Member's Mark"] as const);
  useInitializeStore();

  const route = useRouteState();
  const page = route.page === 'home' ? (
    <HomePage points={route.points} previous={route.previous} nav={route.nav} />
  ) : route.page === 'profile' ? (
    <ProfilePage points={route.points} nav={route.nav} />
  ) : (
    <PassPage points={route.points} previous={route.previous} nav={route.nav} />
  );

  return (
    <A11yAnnouncementProvider>
      <A11yDevAssertions />
      {page}
    </A11yAnnouncementProvider>
  );
}
