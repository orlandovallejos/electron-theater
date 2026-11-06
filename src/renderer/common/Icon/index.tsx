/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import styled from 'styled-components';
import {
  arrowBackCircleOutline,
  calendarClear,
  playCircleOutline,
  star,
} from 'ionicons/icons';

// The icons are bundled with the app: no CDN script and no runtime requests.
// Only the icons the UI uses are imported, so the bundle stays small.
const ICONS = {
  'arrow-back-circle-outline': arrowBackCircleOutline,
  'calendar-clear': calendarClear,
  'play-circle-outline': playCircleOutline,
  star,
};

export type IconName = keyof typeof ICONS;

// ionicons exports each icon as a `data:image/svg+xml;utf8,<svg ...>` string.
const DATA_URI_PREFIX = 'data:image/svg+xml;utf8,';
const toSvg = (name: IconName) => ICONS[name].replace(DATA_URI_PREFIX, '');

const Wrapper = styled.i`
  display: inline-flex;
  width: 1em;
  height: 1em;
  font-style: normal;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
Wrapper.displayName = 'Icon';

/**
 * An ionicon, sized by `font-size` and colored by `color` like text.
 */
const Icon = ({ name }: { name: IconName }) => (
  <Wrapper
    className="icon"
    aria-hidden="true"
    // The markup comes from the bundled ionicons package, never from user input.
    dangerouslySetInnerHTML={{ __html: toSvg(name) }}
  />
);

export default Icon;
