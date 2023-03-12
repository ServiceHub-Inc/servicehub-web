import { useState } from "react";
import { Group, NativeSelect, TextInput, MultiSelect } from "@mantine/core";
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
          radius="lg"
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
      {/* Additional INfo, Education, Skills etc */}
      <Group className="py-2 my-2 max-w-full">
        <MultiSelect
          label="Select or Add Skill"
          className="ml-14 w-[45%]"
          required
          data={skillsSet}
          placeholder="Skills"
          searchable
          maxSelectedValues={3}
          description="you can add a max of 3 skill sets"
          creatable
          getCreateLabel={(query) => `+ add ${query} as a skill`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSkillsSet((current) => [...current, item]);
            return item;
          }}
        />

        <TextInput
          className="ml-10 w-[30%]"
          label="Highest Education"
          description="highest form of training / education attained"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="education"
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
      <Group className="ml-14 space-x-6">
        <TextInput
          className="w-[30%]"
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
