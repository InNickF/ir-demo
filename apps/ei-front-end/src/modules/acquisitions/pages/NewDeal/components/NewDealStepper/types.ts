import {
  DealBackOfTheNapkinInformation,
  LocalDealRoomItem,
  ScreeningDealInformation,
} from "@/acquisitions/typings/deals";

export type GenericStepContentActions<T> = {
  onBack: () => void;
  onContinue: (step: T) => void;
  current: number;
};

export interface NewDealState {
  dealInformation: ScreeningDealInformation;
  dealAttachments: File[];
  dealRoomItems: LocalDealRoomItem[];
  dealBackOfTheNapkin: DealBackOfTheNapkinInformation;
  dealUnderwritingModel: File;
}
