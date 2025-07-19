import { Avatar, Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DiscordLogo } from "@phosphor-icons/react";
import authClient from "~/lib/auth-client";

export default function AccountAvatar() {
  const { data: session } = authClient.useSession();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu>
        <Menu.Target>
          <Avatar>
            {session?.user?.image && (
              <img src={session.user.image} alt="Account Avatar" />
            )}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Divider />
          <Menu.Label>Account</Menu.Label>
          {session !== null ? (
            <Menu.Item
              onClick={() => {
                authClient.signOut();
              }}
            >
              Sign Out
            </Menu.Item>
          ) : (
            <Menu.Item onClick={open}>Sign In</Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={opened}
        onClose={close}
        title="Select your account provider"
      >
        <Button
          leftSection={<DiscordLogo />}
          color="#7289da"
          fullWidth
          onClick={() => {
            authClient.signIn.social({ provider: "discord" });
          }}
        >
          Discord
        </Button>
      </Modal>
    </>
  );
}
