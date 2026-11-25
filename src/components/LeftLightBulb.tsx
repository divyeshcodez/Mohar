import { useState } from 'react';

/**
 * Large transparent vintage incandescent light bulb positioned on the left edge,
 * slightly cropped by the viewport with realistic glass highlights, filament,
 * brass Edison base, and gentle atmospheric float animation.
 */
export function LeftLightBulb() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute left-0 top-[14%] sm:top-[15.5%] lg:top-[16.2%] z-20 w-[108px] sm:w-[180px] md:w-[225px] lg:w-[19.8vw] max-w-[320px] -translate-x-[6%] sm:-translate-x-[3%] lg:translate-x-0"
    >
      <img
        src="/assets/mohar-bulb.png"
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        draggable={false}
        className="w-full h-auto object-contain animate-bulb-float drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
      />
    </div>
  );
}
