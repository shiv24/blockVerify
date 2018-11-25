/*
 * LookupItemPage Messages
 *
 * This contains all the text for the LookupItemPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LookupItemPage';

export default defineMessages({
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Verify Item',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Point your camera at the QR-Code.',
  },
});
