export type MilestoneStatus = 'locked' | 'unlocked' | 'being-prepared';

export type Milestone = {
  points: number;
  label: string;
  status: MilestoneStatus;
  statusLabel: string;
  copy: string;
};

export type Celebration = {
  threshold: 250 | 1000 | 3000;
  title: string;
  subText?: string;
};

export const DEFAULT_POINTS = 140;

export const COPY = {
  below250: "At 250 points, you'll unlock additional Community Home modules.",
  basicPreparing:
    "Next up at 1,000 points: Basic in-home use test eligibility — coming soon.",
  basicReached:
    "You've reached 1,000 points! Basic in-home use test eligibility is being prepared — we'll let you know the moment it's ready.",
  premiumReached:
    "You've reached 3,000 points — our highest Foundation milestone! Premium in-home use test eligibility is being prepared — we'll let you know the moment it's ready.",
  premiumPreparing:
    "At 3,000 points: Premium in-home use test eligibility is being prepared — we'll let you know the moment it's ready.",
  lockedWhatsNew: "Unlock after 250 points to see what's new.",
} as const;

export function normalizePoints(value: string | null | undefined, fallback = DEFAULT_POINTS): number {
  if (value === null || value === undefined || value.trim() === '') return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.floor(parsed);
}

export function getBandFill(points: number): number {
  if (points < 250) return points / 250;
  if (points < 1000) return (points - 250) / 750;
  if (points < 3000) return (points - 1000) / 2000;
  return 1;
}

export function getMilestones(points: number): Milestone[] {
  return [
    {
      points: 0,
      label: 'Start',
      status: 'unlocked',
      statusLabel: 'Started',
      copy: 'Your Community Pass journey starts here.',
    },
    {
      points: 250,
      label: '250 points',
      status: points >= 250 ? 'unlocked' : 'locked',
      statusLabel: points >= 250 ? 'Unlocked' : 'Locked',
      copy: COPY.below250,
    },
    {
      points: 1000,
      label: '1,000 points',
      status: 'being-prepared',
      statusLabel: 'Being prepared',
      copy: points >= 1000 ? COPY.basicReached : COPY.basicPreparing,
    },
    {
      points: 3000,
      label: '3,000 points',
      status: 'being-prepared',
      statusLabel: 'Being prepared',
      copy: points >= 3000 ? COPY.premiumReached : COPY.premiumPreparing,
    },
  ];
}

export function getCelebrations(
  points: number,
  previous: number | undefined,
): Celebration[] {
  if (previous === undefined || points <= previous) return [];
  const thresholds = [250, 1000, 3000] as const;
  return thresholds
    .filter((threshold) => previous < threshold && points >= threshold)
    .map((threshold) => {
      if (threshold === 250) {
        return { threshold, title: '🎉 You unlocked additional Community Home modules!' };
      }
      if (threshold === 1000) {
        return {
          threshold,
          title: '🎉 You reached 1,000 points!',
          subText: COPY.basicReached,
        };
      }
      return {
        threshold,
        title: '🎉 You reached 3,000 points — our highest milestone!',
        subText: COPY.premiumReached,
      };
    });
}

export function getQueryState(search: string) {
  const params = new URLSearchParams(search);
  const points = normalizePoints(params.get('points'));
  const previousValue = params.get('previous');
  const previous = previousValue === null ? undefined : normalizePoints(previousValue);
  const nav = params.get('nav') === 'prime' ? 'prime' : 'secondary';
  const page = params.get('page') === 'profile' ? 'profile' : 'pass';
  return { points, previous, nav, page } as const;
}

export function buildRoute(
  page: 'pass' | 'profile',
  points: number,
  nav: 'prime' | 'secondary',
): string {
  const params = new URLSearchParams({ points: String(points), nav });
  if (page === 'profile') params.set('page', 'profile');
  return `?${params.toString()}`;
}
