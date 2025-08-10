import type { User } from "better-auth";
import type { UpdateMetaDto } from "~/lib/dto/utils/meta/updateMeta";

type GenerateExistingMetaData = {
  user: { id: User["id"] };
};

type GenerateExistingMetaOpts = Record<string, never>;

export const generateExistingMeta = (
  data: GenerateExistingMetaData,
  _opts?: GenerateExistingMetaOpts,
): UpdateMetaDto => ({
  updatedAt: new Date(),
  updatedBy: data.user.id,
});
