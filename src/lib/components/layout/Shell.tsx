import { Affix, AppShell, type AppShellProps } from "@mantine/core";
import { ListIcon } from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";
import Chat from "../chat";
import ServeredChat from "../chat/ServeredChat";
import AccountAvatar from "../profile/AccountAvatar";
import TsLink from "../TsLink";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

type ShellProps = PropsWithChildren<AppShellProps>;

export default function Shell(props: ShellProps) {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <Header
        leftSection={
          <TsLink.Avatar to="/" variant="transparent">
            <ListIcon className="text-4xl" />
          </TsLink.Avatar>
        }
        rightSection={<AccountAvatar />}
      >
        <TsLink.Button
          to="/brackets/$id"
          params={{
            id: "abcd",
          }}
        >
          Cause a Bracket!
        </TsLink.Button>
      </Header>
      <Body>{props.children}</Body>
      <Footer />
      <Affix position={{ bottom: 20, right: 80 }}>
        <ServeredChat />
      </Affix>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Chat />
      </Affix>
    </AppShell>
  );
}
