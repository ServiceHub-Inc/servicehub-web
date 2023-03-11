import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextInput,
  Button,
  Stepper,
  Divider,
  Group,
  MultiSelect,
  Text,
  Select,
  Loader,
  NativeSelect,
  useMantineTheme,
  FileInput,
} from "@mantine/core";
import { faker } from "@faker-js/faker";
import {
  IconUserExclamation,
  IconUpload,
  IconPhoto,
  IconX,
  IconArrowNarrowRight,
} from "@tabler/icons";
import { VscOrganization, VscPerson } from "react-icons/vsc";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UserUploads from "./UserUploads";

const AddUserForm = ({ addUser, close }) => {
  const theme = useMantineTheme();

  //Skills Set and State
  const [skillsSet, setSkillsSet] = useState([
    { value: "coding", label: "Coding" },
  ]);

  const [selectedOption, setSelectedOption] = useState("");
  //Stepper States
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [isLoading, setIsLoading] = useState(false);

  //Getting Input Ref
  const ref = useRef(null);

  const [ProviderSelected, setProviderSelected] = useState(false);

  // Setting UserData State
  const [userData, setUserData] = useState({
    avatar: faker.image.avatar(),
    // idType: faker.helpers.arrayElement(["Ghana-Card", "VotersID", "NHIS-Card"]),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    userRole: "",
    idType: "",
    idNumber: "",
    image: null,
  });

  useEffect(() => {
    //Checking if user's a Provider
    const IsProvider = () => {
      if (userData.userRole === "provider") {
        setProviderSelected(true);
      } else {
        setProviderSelected(false);
      }
    };
    IsProvider();
  }, [userData.userRole]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      setUserData({ ...userData, [name]: event.target.files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userId = uuidv4(); // Generate unique ID
    const user = { userId, ...userData }; // Combine ID with form data
    addUser(user);

    // Resetting the form and loading state
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      userRole: "",
      idType: "",
      idNumber: "",
      image: null,
    });
    setIsLoading(false);
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label="User Information"
          description="Fill in user details"
        >
          <Group className="max-w-full mx-auto flex justify-around">
            <TextInput
              className="w-[30%]"
              label="First Name"
              placeholder="John"
              required
              radius="lg"
              value={userData.firstName}
              onChange={handleInputChange}
              name="firstName"
            />

            <TextInput
              className="w-[30%]"
              label="Last Name"
              placeholder="Doe"
              required
              radius="lg"
              value={userData.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </Group>

          <Group className="max-w-full mx-auto flex justify-around">
            <TextInput
              className="w-[30%]"
              radius="lg"
              label="Email"
              placeholder="John@servicehub.com"
              required
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              name="email"
            />

            <TextInput
              className="w-[30%]"
              label="Phone"
              radius="lg"
              placeholder="0547-235-323"
              required
              type="tel"
              value={userData.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </Group>

          <Group className="py-2 flex justify-around">
            <TextInput
              className="w-[30%]"
              label="Address"
              radius="lg"
              placeholder="Akompi Street..."
              required
              value={userData.address}
              onChange={handleInputChange}
              name="address"
            />
            <TextInput
              className="w-[30%] "
              radius="lg"
              label="City"
              placeholder="Accra"
              required
              value={userData.city}
              onChange={handleInputChange}
              name="city"
            />
          </Group>

          <Group className="py-2 my-2 justify-around">
            <NativeSelect
              className="w-[30%]"
              radius="lg"
              label="User Role"
              clearable
              // description="Select user role"
              required
              icon={<IconUserExclamation size="1rem" color="green" />}
              data={[
                { value: "admin", label: "Admin" },
                { value: "client", label: "Client" },
                { value: "provider", label: "Provider" },
                { value: "staff", label: "Staff" },
              ]}
              value={userData.userRole}
              // onChange={(value) => console.log(value)}
              onChange={handleInputChange}
              name="userRole"
            />
            <FileInput
              ref={ref}
              radius="lg"
              className="w-[30%]"
              accept="image/*"
              // value={userData.image}
              onChange={() => console.log(ref.current)}
              required
              name="image"
              id="image"
              label="User's Photo"
              placeholder="upload photo"
              icon={<IconUpload size="1rem" color="green" />}
              // onChange={handleFileUpload}
            />
          </Group>

          {ProviderSelected && (
            <div className="flex justify-center space-x-4 items-center">
              <div>
                <label
                  className={`bg-gray-50 shadow-md hover:bg-green-100 active:bg-green-800 w-16 h-16 rounded-full hover:shadow-2xl transition duration-150 ease-in-out text-center justify-center flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-green-400 ${
                    selectedOption === "client"
                      ? "ring-2 ring-offset-2 ring-green-400"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="client"
                    checked={selectedOption === "client"}
                    onChange={() => setSelectedOption("client")}
                    className="hidden"
                  />
                  <h3 className="text-white font-semibold text-2xl">
                    <VscPerson className="text-3xl text-gray-800" />
                  </h3>
                </label>
                <p
                  className={`font-semibold ${
                    selectedOption === "client"
                      ? "text-primary"
                      : "text-gray-800"
                  }`}
                >
                  INDIVIDUAL
                </p>
              </div>
              <div className=" w-[25%]">
                <p>
                  <Divider my="md" label="OR" labelPosition="center" />
                </p>
              </div>
              <div>
                <label
                  className={`bg-gray-50 shadow-md hover:bg-green-100 active:bg-green-800 w-16 h-16 rounded-full hover:shadow-2xl transition duration-150 ease-in-out text-center justify-center flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-green-400 ${
                    selectedOption === "provider"
                      ? "ring-2 ring-offset-2 ring-primary"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="provider"
                    checked={selectedOption === "provider"}
                    onChange={() => setSelectedOption("provider")}
                    className="hidden"
                  />
                  <h3 className="text-white font-semibold text-xl">
                    <VscOrganization className="text-4xl text-gray-800" />
                  </h3>
                </label>
                <p
                  className={`font-semibold ${
                    selectedOption === "provider"
                      ? "text-primary"
                      : "text-gray-800"
                  }`}
                >
                  CORPORATE
                </p>
              </div>
            </div>
          )}
        </Stepper.Step>

        <Stepper.Step
          label="Additional Info"
          description="Identification, Education & Skills"
        >
          <Group className="py-2 my-2 max-w-full">
            <NativeSelect
              className="ml-16 w-[30%]"
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
              onChange={handleInputChange}
              name="idType"
            />
            <TextInput
              className="ml-40 w-[30%]"
              label="ID Number"
              placeholder="ID"
              required
              value={userData.idNumber}
              onChange={handleInputChange}
              name="idNumber"
            />
          </Group>
          {/* Additional INfo, Education, Skills etc */}
          <Group className="ml-16 space-x-6">
            <MultiSelect
              label="Select or Add Skill"
              className="w-[50%]"
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
              className="w-[40%]"
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
              className="ml-16 w-[30%]"
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
          <Group className="ml-16 space-x-6">
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
        </Stepper.Step>
        <Stepper.Step label="Uploads" description="IDs and Attachments">
          <div className="py-2 my-4">
            <UserUploads />
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div className="py-1 my-1">
            <p className="text-center font-medium text-lg">Review & Submit</p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        {ProviderSelected ? (
          <Button
            disabled={!selectedOption}
            rightIcon={
              active === 3 ? (
                <IconUpload size="1rem" />
              ) : (
                <IconArrowNarrowRight size="1rem" />
              )
            }
            onClick={nextStep}
          >
            {active === 3 ? "Submit" : "Next Step"}
          </Button>
        ) : (
          <Button type="submit">
            {isLoading ? <Loader size={24} /> : "Add User"}
          </Button>
        )}
      </Group>
    </form>
  );
};

export default AddUserForm;
