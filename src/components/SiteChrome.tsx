import { Container } from '@walmart/ld-kit';
import type { ReactNode } from 'react';
import { buildRoute } from '../lib/pass';

type SiteChromeProps = {
  children: ReactNode;
  page: 'pass' | 'profile';
  points: number;
  nav: 'prime' | 'secondary';
};

export function SiteChrome({ children, page, points, nav }: SiteChromeProps) {
  const passRoute = buildRoute('pass', points, nav);
  const profileRoute = buildRoute('profile', points, nav);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Container>
          <div className="topbar-inner">
            <a className="brand-mark" href={passRoute} aria-label="Member's Mark Community home">
              <span className="brand-mark-icon" aria-hidden="true">M</span>
              <span>Member's Mark <strong>Community</strong></span>
            </a>
            <span className="topbar-points" aria-label={`${points} lifetime points`}>
              <span aria-hidden="true">●</span> {points.toLocaleString()} pts
            </span>
          </div>
        </Container>
      </header>

      <div className="app-content">{children}</div>

      <nav className={`bottom-nav bottom-nav-${nav}`} aria-label="Community navigation">
        <a className="bottom-nav-item" href={passRoute}>
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
        <a className="bottom-nav-item" href={passRoute}>
          <span className="bottom-nav-icon" aria-hidden="true">⁙</span>
          <span>Services</span>
        </a>
      </nav>
    </div>
  );
}
