import { useState } from "react";
import {
  Group,
  NativeSelect,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
const CorporateProvider = ({ userData, handleInputChange }) => {
  return (
    <>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[30%]"
          label="Corporate / Company Name"
          placeholder="Pillar Inc."
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="companyName"
        />
        <TextInput
          className="ml-32 w-[35%]"
          label="Company Email"
          placeholder="pillarInc.com.gh"
          required
          type=""
          // value={userData.phone}
          // onChange={handleInputChange}
          name="companyEmail"
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
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[30%]"
          label="Business Registration Number"
          placeholder=""
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="businessRegno"
        />
        <TextInput
          className="ml-32 w-[30%]"
          label="Corporate Liaison Name"
          placeholder="Frank Thomas"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="liaisonName"
        />
      </Group>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[30%]"
          label="Corporate Liaison Contact"
          placeholder=""
          required
          type="tel"
          // value={userData.phone}
          // onChange={handleInputChange}
          name="liaisonPhone"
        />

        <TextInput
          className="ml-32 w-[30%]"
          label="Location"
          placeholder="Independence Ave."
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="companyLocation"
        />
      </Group>
    </>
  );
};

export default CorporateProvider;
