import {
  DealFormTimelineItem,
  ExtendedDealInformationWithFilesAndTimeline,
} from "@/acquisitions/typings/deals";
import { dates } from "@/commons/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Input, Select, Table } from "in-ui-react";
import { FC, useState } from "react";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import "../styles.css";
import { DealTimelineDatePicker } from "./DealTimelineDatePicker";
export interface DealTimelineProps {
  control: Control<ExtendedDealInformationWithFilesAndTimeline, unknown>;
  getValues: UseFormGetValues<ExtendedDealInformationWithFilesAndTimeline>;
  register: UseFormRegister<ExtendedDealInformationWithFilesAndTimeline>;
  setValue: UseFormSetValue<ExtendedDealInformationWithFilesAndTimeline>;
  watch: UseFormWatch<ExtendedDealInformationWithFilesAndTimeline>;
  errors: Merge<FieldError, FieldErrorsImpl<DealFormTimelineItem>>;
}
const { remainingDaysFromToday } = dates;

export const EditableDealTimelineTable: FC<DealTimelineProps> = ({
  control,
  getValues,
  register,
  setValue,
  watch,
  errors,
}) => {
  type TimelineExtension = "NO_EXTENSION" | "EXTENSION_1" | "EXTENSION_2";
  const getDefaultExtension = (): TimelineExtension => {
    const firstExtension =
      getValues("timeline.EXTENSION_DATE_1.deadline") && "EXTENSION_1";
    const secondExtension =
      getValues("timeline.EXTENSION_DATE_2.deadline") && "EXTENSION_2";

    return secondExtension || firstExtension || "NO_EXTENSION";
  };

  const [extension, setExtension] = useState<TimelineExtension>(
    getDefaultExtension()
  );

  const TimelineExtensionSelector = () => {
    const extensionOptions: { label: string; value: TimelineExtension }[] = [
      { label: "No Extension", value: "NO_EXTENSION" },
      { label: "Use extension #1", value: "EXTENSION_1" },
      { label: "Use extension #2", value: "EXTENSION_2" },
    ];

    const getDefaultValueFromExtension = () =>
      extensionOptions.find((option) => option.value === extension);

    return (
      <div className="acq-deal-timeline-extension-header">
        <Select
          className="max-w-xs"
          color="over-ghost"
          options={extensionOptions}
          defaultValue={getDefaultValueFromExtension()}
          onChange={(option) => setExtension(option.value)}
        />
      </div>
    );
  };

  const sumDaysToDate = (date: string, days: number) => {
    if (date && days) {
      const finalDate = new Date(date);
      finalDate.setDate(finalDate.getDate() + Number(days));

      return `${
        finalDate.getMonth() + 1
      }/${finalDate.getDate()}/${finalDate.getFullYear()}`;
    }
    return genericNoDataText;
  };

  const LOIExecutedRemainingDays = () => {
    const date = watch("timeline.LOI_EXECUTED.deadline");
    return date ? remainingDaysFromToday(new Date(date)) : genericNoDataText;
  };

  const PSAEffectiveRemainingDays = () => {
    const date = watch("timeline.PSA_EFFECTIVE_DATE.deadline");
    return date ? remainingDaysFromToday(new Date(date)) : genericNoDataText;
  };

  const getPSADepositDate = () => {
    const value = sumDaysToDate(
      watch("timeline.PSA_EFFECTIVE_DATE.deadline"),
      watch("timeline.PSA_DEPOSIT_DAYS.days")
    );

    setValue("timeline.PSA_DEPOSIT_DATE.deadline", value);

    return value;
  };

  const getPSADepositAmount = () =>
    numberToDollar({
      value: watch("timeline.PSA_DEPOSIT_DATE.amount"),
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    });

  const PSADepositRemainingDays = () =>
    remainingDaysFromToday(new Date(getPSADepositDate()));

  const getGoHardDate = () => {
    const PSAEffectiveDate = watch("timeline.PSA_EFFECTIVE_DATE.deadline");
    const goHardDays = watch("timeline.DUE_DILIGENCE_DAYS.days");
    if (PSAEffectiveDate !== genericNoDataText && goHardDays) {
      const value = sumDaysToDate(PSAEffectiveDate, goHardDays);
      setValue("timeline.GO_HARD_DATE.deadline", value);
      return value;
    }
    return genericNoDataText;
  };

  const goHardRemainingDays = () =>
    remainingDaysFromToday(new Date(getGoHardDate()));

  const getClosingDate = () => {
    const goHardDate = getGoHardDate();
    const closingDays = watch("timeline.DAYS_UNTIL_CLOSING.days");
    if (goHardDate !== genericNoDataText && closingDays) {
      const value = sumDaysToDate(goHardDate, closingDays);
      setValue("timeline.CLOSING.deadline", value);
      return value;
    }
    return genericNoDataText;
  };

  const closingRemainingDays = () =>
    remainingDaysFromToday(new Date(getClosingDate()));

  const getFirstExtensionDate = () => {
    const closingDate = getClosingDate();
    const extensionDays = watch("timeline.EXTENSION_DAYS_1.days");
    if (closingDate !== genericNoDataText && extensionDays) {
      const value = sumDaysToDate(closingDate, extensionDays);
      setValue("timeline.EXTENSION_DATE_1.deadline", value);
      return value;
    }
    return genericNoDataText;
  };

  const firstExtensionRemainingDays = () =>
    remainingDaysFromToday(new Date(getFirstExtensionDate()));

  const getSecondExtensionDate = () => {
    const extensionDate = getFirstExtensionDate();
    const extensionDays = watch("timeline.EXTENSION_DAYS_2.days");
    if (extensionDate !== genericNoDataText && extensionDays) {
      const value = sumDaysToDate(extensionDate, extensionDays);
      setValue("timeline.EXTENSION_DATE_2.deadline", value);
      return value;
    }
    return genericNoDataText;
  };

  const secondExtensionRemainingDays = () =>
    remainingDaysFromToday(new Date(getSecondExtensionDate()));

  const getFirstExtensionDaysAmount = () =>
    numberToDollar({
      value: watch("timeline.EXTENSION_DATE_1.amount"),
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    });

  const getSecondExtensionDaysAmount = () =>
    numberToDollar({
      value: watch("timeline.EXTENSION_DATE_2.amount"),
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    });

  const getDiligenceAmount = () =>
    numberToDollar({
      value: watch("timeline.GO_HARD_DATE.amount"),
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    });

  return (
    <>
      <TimelineExtensionSelector />
      <Table className="acq-deal-timeline-table">
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Deadline</Table.Header>
            <Table.Header>Amount</Table.Header>
            <Table.Header>Remaining</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>LOI executed</Table.Data>
            <Table.Data>
              <DealTimelineDatePicker
                name="timeline.LOI_EXECUTED.deadline"
                control={control}
                error={errors?.LOI_EXECUTED?.deadline?.message}
              />
            </Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>{LOIExecutedRemainingDays()}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>PSA effective date</Table.Data>
            <Table.Data>
              <DealTimelineDatePicker
                name="timeline.PSA_EFFECTIVE_DATE.deadline"
                control={control}
                error={errors?.PSA_EFFECTIVE_DATE?.deadline?.message}
              />
            </Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>{PSAEffectiveRemainingDays()}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>PSA deposit days</Table.Data>
            <Table.Data>
              <Input
                placeholder="Days quantity"
                type="number"
                color="over-ghost"
                error={errors?.PSA_DEPOSIT_DAYS?.days?.message}
                {...register("timeline.PSA_DEPOSIT_DAYS.days", {
                  valueAsNumber: true,
                })}
              />
            </Table.Data>
            <Table.Data>
              <Input
                placeholder="Enter an amount"
                type="number"
                color="over-ghost"
                leftIcon={<CurrencyDollarIcon />}
                error={errors?.PSA_DEPOSIT_DATE?.amount?.message}
                {...register("timeline.PSA_DEPOSIT_DATE.amount", {
                  valueAsNumber: true,
                })}
              />
            </Table.Data>
            <Table.Data>-</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>PSA deposit date</Table.Data>
            <Table.Data>{getPSADepositDate()}</Table.Data>
            <Table.Data>{getPSADepositAmount()}</Table.Data>
            <Table.Data>{PSADepositRemainingDays()}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Due diligence days</Table.Data>
            <Table.Data>
              <Input
                placeholder="Days quantity"
                type="number"
                color="over-ghost"
                error={errors?.DUE_DILIGENCE_DAYS?.days?.message}
                {...register("timeline.DUE_DILIGENCE_DAYS.days", {
                  valueAsNumber: true,
                })}
              />
            </Table.Data>
            <Table.Data>
              <Input
                placeholder="Enter an amount"
                type="number"
                color="over-ghost"
                error={errors?.GO_HARD_DATE?.amount?.message}
                leftIcon={<CurrencyDollarIcon />}
                {...register("timeline.GO_HARD_DATE.amount", {
                  valueAsNumber: true,
                })}
              />
            </Table.Data>
            <Table.Data>-</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Go hard date</Table.Data>
            <Table.Data>{getGoHardDate()}</Table.Data>
            <Table.Data>{getDiligenceAmount()}</Table.Data>
            <Table.Data>{goHardRemainingDays()}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Days until closing</Table.Data>
            <Table.Data>
              <Input
                placeholder="Days quantity"
                type="number"
                color="over-ghost"
                error={errors?.DAYS_UNTIL_CLOSING?.days?.message}
                {...register("timeline.DAYS_UNTIL_CLOSING.days", {
                  valueAsNumber: true,
                })}
              />
            </Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>-</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Closing</Table.Data>
            <Table.Data>{getClosingDate()}</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>{closingRemainingDays()}</Table.Data>
          </Table.Row>
          {extension === "EXTENSION_1" || extension === "EXTENSION_2" ? (
            <>
              <Table.Row>
                <Table.Data>Extension days #1</Table.Data>
                <Table.Data>
                  <Input
                    placeholder="Days quantity"
                    type="number"
                    color="over-ghost"
                    error={errors?.EXTENSION_DAYS_1?.days?.message}
                    {...register("timeline.EXTENSION_DAYS_1.days", {
                      valueAsNumber: true,
                    })}
                  />
                </Table.Data>
                <Table.Data>
                  <Input
                    placeholder="Enter an amount"
                    type="number"
                    color="over-ghost"
                    error={errors?.EXTENSION_DATE_1?.amount?.message}
                    leftIcon={<CurrencyDollarIcon />}
                    {...register("timeline.EXTENSION_DATE_1.amount", {
                      valueAsNumber: true,
                    })}
                  />
                </Table.Data>
                <Table.Data>-</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Data>Extension date #1</Table.Data>
                <Table.Data>{getFirstExtensionDate()}</Table.Data>
                <Table.Data>{getFirstExtensionDaysAmount()}</Table.Data>
                <Table.Data>{firstExtensionRemainingDays()}</Table.Data>
              </Table.Row>
            </>
          ) : null}
          {extension === "EXTENSION_2" ? (
            <>
              <Table.Row>
                <Table.Data>Extension days #2</Table.Data>
                <Table.Data>
                  <Input
                    placeholder="Days quantity"
                    type="number"
                    color="over-ghost"
                    error={errors?.EXTENSION_DAYS_2?.days?.message}
                    {...register("timeline.EXTENSION_DAYS_2.days", {
                      valueAsNumber: true,
                    })}
                  />
                </Table.Data>
                <Table.Data>
                  <Input
                    placeholder="Enter an amount"
                    type="number"
                    color="over-ghost"
                    error={errors?.EXTENSION_DATE_2?.amount?.message}
                    leftIcon={<CurrencyDollarIcon />}
                    {...register("timeline.EXTENSION_DATE_2.amount", {
                      valueAsNumber: true,
                    })}
                  />
                </Table.Data>
                <Table.Data>-</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Data>Extension date #2</Table.Data>
                <Table.Data>{getSecondExtensionDate()}</Table.Data>
                <Table.Data>{getSecondExtensionDaysAmount()}</Table.Data>
                <Table.Data>{secondExtensionRemainingDays()}</Table.Data>
              </Table.Row>
            </>
          ) : null}
        </Table.Body>
      </Table>
    </>
  );
};
