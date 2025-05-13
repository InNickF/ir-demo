import { BasicDealInformation } from "@/modules/acquisitions/typings/deals";
import { getPurchasePriceSF } from "@/modules/acquisitions/utils/business-calculations";
import { Input, InputProps } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import {
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface PurchasePriceSFInputProps extends InputProps {
  purchasePrice: number;
  sf: number;
  register: UseFormRegister<Partial<BasicDealInformation>>;
  getValues: UseFormGetValues<Partial<BasicDealInformation>>;
  setValue: UseFormSetValue<Partial<BasicDealInformation>>;
  registerOptions?: RegisterOptions;
  is?: "purchase_price" | "sf";
}
export const PurchasePriceSFInput: FC<PurchasePriceSFInputProps> = ({
  purchasePrice,
  sf,
  is = "purchase_price",
  register,
  registerOptions,
  getValues,
  setValue,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      setValue("purchase_price", purchasePrice);
      setValue("sf", sf);
      inputRef.current?.focus();
      isFirstRender.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPSF = () => {
    const price = getValues("purchase_price");
    const sf = getValues("sf");
    const psf = getPurchasePriceSF({ price, sf });
    setValue("psf", psf);
  };

  const { ref, ...rest } = register(is, {
    required: true,
    valueAsNumber: true,
    onChange: setPSF,
    ...registerOptions,
  });

  return (
    <>
      {purchasePrice && sf ? (
        <Input
          type="number"
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          {...rest}
          {...props}
        />
      ) : null}
    </>
  );
};
