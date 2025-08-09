import { type QueryKey, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { z } from "zod/v4";
import { decode } from "../streams/message";

export type UseStreamOptions<T> = {
  queryKey: QueryKey;
  queryFn: () => Promise<Response>;
  schema: z.ZodType<T>;
  onChunk?: (chunk: T) => void;
};

export default function useStream<T>({
  queryKey,
  queryFn,
  schema,
  onChunk,
}: UseStreamOptions<T>) {
  const [chunks, setChunks] = useState<T[]>([]);

  useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      if (!response.body) {
        return;
      }
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decode(value, schema);
        setChunks((r) => [...r, chunk]);
        onChunk?.(chunk);
      }
    },
  });

  return chunks;
}
