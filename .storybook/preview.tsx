import '@mantine/core/styles.css';

import Providers from "../src/lib/components/util/Providers";
import { QueryClient } from "@tanstack/react-query";
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        }
    },
};

const queryClient = new QueryClient();

export const decorators = [
    (renderStory: Function) => (
        <Providers queryClient={queryClient}>{renderStory()}</Providers>
    ),
];

export default preview;