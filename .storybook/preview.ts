import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import '../src/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'vymalo-light',
        dark: 'vymalo-dark',
      },
      defaultTheme: 'vymalo-light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
