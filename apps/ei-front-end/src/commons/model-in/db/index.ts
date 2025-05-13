import Dexie, { EntityTable } from "dexie";
import { z } from "zod";
import tables from "./tables";

const db = new Dexie("EIdb") as Dexie &
  Record<
    keyof typeof tables.tablesDexieTypes,
    EntityTable<
      z.infer<
        typeof tables.tablesDexieTypes[keyof typeof tables.tablesDexieTypes]
      >,
      "id"
    >
  >;
db.version(1).stores(tables.tablesDef);

export default db;
