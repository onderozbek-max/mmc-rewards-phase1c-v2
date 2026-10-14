import { Heading } from '@walmart/ld-kit';
import type { ReactNode } from 'react';
import type { Milestone } from '../lib/pass';

type MilestoneTimelineProps = {
  milestones: Milestone[];
  points: number;
  preview?: ReactNode;
};

function StatusIcon({ status }: { status: Milestone['status'] }) {
  if (status === 'locked') {
    return <span className="status-icon" aria-hidden="true">⌕</span>;
  }
  if (status === 'being-prepared') {
    return <span className="status-icon status-icon-preparing" aria-hidden="true">⌛</span>;
  }
  return <span className="status-icon status-icon-unlocked" aria-hidden="true">✓</span>;
}

export function MilestoneTimeline({ milestones, points, preview }: MilestoneTimelineProps) {
  return (
    <section className="timeline-section" aria-labelledby="milestones-heading">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Your journey</span>
          <Heading as="h2" id="milestones-heading">Community Pass milestones</Heading>
        </div>
        <span className="timeline-total">{points.toLocaleString()} pts</span>
      </div>
      <ol className="timeline-list">
        {milestones.map((milestone, index) => {
          const isCurrent = index === milestones.length - 1
            ? points >= milestone.points
            : points >= milestone.points && points < milestones[index + 1].points;
          return (
            <li
              className={`timeline-item timeline-item-${milestone.status} ${isCurrent ? 'timeline-item-current' : ''}`}
              key={milestone.label}
            >
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-node"><StatusIcon status={milestone.status} /></span>
                {index < milestones.length - 1 && <span className="timeline-connector" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-label-row">
                  <div>
                    <span className="timeline-kicker">{milestone.points === 0 ? 'Begin here' : `Milestone ${index}`}</span>
                    <h3>{milestone.label}</h3>
                  </div>
                  <span className={`status-tag status-tag-${milestone.status}`}>
                    {milestone.statusLabel}
                  </span>
                </div>
                <p>{milestone.copy}</p>
                {milestone.points === 250 && preview}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
