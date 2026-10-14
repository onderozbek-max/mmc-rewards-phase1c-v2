import { Card, CardContent, CardMedia, Heading } from '@walmart/ld-kit';
import { COPY } from '../lib/pass';

type WhatsNewProps = {
  isUnlocked: boolean;
};

const stories = [
  {
    title: 'Members made this mix merrier',
    description: "Shaped by member input, Jingle n' Mingle Snack Mix arrives in Clubs Nov. 1.",
    className: 'story-art-snack',
    art: 'Jingle n’ Mingle',
  },
  {
    title: 'New discoveries, shaped by members',
    description: 'See the latest products and ideas that started with Community feedback.',
    className: 'story-art-home',
    art: 'Member picks',
  },
];

export function WhatsNew({ isUnlocked }: WhatsNewProps) {
  return (
    <section className="whats-new" aria-labelledby="whats-new-heading">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Member updates</span>
          <Heading as="h2" id="whats-new-heading">What's new</Heading>
        </div>
        {!isUnlocked && <span className="lock-summary">Locked until 250 pts</span>}
      </div>
      <div className="story-grid">
        {stories.map((story) => (
          <div className={`story-card ${!isUnlocked ? 'story-card-locked' : ''}`} key={story.title}>
            <Card size="small">
              <CardMedia>
                <div className={`story-art ${story.className}`} aria-hidden="true">
                  {isUnlocked ? <strong>{story.art}</strong> : <span className="large-lock">⌕</span>}
                </div>
              </CardMedia>
              <CardContent>
                <h3>{story.title}</h3>
                {isUnlocked ? (
                  <p>{story.description}</p>
                ) : (
                  <p className="locked-copy">{COPY.lockedWhatsNew}</p>
                )}
                <span className="story-action" aria-hidden="true">
                  {isUnlocked ? 'Learn more →' : 'Locked'}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
