import { Container } from '@walmart/ld-kit';
import type { ReactNode } from 'react';

type SiteChromeProps = {
  children: ReactNode;
  page: 'home' | 'pass' | 'profile';
  points: number;
  previous?: number;
  nav: 'prime' | 'secondary';
};

function buildRoute(page: 'home' | 'pass' | 'profile', points: number, nav: SiteChromeProps['nav'], previous?: number) {
  const params = new URLSearchParams({ page, points: String(points) });
  if (previous !== undefined) params.set('previous', String(previous));
  params.set('nav', nav);
  return `?${params.toString()}`;
}

export function SiteChrome({ children, page, points, previous, nav }: SiteChromeProps) {
  const homeRoute = buildRoute('home', points, nav, previous);
  const passRoute = buildRoute('pass', points, nav, previous);
  const profileRoute = buildRoute('profile', points, nav);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Container>
          {page === 'home' ? (
            <div className="home-topbar-inner">
              <span className="home-back-control" aria-hidden="true">‹</span>
              <span className="home-header-title">Member's Mark Community</span>
              <a className="home-profile-control" href={profileRoute} aria-label="Open profile">
                <span aria-hidden="true">◉</span>
              </a>
            </div>
          ) : (
            <div className="topbar-inner">
              <a className="brand-mark" href={homeRoute} aria-label="Member's Mark Community home">
                <span className="brand-mark-icon" aria-hidden="true">M</span>
                <span>Member's Mark <strong>Community</strong></span>
              </a>
              <span className="topbar-points" aria-label={`${points} lifetime points`}>
                <span aria-hidden="true">●</span> {points.toLocaleString()} pts
              </span>
            </div>
          )}
        </Container>
      </header>

      <div className="app-content">{children}</div>

      <nav className={`bottom-nav bottom-nav-${nav}`} aria-label="Community navigation">
        <a className={`bottom-nav-item ${page === 'home' ? 'is-active' : ''}`} href={homeRoute}>
          <span className="bottom-nav-icon" aria-hidden="true">⌂</span>
          <span>Home</span>
        </a>
        {nav === 'prime' && (
          <a className={`bottom-nav-item ${page === 'pass' ? 'is-active' : ''}`} href={passRoute}>
            <span className="bottom-nav-icon" aria-hidden="true">✦</span>
            <span>Pass</span>
          </a>
        )}
        <a className={`bottom-nav-item ${page === 'profile' ? 'is-active' : ''}`} href={profileRoute}>
          <span className="bottom-nav-icon" aria-hidden="true">◉</span>
          <span>Profile</span>
        </a>
        <a className="bottom-nav-item" href={homeRoute}>
          <span className="bottom-nav-icon" aria-hidden="true">⁙</span>
          <span>Services</span>
        </a>
      </nav>
    </div>
  );
}
