import { SorterMap } from "./sorters";

export interface FormatterReturnType<TFormattedValue = string> {
  value: TFormattedValue;
  className?: string;
}

type MapFormatterFn<TEntity, TValue, TFormattedValue = string> = (params: {
  value: TValue;
  original?: TEntity;
}) => FormatterReturnType<TFormattedValue>;

export type MapFormatter<TEntity, TFormattedValue = string> = {
  [Key in keyof TEntity]: MapFormatterFn<
    TEntity,
    TEntity[Key],
    TFormattedValue
  >;
};
export interface FormatterResolverParams<TEntity> {
  key: keyof TEntity;
  value: TEntity[keyof TEntity];
  original?: TEntity;
}
export type FormatterResolver<TEntity, TFormattedValue> = (
  params: FormatterResolverParams<TEntity>
) => FormatterReturnType<TFormattedValue>;

export interface ValueFormatter<TEntity, TFormattedValue = string> {
  map: MapFormatter<TEntity, TFormattedValue>;
  format: FormatterResolver<TEntity, TFormattedValue>;
}

export type HeaderFormatterResolver<TEntity, TFormattedValue> = (
  params: Omit<FormatterResolverParams<TEntity>, "value">
) => FormatterReturnType<TFormattedValue>;

export type HeaderFormatterMap<TEntity> = Partial<
  Record<keyof TEntity, FormatterReturnType>
>;
export interface HeaderFormatter<TEntity, TFormattedValue = string> {
  map: HeaderFormatterMap<TEntity>;
  format: HeaderFormatterResolver<TEntity, TFormattedValue>;
}

export interface Formatter<TEntity, TFormattedValue = string> {
  value: ValueFormatter<TEntity, TFormattedValue>;
  header: HeaderFormatter<TEntity, TFormattedValue>;
  sorter: SorterMap<TEntity>;
}
