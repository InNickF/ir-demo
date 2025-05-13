import dynamic from "next/dynamic";
import { FC } from "react";
import { Loader3D } from "../../3d/Loader3D";
import { EditorProps } from "./components/RawEditor";
import "./styles.css";

export const Editor: FC<EditorProps> = (props) => {
  const RawEditor = dynamic(() => import("./components/RawEditor"), {
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
  return <RawEditor {...props} />;
};
