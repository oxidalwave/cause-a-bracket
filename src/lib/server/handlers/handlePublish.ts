import dayjs from "dayjs";
import valkey from "~/lib/valkey";

export const handlePublish =
  (channel: string, kind: string) =>
  <TData>({ data }: { data: TData }) =>
    valkey.publish(
      channel,
      JSON.stringify({
        kind,
        data,
        meta: {
          id: crypto.randomUUID(),
          timestamp: dayjs().toISOString(),
        },
      }),
    );
