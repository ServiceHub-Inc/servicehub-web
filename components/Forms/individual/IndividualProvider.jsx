import { useState } from "react";
import { Group, NativeSelect, TextInput, MultiSelect } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconUserExclamation } from "@tabler/icons";

const IndividualProvider = ({ userData, handleInputChange }) => {
  //Skills Set and State
  const [skillsSet, setSkillsSet] = useState([
    { value: "coding", label: "Coding" },
  ]);
  return (
    <>
      <Group className="py-2 my-2 max-w-full">
        <NativeSelect
          className="ml-14 w-[30%]"
          label="ID Type"
          clearable
          // description="Select user role"
          required
          icon={<IconUserExclamation size="1rem" color="green" />}
          data={[
            { value: "GhCard", label: "National ID (Ghana Card)" },
            { value: "voterID", label: "Voter ID" },
            { value: "NHIS", label: "NHIS" },
          ]}
          // value={userData.idType}
          // onChange={(value) => console.log(value)}
          // onChange={handleInputChange}
          name="idType"
        />
        <TextInput
          className="ml-40 w-[30%]"
          label="ID Number"
          placeholder="ID"
          required
          // value={userData.idNumber}
          // onChange={handleInputChange}
          name="idNumber"
        />
      </Group>
      <Group className="py-2 my-2 max-w-full">
        <DateInput
          className="ml-14 w-[30%]"
          label="Date of Birth"
          placeholder="birth date..."
          required
          maw={400}
          name="individalDob"
        />
        <TextInput
          className="ml-40 w-[30%]"
          label="Location"
          placeholder="location"
          description="your services location"
          name="individualLocation"
        />
      </Group>

      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-14 w-[30%]"
          label="Referee Full Name"
          placeholder="Rockson Doe"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="refName"
        />
        <TextInput
          className="ml-40 w-[30%]"
          label="Referee's Contact"
          placeholder="050 729-5961"
          required
          type="tel"
          // value={userData.phone}
          // onChange={handleInputChange}
          name="refContact"
        />
      </Group>
      <Group className="py-2 my-2 max-w-full">
        <TextInput
          className="ml-14 w-[30%]"
          label="Relationship of referee"
          placeholder="Supervisor"
          required
          // value={userData.lastName}
          // onChange={handleInputChange}
          name="refRelation"
        />
      </Group>
    </>
  );
};

export default IndividualProvider;
