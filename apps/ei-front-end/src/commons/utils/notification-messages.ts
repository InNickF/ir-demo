import { convertToTitleCase } from "../model-in/formatters/utils";
import { HTTPVerbs } from "../typings";

export const messageUnableToRead = (resource: string) =>
  `Unable to fetch ${resource}. Please try again.`;

export const messageUnableToCreate = (resource: string) =>
  `Unable to create the ${resource}. Please try again.`;

export const messageUnableToUpdate = (resource: string) =>
  `Unable to update the ${resource}. Please try again.`;

export const messageUnableToDelete = (resource: string) =>
  `Unable to delete the ${resource}. Please try again.`;

export const subjectErrorCRUD = ({
  verb,
  resource = "data",
}: {
  verb: HTTPVerbs;
  resource?: string;
}) => {
  const verbMap: Record<HTTPVerbs, string> = {
    GET: "fetching",
    POST: "creating",
    PATCH: "updating",
    PUT: "updating",
    DELETE: "deleting",
  };
  return convertToTitleCase(`Error ${verbMap[verb]} ${resource}.`);
};

export const unauthorizedMessage =
  "You are not authorized to perform this action.";
export const unauthorizedModuleMessage =
  "You are not authorized to access this module.";
