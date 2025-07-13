import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import Valkey from "iovalkey";
import { z } from "zod/v4";
import env from "../env";

export const sendMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
      author: z.string(),
    }),
  )
  .handler(({ data }) => {
    const valkey = new Valkey(env.VITE_VALKEY_CONNECTION_STRING);
    valkey.publish(
      "chat",
      JSON.stringify({
        kind: "message",
        data,
        meta: {
          id: crypto.randomUUID(),
          timestamp: dayjs().toISOString(),
        },
      }),
    );
  });
