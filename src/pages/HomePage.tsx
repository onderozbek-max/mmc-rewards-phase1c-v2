import { Card, CardContent, Heading, Page } from '@walmart/ld-kit';
import { SiteChrome } from '../components/SiteChrome';
import { ProgressBand, getBandProgressPercent } from '../components/ProgressBand';
import { WhatsNew } from '../components/WhatsNew';
import { getCelebrations } from '../lib/pass';

type HomePageProps = {
  points: number;
  previous?: number;
  nav: 'prime' | 'secondary';
};

const DEV_SCENARIOS = [
  { label: 'Below 250 points', query: '?page=home&points=230' },
  { label: 'Above 250, below 1,000 points', query: '?page=home&points=950' },
  { label: 'Above 1,000, below 3,000 points', query: '?page=home&points=2000' },
  { label: 'Above 3,000 points', query: '?page=home&points=3200' },
] as const;

function buildPassRoute(points: number, previous: number | undefined, nav: HomePageProps['nav']) {
  const params = new URLSearchParams({ page: 'pass', points: String(points) });
  if (previous !== undefined) params.set('previous', String(previous));
  params.set('nav', nav);
  return `?${params.toString()}`;
}

function HomeProgressModule({ points, previous, nav }: HomePageProps) {
  const percent = getBandProgressPercent(points);
  const passRoute = buildPassRoute(points, previous, nav);
  const hasNewMilestone = getCelebrations(points, previous).length > 0;

  return (
    <a
      className="home-progress-link"
      href={passRoute}
      aria-label={`View Community Pass progress, ${percent}% toward the next milestone`}
    >
      <section className="progress-card home-progress-card" aria-labelledby="home-progress-heading">
        {hasNewMilestone && (
          <span className="home-milestone-badge">New milestone reached — tap to view</span>
        )}
        <div className="section-heading-row section-heading-row-tight">
          <div>
            <span className="eyebrow">Community Pass</span>
            <Heading as="h2" id="home-progress-heading">Your progress</Heading>
          </div>
          <span className="progress-next">{points.toLocaleString()} lifetime pts</span>
        </div>
        <ProgressBand points={points} />
      </section>
    </a>
  );
}

function PlaceholderFeed() {
  return (
    <section className="home-feed" aria-labelledby="home-feed-heading">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Stay connected</span>
          <Heading as="h2" id="home-feed-heading">Community updates</Heading>
        </div>
      </div>
      <div className="home-feed-grid">
        <Card size="small">
          <CardContent>
            <span className="feed-label">Coming soon</span>
            <h3>More ways to share your point of view</h3>
            <p>New Community activities will appear here.</p>
          </CardContent>
        </Card>
        <Card size="small">
          <CardContent>
            <span className="feed-label">Member moment</span>
            <h3>Your feedback helps shape what's next</h3>
            <p>Check back for the latest community highlights.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function DevPanel() {
  return (
    <section className="dev-panel" aria-labelledby="dev-panel-heading">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Prototype controls</span>
          <Heading as="h2" id="dev-panel-heading">Dev panel</Heading>
        </div>
      </div>
      <Card size="small">
        <CardContent>
          <p className="dev-panel-description">Open a scenario to review each points band.</p>
          <div className="dev-scenario-list">
            {DEV_SCENARIOS.map((scenario) => (
              <a key={scenario.query} href={scenario.query} className="dev-scenario-link">
                <span>{scenario.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function HomePage({ points, previous, nav }: HomePageProps) {
  return (
    <SiteChrome page="home" points={points} previous={previous} nav={nav}>
      <Page title="Member's Mark Community" titleVisuallyHidden>
        <div className="page-container home-page-container">
          <p className="home-intro">Help shape what comes next</p>
          <HomeProgressModule points={points} previous={previous} nav={nav} />
          <WhatsNew isUnlocked={points >= 250} />
          <PlaceholderFeed />
          <DevPanel />
        </div>
      </Page>
    </SiteChrome>
  );
}
