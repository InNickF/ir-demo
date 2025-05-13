import { IdAndLabel } from "../types";

export interface Profile extends IdAndLabel {
  app: IdAndLabel;
  module: IdAndLabel;
  description?: string;
}

export interface ProfileRegister {
  readonly profiles: Profile[];
  readonly registerProfile: (params: { profile: Profile }) => void;
}
