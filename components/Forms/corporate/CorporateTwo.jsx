import { useState } from "react";
import {
  Group,
  NativeSelect,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

const CorporateTwo = ({ userData, handleInputChange }) => {
  return (
    <>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-16 w-[25%]"
          label="Years of experience "
          description="years of experience in chosen service"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="education"
        />
        <Textarea
          className="ml-14 w-[45%]"
          label="Experience & Offer"
          description="in a few words tell us your experiences and expectations"
          placeholder="Describe your previous experiences & future offerings"
          autosize
          minRows={2}
          maxRows={4}
        />
      </Group>
    </>
  );
};

export default CorporateTwo;
