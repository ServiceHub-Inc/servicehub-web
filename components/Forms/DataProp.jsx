import { Button } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import { CgImport, CgExport } from "react-icons/cg";

const TableDataProp = () => {
  return (
    <div className="">
      <ul className="flex list-none space-x-3">
        <li>
          <Button
            leftIcon={<CgImport className="text-base" />}
            color="lime"
            variant="default"
            size="xs"
          >
            Import
          </Button>
        </li>
        <li>
          <Button
            leftIcon={<CgExport className="text-base" />}
            color="indigo"
            variant="light"
            size="xs"
          >
            Export
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default TableDataProp;
