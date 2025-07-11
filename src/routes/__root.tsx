/// <reference types="vite/client" />

import mantineCss from "@mantine/core/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { PropsWithChildren } from "react";
import { DefaultCatchBoundary } from "src/lib/components/DefaultCatchBoundary";
import Shell from "src/lib/components/layout/Shell";
import { NotFound } from "src/lib/components/NotFound";
import Providers from "src/lib/components/util/Providers";
import { seo } from "src/lib/utils/seo";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Cause a Bracket",
        description: "A fun way to create and manage brackets",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: mantineCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});

function RootDocument({ children }: PropsWithChildren) {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers queryClient={queryClient}>
          <Shell>{children}</Shell>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
