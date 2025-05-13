import { FundOperationalStatement } from "@/assets/typings/operational-financial-performance";
import {
  getTextColorForOFPMetricComparison,
  OPERATIONAL_STATEMENT_METRICS,
} from "@/assets/utils/operational-financial-performance";
import { getPropertyURL } from "@/assets/utils/redirects/properties-redirects";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { arrayMove } from "@dnd-kit/sortable";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "in-ui-react";
import { default as NextLink } from "next/link";

export const fundOperationalStatementTableColumnsIdSuffixSeparator =
  "||" as const;

export const fundOperationalStatementTableColumnsIdSuffixes = [
  `${fundOperationalStatementTableColumnsIdSuffixSeparator}actual`,
  `${fundOperationalStatementTableColumnsIdSuffixSeparator}reference`,
  `${fundOperationalStatementTableColumnsIdSuffixSeparator}variance`,
  `${fundOperationalStatementTableColumnsIdSuffixSeparator}variance_percentage`,
] as const;

export type FundOperationalStatementBaseMetrics =
  typeof OPERATIONAL_STATEMENT_METRICS[number];
export type FundOperationalStatementColumnId =
  `${FundOperationalStatementBaseMetrics}${typeof fundOperationalStatementTableColumnsIdSuffixes[number]}`;

export const fundOperationalStatementColumnIds: FundOperationalStatementColumnId[] =
  OPERATIONAL_STATEMENT_METRICS.map(
    (metric) =>
      [
        `${metric}${fundOperationalStatementTableColumnsIdSuffixes[0]}`,
        `${metric}${fundOperationalStatementTableColumnsIdSuffixes[1]}`,
        `${metric}${fundOperationalStatementTableColumnsIdSuffixes[2]}`,
        `${metric}${fundOperationalStatementTableColumnsIdSuffixes[3]}`,
      ] as FundOperationalStatementColumnId[]
  ).flat();

export const fundOperationalStatementTableAssetColumnId = "name" as const;

const fundOperationalStatementTableBaseColumns: ColumnDef<FundOperationalStatement>[] =
  [
    {
      header: "Assets",
      columns: [
        {
          header: "Name",
          id: fundOperationalStatementTableAssetColumnId,
          cell: (info) => (
            <NextLink
              href={getPropertyURL({
                propertyId: info.row.original.yardi_property_code,
                section: "operational-financial-performance",
              })}
              passHref
              target="_blank"
            >
              <Link target="_blank">
                {genericGetValue(info.row.original?.name)}
              </Link>
            </NextLink>
          ),
        },
      ],
    },
  ];

// Assuming fundOperationalStatementTableColumns is a function or a component
interface FundOperationalStatementTableColumnsProps {
  activeComparison: string;
}

export const fundOperationalStatementTableColumns = ({
  activeComparison,
}: FundOperationalStatementTableColumnsProps): ColumnDef<FundOperationalStatement>[] => {
  return fundOperationalStatementTableBaseColumns.concat(
    OPERATIONAL_STATEMENT_METRICS.map((metric) => ({
      header: convertToTitleCase(humanizeSnakeCase(metric)),
      columns: [
        {
          header: "Actual",
          id: `${metric}${fundOperationalStatementTableColumnsIdSuffixes[0]}`,
          cell: (info) =>
            numberToDollar({
              value: info.row.original?.drill_down?.find(
                (item) => item?.metric === metric
              )?.actual,
              options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              },
            }),
        },
        {
          header: convertToTitleCase(activeComparison),
          id: `${metric}${fundOperationalStatementTableColumnsIdSuffixes[1]}`,
          cell: (info) =>
            numberToDollar({
              value: info.row.original?.drill_down?.find(
                (item) => item?.metric === metric
              )?.reference,
              options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              },
            }),
        },
        {
          header: "Variance",
          id: `${metric}${fundOperationalStatementTableColumnsIdSuffixes[2]}`,
          cell: (info) => {
            const metricElement = info.row.original?.drill_down?.find(
              (item) => item?.metric === metric
            );
            return (
              <p
                className={getTextColorForOFPMetricComparison({
                  variance: metricElement?.variance,
                  type: metricElement?.type,
                })}
              >
                {numberToDollar({
                  value: metricElement?.variance,
                  options: {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  },
                })}
              </p>
            );
          },
        },
        {
          header: "Variance %",
          id: `${metric}${fundOperationalStatementTableColumnsIdSuffixes[3]}`,
          cell: (info) => {
            const metricElement = info.row.original?.drill_down?.find(
              (item) => item?.metric === metric
            );

            const colorClasses = getTextColorForOFPMetricComparison({
              variance: metricElement?.variance,
              type: metricElement?.type,
            });

            return (
              <p className={colorClasses}>
                {numberToPercent(metricElement?.variance_percentage)}
              </p>
            );
          },
        },
      ],
    }))
  );
};

export type FundOperationalStatementAllColumnId =
  | FundOperationalStatementColumnId
  | typeof fundOperationalStatementTableAssetColumnId;

export const getOperationalStatementColumnsInitialOrderState =
  (): FundOperationalStatementBaseMetrics[] => {
    return [...OPERATIONAL_STATEMENT_METRICS];
  };

interface SetOperationalStatementColumnsOrderParams {
  items: FundOperationalStatementBaseMetrics[];
  oldIndex: number;
  newIndex: number;
}
export const setOperationalStatementColumnsOrder = ({
  items,
  newIndex,
  oldIndex,
}: SetOperationalStatementColumnsOrderParams) => {
  return arrayMove(items, oldIndex, newIndex);
};

interface GetOperationalStatementComputedColumnsOrderParams {
  items: FundOperationalStatementBaseMetrics[];
}
export const getOperationalStatementComputedColumnsOrder = ({
  items,
}: GetOperationalStatementComputedColumnsOrderParams): FundOperationalStatementAllColumnId[] => {
  return [
    fundOperationalStatementTableAssetColumnId,
    ...(items
      .map((metric) => {
        return [
          `${metric}${fundOperationalStatementTableColumnsIdSuffixes[0]}`,
          `${metric}${fundOperationalStatementTableColumnsIdSuffixes[1]}`,
          `${metric}${fundOperationalStatementTableColumnsIdSuffixes[2]}`,
          `${metric}${fundOperationalStatementTableColumnsIdSuffixes[3]}`,
        ];
      })
      .flat() as FundOperationalStatementAllColumnId[]),
  ];
};

export type FundOperationalStatementColumnVisibilityState = Record<
  FundOperationalStatementAllColumnId,
  boolean
>;
export const getOperationalStatementColumnsInitialVisibility =
  (): FundOperationalStatementColumnVisibilityState => {
    return {
      [fundOperationalStatementTableAssetColumnId]: true,
      ...fundOperationalStatementColumnIds.reduce((acc, columnId) => {
        return {
          ...acc,
          [columnId]: columnId.includes(OPERATIONAL_STATEMENT_METRICS[0]),
        };
      }, {} as FundOperationalStatementColumnVisibilityState),
    };
  };

export const setOperationalStatementColumnsAllVisibility =
  (): FundOperationalStatementColumnVisibilityState => {
    return {
      [fundOperationalStatementTableAssetColumnId]: true,
      ...fundOperationalStatementColumnIds.reduce(
        (acc, columnId) => ({
          ...acc,
          [columnId]: true,
        }),
        {} as FundOperationalStatementColumnVisibilityState
      ),
    };
  };

export const setOnlyOneOperationalStatementColumnVisibility = (
  columnId: FundOperationalStatementBaseMetrics
): FundOperationalStatementColumnVisibilityState => {
  return {
    [fundOperationalStatementTableAssetColumnId]: true,
    ...fundOperationalStatementColumnIds.reduce((acc, column) => {
      const currentMetric = column.split(
        fundOperationalStatementTableColumnsIdSuffixSeparator
      )[0] as FundOperationalStatementBaseMetrics;
      return {
        ...acc,
        [column]: currentMetric === columnId,
      };
    }, {} as FundOperationalStatementColumnVisibilityState),
  };
};

interface SetOperationalStatementColumnsVisibilityParams {
  currentState: Record<FundOperationalStatementAllColumnId, boolean>;
  columnId: FundOperationalStatementBaseMetrics;
  value: boolean;
}
export const setOperationalStatementColumnsVisibility = ({
  currentState,
  columnId,
  value,
}: SetOperationalStatementColumnsVisibilityParams) => {
  const columnsToSetVisibility = fundOperationalStatementColumnIds.filter(
    (column) => column.includes(columnId)
  );
  return {
    ...currentState,
    ...columnsToSetVisibility.reduce(
      (acc, column) => ({
        ...acc,
        [column]: value,
      }),
      {}
    ),
  };
};

export const sortFundOperationalStatementTableColumns = ({
  sortBy,
  data = [],
}: {
  sortBy:
    | FundOperationalStatementAllColumnId
    | `-${FundOperationalStatementAllColumnId}`;
  data: FundOperationalStatement[];
}) => {
  if (!sortBy) {
    return [...data];
  }
  const isDescending = sortBy.startsWith("-");

  if (sortBy.includes(fundOperationalStatementTableAssetColumnId)) {
    return [...data].sort((a, b) => {
      return isDescending
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    });
  }

  if (
    !sortBy?.includes(fundOperationalStatementTableColumnsIdSuffixSeparator)
  ) {
    return [...data];
  }

  const metric = sortBy
    .split(fundOperationalStatementTableColumnsIdSuffixSeparator)[0]
    .replace("-", "") as FundOperationalStatementBaseMetrics;

  const suffix = sortBy.split(
    fundOperationalStatementTableColumnsIdSuffixSeparator
  )[1] as keyof FundOperationalStatement["drill_down"][number];

  return [...data]?.sort((a, b) => {
    const aElement = a.drill_down?.find((item) => item.metric === metric);
    const bElement = b.drill_down?.find((item) => item.metric === metric);

    if (
      !aElement ||
      !bElement ||
      !aElement?.[suffix] === null ||
      !bElement?.[suffix] === null
    ) {
      return 0;
    }

    return isDescending
      ? Number(bElement[suffix]) - Number(aElement[suffix])
      : Number(aElement[suffix]) - Number(bElement[suffix]);
  });
};
