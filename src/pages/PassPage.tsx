import { Button, Heading, Modal, Page } from '@walmart/ld-kit';
import { useMemo, useState } from 'react';
import { Confetti } from '../components/Confetti';
import { MilestoneTimeline } from '../components/MilestoneTimeline';
import { SiteChrome } from '../components/SiteChrome';
import { WhatsNew } from '../components/WhatsNew';
import {
  COPY,
  getBandFill,
  getCelebrations,
  getMilestones,
} from '../lib/pass';

type PassPageProps = {
  points: number;
  previous?: number;
  nav: 'prime' | 'secondary';
};

function getProgressCopy(points: number) {
  if (points < 250) return COPY.below250;
  if (points < 1000) return COPY.basicPreparing;
  if (points < 3000) return COPY.basicReached;
  return COPY.premiumReached;
}

function ProgressBand({ points }: { points: number }) {
  const fill = Math.min(1, Math.max(0, getBandFill(points)));
  const percent = Math.round(fill * 100);
  return (
    <div className="progress-band">
      <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={`${percent}% progress toward the next Community Pass milestone`}>
        <span className="progress-fill" style={{ width: `${percent}%` }} />
        <span className="progress-marker progress-marker-250" aria-hidden="true" />
        <span className="progress-marker progress-marker-1000" aria-hidden="true" />
        <span className="progress-marker progress-marker-3000" aria-hidden="true" />
      </div>
      <div className="progress-labels" aria-hidden="true">
        <span>Start</span>
        <span>250</span>
        <span>1,000</span>
        <span>3,000</span>
      </div>
    </div>
  );
}

export function PassPage({ points, previous, nav }: PassPageProps) {
  const milestones = useMemo(() => getMilestones(points), [points]);
  const celebrations = useMemo(() => getCelebrations(points, previous), [points, previous]);
  const [celebrationIndex, setCelebrationIndex] = useState(0);
  const current = celebrations[celebrationIndex];
  const advanceCelebration = () => setCelebrationIndex((index) => Math.min(index + 1, celebrations.length));
  const hasMore = current !== undefined;

  return (
    <SiteChrome page="pass" points={points} nav={nav}>
      <Page title="Community Pass" titleVisuallyHidden>
        <div className="page-container">
          <section className="pass-hero" aria-labelledby="pass-heading">
            <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
            <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light">Member's Mark Community</span>
              <Heading as="h2" id="pass-heading">Your Community Pass</Heading>
              <p className="hero-description">Every response helps shape what comes next.</p>
            </div>
            <div className="point-total">
              <span className="point-total-label">Lifetime points</span>
              <strong>{points.toLocaleString()}</strong>
              <span>points</span>
            </div>
          </section>

          <section className="progress-card" aria-labelledby="progress-heading">
            <div className="section-heading-row section-heading-row-tight">
              <div>
                <span className="eyebrow">Keep going</span>
                <Heading as="h2" id="progress-heading">Your progress</Heading>
              </div>
              <span className="progress-next">{points >= 3000 ? 'Foundation complete' : 'Next milestone ahead'}</span>
            </div>
            <ProgressBand points={points} />
            <p className="progress-copy">{getProgressCopy(points)}</p>
          </section>

          <MilestoneTimeline
            milestones={milestones}
            points={points}
            preview={<WhatsNew isUnlocked={points >= 250} />}
          />

          <section className="pass-note" aria-labelledby="member-note-heading">
            <span className="note-icon" aria-hidden="true">✦</span>
            <div>
              <Heading as="h2" id="member-note-heading">Your voice matters</Heading>
              <p>Community Pass points recognize the feedback you share with Member's Mark.</p>
            </div>
          </section>
        </div>

        {current && (
          <Modal
            isOpen={hasMore}
            onClose={() => advanceCelebration()}
            title="Milestone moment"
            size="small"
            actions={<Button variant="primary" isFullWidth onClick={advanceCelebration}>Continue</Button>}
          >
            <div className="celebration-content">
              <Confetti />
              <div className="celebration-badge" aria-hidden="true">✦</div>
              <h2>{current.title}</h2>
              {current.subText && <p>{current.subText}</p>}
              <span className="celebration-progress">{celebrations.indexOf(current) + 1} of {celebrations.length}</span>
            </div>
          </Modal>
        )}
      </Page>
    </SiteChrome>
  );
}
