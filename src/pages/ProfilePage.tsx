import { Button, Card, CardContent, Heading, Page } from '@walmart/ld-kit';
import { SiteChrome } from '../components/SiteChrome';
import { buildRoute, getMilestones, type Milestone } from '../lib/pass';

type ProfilePageProps = {
  points: number;
  nav: 'prime' | 'secondary';
};

function ProfileStatus({ milestone }: { milestone: Milestone }) {
  return (
    <li className="profile-milestone">
      <span className={`profile-status-icon profile-status-icon-${milestone.status}`} aria-hidden="true">
        {milestone.status === 'being-prepared' ? '⌛' : milestone.status === 'unlocked' ? '✓' : '⌕'}
      </span>
      <span className="profile-milestone-copy">
        <strong>{milestone.label}</strong>
        <span>{milestone.statusLabel}</span>
      </span>
      <span className={`status-tag status-tag-${milestone.status}`}>{milestone.statusLabel}</span>
    </li>
  );
}

export function ProfilePage({ points, nav }: ProfilePageProps) {
  const milestones = getMilestones(points);
  const passRoute = buildRoute('pass', points, nav);

  return (
    <SiteChrome page="profile" points={points} nav={nav}>
      <Page title="Profile" titleVisuallyHidden>
        <div className="page-container profile-container">
          <section className="profile-hero" aria-labelledby="profile-heading">
            <div className="profile-avatar" aria-hidden="true">MM</div>
            <div>
              <span className="eyebrow">Member's Mark Community</span>
              <Heading as="h2" id="profile-heading">Your profile</Heading>
              <p className="profile-subtitle">Your Community Pass progress, all in one place.</p>
            </div>
          </section>

          <div className="profile-points-card">
            <Card size="small">
              <CardContent>
                <div className="profile-points-layout">
                  <div>
                    <span className="eyebrow">Lifetime points</span>
                    <strong className="profile-points-value">{points.toLocaleString()}</strong>
                    <span className="profile-points-label">Community Pass points</span>
                  </div>
                  <div className="profile-points-spark" aria-hidden="true">✦</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="profile-status-section" aria-labelledby="status-heading">
            <div className="section-heading-row">
              <div>
                <span className="eyebrow">Your milestones</span>
                <Heading as="h2" id="status-heading">Pass status</Heading>
              </div>
            </div>
            <div className="status-card">
              <Card size="small">
                <CardContent>
                  <ul className="profile-milestones">
                    {milestones.slice(1).map((milestone) => (
                      <ProfileStatus key={milestone.label} milestone={milestone} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="profile-callout" aria-labelledby="profile-callout-heading">
            <span className="callout-star" aria-hidden="true">✦</span>
            <div>
              <Heading as="h2" id="profile-callout-heading">Keep shaping what's next</Heading>
              <p>See your full Community Pass journey and the next milestone ahead.</p>
              <Button href={passRoute} variant="secondary" size="small">View Community Pass</Button>
            </div>
          </section>
        </div>
      </Page>
    </SiteChrome>
  );
}
