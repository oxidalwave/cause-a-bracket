import {
  ActionIcon as MantineActionIcon,
  type ActionIconProps as MantineActionIconProps,
  Anchor as MantineAnchor,
  type AnchorProps as MantineAnchorProps,
  Avatar as MantineAvatar,
  type AvatarProps as MantineAvatarProps,
  Breadcrumbs as MantineBreadcrumbs,
  type BreadcrumbsProps as MantineBreadcrumbsProps,
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  Menu as MantineMenu,
  type MenuItemProps as MantineMenuItemProps,
  NavLink as MantineNavLink,
  type NavLinkProps as MantineNavLinkProps,
  Pagination as MantinePagination,
  type PaginationProps as MantinePaginationProps,
  Stepper as MantineStepper,
  type StepperProps as MantineStepperProps,
  TableOfContents as MantineTableOfContents,
  type TableOfContentsProps as MantineTableOfContentsProps,
  Tabs as MantineTabs,
  type TabsProps as MantineTabsProps,
  UnstyledButton as MantineUnstyledButton,
  type UnstyledButtonProps as MantineUnstyledButtonProps,
} from "@mantine/core";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import * as React from "react";

type AnchorProps = Omit<MantineAnchorProps, "href">;

const MantineAnchorComponent = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (props, ref) => <MantineAnchor ref={ref} {...props} />,
);

const CreatedMantineAnchorComponent = createLink(MantineAnchorComponent);

const Anchor: LinkComponent<typeof MantineAnchorComponent> = (props) => (
  <CreatedMantineAnchorComponent preload="intent" {...props} />
);

type ButtonProps = Omit<MantineButtonProps, "href">;

const MantineButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MantineButton ref={ref} {...props} />,
);

const CreatedMantineButtonComponent = createLink(MantineButtonComponent);

const Button: LinkComponent<typeof MantineButtonComponent> = (props) => (
  <CreatedMantineButtonComponent preload="intent" {...props} />
);

type AvatarProps = Omit<MantineAvatarProps, "href">;
const MantineAvatarComponent = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => <MantineAvatar ref={ref} {...props} />,
);
const CreatedMantineAvatarComponent = createLink(MantineAvatarComponent);
const Avatar: LinkComponent<typeof MantineAvatarComponent> = (props) => (
  <CreatedMantineAvatarComponent preload="intent" {...props} />
);

type UnstyledButtonProps = Omit<MantineUnstyledButtonProps, "href">;
const MantineUnstyledButtonComponent = React.forwardRef<
  HTMLButtonElement,
  UnstyledButtonProps
>((props, ref) => <MantineUnstyledButton ref={ref} {...props} />);
const CreatedMantineUnstyledButtonComponent = createLink(
  MantineUnstyledButtonComponent,
);
const UnstyledButton: LinkComponent<typeof MantineUnstyledButtonComponent> = (
  props,
) => <CreatedMantineUnstyledButtonComponent preload="intent" {...props} />;

type BreadcrumbsProps = Omit<MantineBreadcrumbsProps, "href">;
const MantineBreadcrumbsComponent = React.forwardRef<
  HTMLDivElement,
  BreadcrumbsProps
>((props, ref) => <MantineBreadcrumbs ref={ref} {...props} />);
const CreatedMantineBreadcrumbsComponent = createLink(
  MantineBreadcrumbsComponent,
);
const Breadcrumbs: LinkComponent<typeof MantineBreadcrumbsComponent> = (
  props,
) => <CreatedMantineBreadcrumbsComponent preload="intent" {...props} />;

type NavLinkProps = Omit<MantineNavLinkProps, "href">;
const MantineNavLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  NavLinkProps
>((props, ref) => <MantineNavLink ref={ref} {...props} />);
const CreatedMantineNavLinkComponent = createLink(MantineNavLinkComponent);
const NavLink: LinkComponent<typeof MantineNavLinkComponent> = (props) => (
  <CreatedMantineNavLinkComponent preload="intent" {...props} />
);

type PaginationProps = Omit<MantinePaginationProps, "href">;
const MantinePaginationComponent = React.forwardRef<
  HTMLDivElement,
  PaginationProps
>((props, ref) => <MantinePagination ref={ref} {...props} />);
const CreatedMantinePaginationComponent = createLink(
  MantinePaginationComponent,
);
const Pagination: LinkComponent<typeof MantinePaginationComponent> = (
  props,
) => <CreatedMantinePaginationComponent preload="intent" {...props} />;

type StepperProps = Omit<MantineStepperProps, "href">;
const MantineStepperComponent = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => <MantineStepper ref={ref} {...props} />,
);
const CreatedMantineStepperComponent = createLink(MantineStepperComponent);
const Stepper: LinkComponent<typeof MantineStepperComponent> = (props) => (
  <CreatedMantineStepperComponent preload="intent" {...props} />
);

type TableOfContentsProps = Omit<MantineTableOfContentsProps, "href">;
const MantineTableOfContentsComponent = React.forwardRef<
  HTMLDivElement,
  TableOfContentsProps
>((props, ref) => <MantineTableOfContents ref={ref} {...props} />);
const CreatedMantineTableOfContentsComponent = createLink(
  MantineTableOfContentsComponent,
);
const TableOfContents: LinkComponent<typeof MantineTableOfContentsComponent> = (
  props,
) => <CreatedMantineTableOfContentsComponent preload="intent" {...props} />;

type TabsProps = Omit<MantineTabsProps, "href">;
const MantineTabsComponent = React.forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => <MantineTabs ref={ref} {...props} />,
);
const CreatedMantineTabsComponent = createLink(MantineTabsComponent);
const Tabs: LinkComponent<typeof MantineTabsComponent> = (props) => (
  <CreatedMantineTabsComponent preload="intent" {...props} />
);

type ActionIconProps = Omit<MantineActionIconProps, "href">;
const MantineActionIconComponent = React.forwardRef<
  HTMLButtonElement,
  ActionIconProps
>((props, ref) => <MantineActionIcon ref={ref} {...props} />);
const CreatedMantineActionIconComponent = createLink(
  MantineActionIconComponent,
);
const ActionIcon: LinkComponent<typeof MantineActionIconComponent> = (
  props,
) => <CreatedMantineActionIconComponent preload="intent" {...props} />;

type MenuItemProps = Omit<MantineMenuItemProps, "href">;
const MantineMenuItemComponent = React.forwardRef<
  HTMLButtonElement,
  MenuItemProps
>((props, ref) => <MantineMenu.Item ref={ref} {...props} />);
const CreatedMantineMenuItemComponent = createLink(MantineMenuItemComponent);
const MenuItem: LinkComponent<typeof MantineMenuItemComponent> = (props) => (
  <CreatedMantineMenuItemComponent preload="intent" {...props} />
);

export default {
  Anchor,
  Button,
  Avatar,
  UnstyledButton,
  Breadcrumbs,
  NavLink,
  Pagination,
  Stepper,
  TableOfContents,
  Tabs,
  ActionIcon,
  MenuItem,
};
