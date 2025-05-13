import { useDebouncedFunction } from "@/commons/hooks/useDebouncedFunction";
import { NextPageWithLayout } from "@/commons/typings";
import { Link, Loader, TextArea } from "in-ui-react";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import { LabHead } from "../../components/general/LabHead";
import { BaseLayout } from "../../layouts/BaseLayout";
import { treeDefaultData } from "./components/utils";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const defaultOptions = {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
};

const Tree: NextPageWithLayout = () => {
  const Chart = dynamic(() => import("./components/TreeChart"), {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  });

  const [data, setData] = useState(treeDefaultData);
  const [options, setOptions] = useState(defaultOptions);

  const debouncedData = useDebouncedFunction({
    delay: 2000,
    func: (data: string) => {
      setData(JSON.parse(data));
    },
  });

  const debouncedOptions = useDebouncedFunction({
    delay: 2000,
    func: (data: string) => {
      setOptions(JSON.parse(data));
    },
  });

  return (
    <div className="commons-grid">
      <CardWithHeader
        title="Tree Chart"
        icon={<ChartPieIcon />}
        className="commons-grid-span-full"
        headerActions={
          <Link
            className="mt-4"
            target="_blank"
            href="https://www.amcharts.com/docs/v5/charts/hierarchy/"
          >
            Docs
          </Link>
        }
      >
        <Chart className="h-[600px]" data={data} options={options} />
      </CardWithHeader>
      <TextArea
        label="data"
        className="commons-grid-span-6"
        rows={10}
        onChange={(event) => {
          debouncedData(event.target.value);
        }}
        defaultValue={JSON.stringify(data, null, 2)}
      ></TextArea>
      <TextArea
        label="options"
        className="commons-grid-span-6"
        rows={10}
        onChange={(event) => {
          debouncedOptions(event.target.value);
        }}
        defaultValue={JSON.stringify(options, null, 2)}
      ></TextArea>
    </div>
  );
};

Tree.getLayout = (page: ReactElement) => {
  return (
    <>
      <LabHead title="Tree" />
      <BaseLayout title="Tree">{page}</BaseLayout>
    </>
  );
};

export default Tree;
