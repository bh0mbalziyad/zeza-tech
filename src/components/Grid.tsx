import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { formData } from "@/pages";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const Grid: React.FC<{ rowData?: formData[] }> = ({ rowData }) => {
  // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: "name", minWidth: 300, flex: 1},
    { field: "email", minWidth: 250, flex: 1},
    { field: "phone1" },
    { field: "phone2" },
    { field: "age" },
    { field: "gender" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="w-full rounded-md p-4 h-[600px] ag-theme-alpine max-w-5xl mx-auto">
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        domLayout="autoHeight"
        alwaysShowHorizontalScroll={true}
      />
    </div>
  );
};

export default Grid;
