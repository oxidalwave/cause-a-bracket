import type { User } from "better-auth";
import type { MetaDto } from "~/lib/dto/utils/meta";

type GenerateNewMetaData = {
  user: { id: User["id"] };
};

type GenerateNewMetaOpts = Record<string, never>;

export const generateNewMeta = (
  data: GenerateNewMetaData,
  _opts?: GenerateNewMetaOpts,
): MetaDto => ({
  createdAt: new Date(),
  createdBy: data.user.id,
  updatedAt: new Date(),
  updatedBy: data.user.id,
});
