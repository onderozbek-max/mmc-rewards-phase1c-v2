import { useEffect, useState } from 'react';
import { A11yAnnouncementProvider, A11yDevAssertions } from '@walmart/ld-kit';
import { useInitializeStore } from '@walmart/ld-kit/store';
import { useInitializeTheming } from '@walmart/ld-kit/theming';
import '@walmart/ld-kit/styles.css';
import { PassPage } from './pages/PassPage';
import { ProfilePage } from './pages/ProfilePage';
import { getQueryState } from './lib/pass';

type RouteState = ReturnType<typeof getQueryState>;

function useRouteState(): RouteState {
  const [route, setRoute] = useState<RouteState>(() => getQueryState(window.location.search));

  useEffect(() => {
    const onPopState = () => setRoute(getQueryState(window.location.search));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return route;
}

export default function App() {
  useInitializeTheming("Member's Mark", ["Member's Mark"] as const);
  useInitializeStore();

  const route = useRouteState();
  const page = route.page === 'profile' ? (
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
