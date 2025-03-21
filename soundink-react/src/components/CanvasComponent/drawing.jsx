// Constants for brush colors and sizes
export const colors = ['#161a1d', '#ffb703', '#219ebc', '#9a031e', '#006400'];

export const sizes = [25, 50];
export const MAX_DELAY = 600; // Maximum delay in milliseconds for the slowest speed
export const ERASER_COLOR = '#eae6e1'; // Choose a color that represents the eraser
export const thinning = 0.8; // Amount to thin the stroke by
// Options for stroke drawing (customizable for smoothness, taper, etc.)
export const options = {
  size: 16,
  thinning: thinning,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 20,
    easing: (t) => t,
    cap: true,
  },
};

// Helper function to check if a point (from a line) is close enough to a dot
export const isPointNearDot = (pointX, pointY, dotX, dotY, dotRadius, lineThickness) => {
  const distance = Math.hypot(pointX - dotX, pointY - dotY);
  // Include both dotRadius and line thickness in the intersection threshold
  return distance <= dotRadius + (lineThickness - 20) / 2;
};

export const getStrokeWidth = (pressure = 0.5, options) => {
  return options.size * (1 - options.thinning + pressure * options.thinning);
};


export const isPointNearLineSegment = (point, start, end, strokeWidth) => {
  const [px, py] = point;
  const [sx, sy] = start;
  const [ex, ey] = end;

  // Calculate the distance from the point to the line segment
  const lineLengthSquared = (ex - sx) ** 2 + (ey - sy) ** 2;
  if (lineLengthSquared === 0) {
    // The line segment is a single point
    return Math.hypot(px - sx, py - sy) <= strokeWidth / 2;
  }

  // Project the point onto the line segment
  let t = ((px - sx) * (ex - sx) + (py - sy) * (ey - sy)) / lineLengthSquared;
  t = Math.max(0, Math.min(1, t)); // Clamp t to the segment [0, 1]

  const closestPointX = sx + t * (ex - sx);
  const closestPointY = sy + t * (ey - sy);

  // Calculate the distance from the point to the closest point on the line segment
  const distance = Math.hypot(px - closestPointX, py - closestPointY);

  // Check if the distance is within the stroke width
  return distance <= strokeWidth / 2;
};