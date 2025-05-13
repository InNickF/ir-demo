import { User, UserPermissions } from "../typings/user";

export const userPermissions = [
  "IN_ACQUISITIONS",
  "IN_ASSETS",
  "IN_DEBT",
  "IN_SIGHT",
  "IN_TOOLS",
  "IN_VESTOR",
  "PITCHBOOK",
  "WEBHOOKS",
  "IN_DISPOSITIONS",
] as const;

export const userPermissionsMap: Record<
  string,
  typeof userPermissions[number]
> = {
  IN_ACQUISITIONS: "IN_ACQUISITIONS",
  IN_ASSETS: "IN_ASSETS",
  IN_DEBT: "IN_DEBT",
  IN_SIGHT: "IN_SIGHT",
  IN_TOOLS: "IN_TOOLS",
  IN_VESTOR: "IN_VESTOR",
  PITCHBOOK: "PITCHBOOK",
  IN_DISPOSITIONS: "IN_DISPOSITIONS",
};

export const getUserPermissions = (user?: User): UserPermissions[] => {
  return user?.modules || [];
};

export const hasUserModulesPermission = ({
  user,
  targetModules = [],
}: {
  user: User;
  targetModules?: UserPermissions[];
}): boolean => {
  if ((!targetModules && user) || (!targetModules.length && user)) {
    return true;
  }

  const userPermissions = getUserPermissions(user);
  return targetModules.some((module) => userPermissions.includes(module));
};
