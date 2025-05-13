import { useQueryClient } from "@tanstack/react-query";
import { Button } from "in-ui-react";

export default function Export() {
  const queryClient = useQueryClient();

  const exportQueries = () => {
    const queries = queryClient.getQueryCache().getAll();

    const exportedData = queries.map((query) => ({
      queryKey: query.queryKey,
      state: query.state, // Contains data, status, error, etc.
    }));

    const blob = new Blob([JSON.stringify(exportedData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "react-query-cache-plv.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <Button onClick={exportQueries}>Export</Button>
    </div>
  );
}
