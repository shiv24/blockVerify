/*
 * CreateItemPage Messages
 *
 * This contains all the text for the CreateItemPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreateItemPage';

export default defineMessages({
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Register Item',
  },
  uidOk: {
    id: `${scope}.uidOk`,
    defaultMessage: 'Unique identifier has been scanned.',
  },
  uidConflict: {
    id: `${scope}.uidConflict`,
    defaultMessage: 'Unique identifier already registered.',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Name*',
  },
  descriptionLabel: {
    id: `${scope}.descriptionLabel`,
    defaultMessage: 'Description',
  },
  uidLabel: {
    id: `${scope}.uidLabel`,
    defaultMessage: 'Unique Identifier*',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  done: {
    id: `${scope}.done`,
    defaultMessage: 'Done',
  },
  rescan: {
    id: `${scope}.rescan`,
    defaultMessage: 'Rescan',
  },
  successHeading: {
    id: `${scope}.successHeading`,
    defaultMessage: 'Success',
  },
  successDescription: {
    id: `${scope}.successDescription`,
    defaultMessage: 'Item has been added onto the Ethereum blockchain.',
  },
});
