import { useState } from "react";
import {
  Group,
  Textarea,
  NativeSelect,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconUserExclamation } from "@tabler/icons";

const IndividualTwo = ({ userData, handleInputChange }) => {
  //Skills Set and State
  const [skillsSet, setSkillsSet] = useState([
    { value: "coding", label: "Coding" },
  ]);

  //Skills Set and State
  const [language, setLanguage] = useState([
    { value: "English", label: "English" },
    { value: "Fante", label: "Fante" },
    { value: "Twi", label: "Twi" },
    { value: "Ewe", label: "Ewe" },
    { value: "French", label: "French" },
    { value: "Hausa", label: "Hausa" },
  ]);
  return (
    <>
      <Group className="py-2 my-2 max-w-full mx-auto">
        <MultiSelect
          label="Language Spoken"
          className="ml-14 w-[45%]"
          required
          data={language}
          placeholder="Language"
          searchable
          maxSelectedValues={4}
          description="you can add a max of 4 languages"
          creatable
          getCreateLabel={(query) => `+ add ${query} as a language`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSkillsSet((current) => [...current, item]);
            return item;
          }}
        />

        <TextInput
          className="ml-10 w-[45%]"
          label="Years of experience "
          description="years of experience in chosen field"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="education"
        />
      </Group>

      {/* Additional INfo, Education, Skills etc */}
      <Group className="py-2 my-2 max-w-full mx-auto">
        <MultiSelect
          label="Select or Add Skills"
          className="ml-14 w-[45%]"
          required
          data={skillsSet}
          placeholder="Skills"
          searchable
          maxSelectedValues={3}
          description="you can add a max of 3 top skill sets"
          creatable
          getCreateLabel={(query) => `+ add ${query} as a skill`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSkillsSet((current) => [...current, item]);
            return item;
          }}
        />

        <TextInput
          className="ml-10 w-[45%]"
          label="Highest Education"
          description="highest form of training / education attained"
          required
          // value={userData.firstName}
          // onChange={handleInputChange}
          name="education"
        />
      </Group>

      <Group className="my-2 max-w-full">
        <Textarea
          className="ml-14 w-[45%]"
          label="Experience & Offerings"
          description="in a few words tell us your experiences and expectations"
          placeholder="Describe your experience and future offerings"
          autosize
          minRows={2}
          maxRows={4}
        />
      </Group>
    </>
  );
};

export default IndividualTwo;
