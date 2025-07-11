import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChatIcon } from "@phosphor-icons/react";
import { useState } from "react";
import LoggedInChat from "./LoggedInChat";
import LoggedOutChat from "./LoggedOutChat";

export default function Chat() {
  const [opened, { open, close }] = useDisclosure();

  const [user, setUser] = useState<string>("");

  return (
    <>
      <Button onClick={open}>
        <ChatIcon />
      </Button>
      <Drawer position="right" title="Chat" opened={opened} onClose={close}>
        {user === "" ? (
          <LoggedOutChat onUserChange={setUser} />
        ) : (
          <LoggedInChat user={user} />
        )}
      </Drawer>
    </>
  );
}
