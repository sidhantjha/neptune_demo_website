# Project conventions

- Preserve the two-section scope: hero showcase and development timeline, plus quiet attribution.
- The supplied screenshots are primary visual references. Keep broad capsules, inset media, pale neighboring cards, restrained depth, diffused shadows, and generous whitespace.
- Palette: neutral white #fdfdfd, gray panel #e8e8e8, ink #222222. Avoid yellow or green undertones. Navy/indigo accents pagination. Timeline status labels are noninteractive white pills with neutral borders. Completed and In Progress use green text, Planned uses gray text. Timeline dots retain their status colors.
- Keep all project/demo/timeline copy in src/content/showcase.json. Validate changes in src/types/showcase.ts. Do not invent achievements or metrics.
- Media occupies 65% of enlarged desktop cards. The right panel contains a title and short two-line description below it. Do not place category text above the title. Keep neighboring cards flat and translucent, with roughly 10% peeking beyond each side of the active card. Mobile stacks the media and text.
- Motion is the sole animation engine. Honor reduced motion. Keep navigation manual, keyboard accessible, and swipeable.
- Expansion stays on-page with focus containment/restoration and Escape support. No autoplay audio.
- Media belongs in public/media/demo-XX. Existing SVGs are explicitly labeled concepts.
- The desktop timeline is centered vertically within a full viewport and runs horizontally across 88% of the page with large descriptive frosted-glass milestone cards.
- Run npm run build and npm run lint after changes. Verify desktop at 1440x900 and 1280x800 and mobile around 390x844. Keep descriptions readable, controls touch-friendly, and no horizontal overflow.
