import {
  genericGetValue,
  genericNoDataText,
} from "@/commons/model-in/formatters/utils";
import { PropertyRule } from "@/tools/typings/property-level-validations";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Tooltip } from "in-ui-react";
import { FC, PropsWithChildren } from "react";

const propertyExecutedRulesTableColumnHelper =
  createColumnHelper<PropertyRule>();

const ParagraphHelper: FC<PropsWithChildren> = ({ children }) => (
  <p className="py-0.5">{children}</p>
);

const DownloadAction: FC<{ file: PropertyRule["qa_details"] }> = ({ file }) => {
  return (
    <>
      {file ? (
        <Tooltip content="Download QA Detail">
          <Button
            as="a"
            href={file}
            target="_blank"
            size="small"
            onlyIcon
            icon={<ArrowDownTrayIcon />}
            kind="ghost"
          />
        </Tooltip>
      ) : null}
    </>
  );
};

export const propertyExecutedRulesTableColumns = [
  propertyExecutedRulesTableColumnHelper.accessor("check_pass", {
    header: "Status",
    cell: (info) => {
      const checkPassValue = info.getValue();
      return (
        <ParagraphHelper>
          {checkPassValue === null
            ? genericNoDataText
            : genericGetValue(checkPassValue)
            ? "Passed"
            : "Failed"}
        </ParagraphHelper>
      );
    },
  }),
  propertyExecutedRulesTableColumnHelper.accessor("check_name", {
    header: "Name",
    cell: (info) => {
      const ruleDescription = info?.row?.original?.check_description;

      return (
        <div className="flex items-center gap-2">
          <ParagraphHelper>{info.getValue()}</ParagraphHelper>
          {/* {ruleDescription ? (
            <Tooltip content={ruleDescription}>
              <InformationCircleIcon className="w-3 h-3" />
            </Tooltip>
          ) : null} */}
        </div>
      );
    },
  }),
  // propertyExecutedRulesTableColumnHelper.accessor("detail_type", {
  //   header: "Details",
  //   cell: (info) => (
  //     <PropertyExecutedRuleDetailModal rule={info.row.original} />
  //   ),
  // }),
  // propertyExecutedRulesTableColumnHelper.accessor("qa_details", {
  //   header: "QA Details",
  //   cell: (info) => {
  //     return (
  //       <div className="flex justify-center">
  //         <DownloadAction file={info.row.original.qa_details} />
  //       </div>
  //     );
  //   },
  // }),
];

interface UsePropertyExecutedRulesTableArgs {
  data: PropertyRule[];
}
export const usePropertyExecutedRulesTable = ({
  data,
}: UsePropertyExecutedRulesTableArgs) => {
  return useReactTable({
    data,
    columns: propertyExecutedRulesTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
