import { useState } from "react";
import { Group, NativeSelect, TextInput, MultiSelect } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconUserExclamation } from "@tabler/icons";
const CorporateProvider = ({ userData, handleInputChange }) => {
  return (
    <>
      <Group className="py-2 my-2 max-w-full">
        <NativeSelect
          className="ml-16 w-[30%]"
          label="ID Type"
          clearable
          // description="Select user role"
          required
          icon={<IconUserExclamation size="1rem" color="green" />}
          data={[
            { value: "GhCard", label: "Ghana-Card" },
            { value: "voterID", label: "Voter ID" },
            { value: "NHIS", label: "NHIS" },
          ]}
          value={userData.idType}
          // onChange={(value) => console.log(value)}
          onChange={handleInputChange}
          name=""
        />
        <TextInput
          className="ml-32 w-[30%]"
          label="ID Number"
          placeholder="ID"
          required
          value={userData.idNumber}
          onChange={handleInputChange}
          name=""
        />
      </Group>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[30%]"
          label="Corporate / Company Name"
          placeholder="Pillar Inc."
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="refName"
        />
        <TextInput
          className="ml-32 w-[35%]"
          label="Company Email"
          placeholder="pillarInc.com.gh"
          required
          type=""
          // value={userData.phone}
          // onChange={handleInputChange}
          name="refContact"
        />
      </Group>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[30%]"
          label="Company Phone"
          description="company telephone number"
          placeholder="030 225-6089"
          required
          type="tel"
          // value={userData.phone}
          // onChange={handleInputChange}
          name="companyPhone"
        />
        <DateInput
          className="ml-32 w-[30%]"
          label="Date of Incorporation"
          description="company Registration Date"
          placeholder="Company Reg Date"
          required
          maw={400}
          mx="auto"
          name="companyDob"
        />
      </Group>
    </>
  );
};

export default CorporateProvider;
