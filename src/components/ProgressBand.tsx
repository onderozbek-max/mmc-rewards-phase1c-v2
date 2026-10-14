import { getBandFill } from '../lib/pass';

const MARKER_250_POSITION = 24;
const MARKER_1000_POSITION = 66;
const TRACK_END_POSITION = 100;

export function getBandProgressPercent(points: number) {
  return Math.round(Math.min(1, Math.max(0, getBandFill(points))) * 100);
}

function getVisualFillWidth(points: number, fill: number) {
  if (points < 250) {
    return fill * MARKER_250_POSITION;
  }
  if (points < 1000) {
    return MARKER_250_POSITION + fill * (MARKER_1000_POSITION - MARKER_250_POSITION);
  }
  if (points < 3000) {
    return MARKER_1000_POSITION + fill * (TRACK_END_POSITION - MARKER_1000_POSITION);
  }
  return TRACK_END_POSITION;
}

export function ProgressBand({ points }: { points: number }) {
  const fill = Math.min(1, Math.max(0, getBandFill(points)));
  const percent = getBandProgressPercent(points);
  const fillWidth = getVisualFillWidth(points, fill);

  return (
    <div className="progress-band">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`${percent}% progress toward the next Community Pass milestone`}
      >
        <span
          className="progress-fill"
          style={{ left: 0, width: `${fillWidth}%` }}
        />
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
