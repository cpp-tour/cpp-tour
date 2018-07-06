import config from './config/popups';

export interface Popup {
  readonly signature: string;
  readonly description: string;
}

export const popups = (config as {[slug: string]: Popup});

