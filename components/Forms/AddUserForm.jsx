import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextInput,
  Button,
  Stepper,
  Divider,
  Group,
  Text,
  Loader,
  NativeSelect,
  useMantineTheme,
  FileInput,
  Avatar,
  Image,
} from "@mantine/core";
import { faker } from "@faker-js/faker";
import {
  IconUserExclamation,
  IconUpload,
  IconPhoto,
  IconX,
  IconArrowNarrowRight,
  IconArrowNarrowLeft,
} from "@tabler/icons";
import { VscOrganization, VscPerson } from "react-icons/vsc";
import UserUploads from "./UserUploads";
import IndividualProvider from "./IndividualProvider";
import CorporateProvider from "./CorporateProvider";

const AddUserForm = ({ addUser, close }) => {
  const theme = useMantineTheme();

  ///----------------------------------------STATES BLOCK----------------------------------//

  //Skills Set and State
  const [skillsSet, setSkillsSet] = useState([
    { value: "coding", label: "Coding" },
  ]);

  //Form Stepper States
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  //SeTting Select Option State
  const [selectedOption, setSelectedOption] = useState("");

  //Setting Loading State
  const [isLoading, setIsLoading] = useState(false);

  //Getting Input Ref
  const ref = useRef(null);

  //INitializing formData
  const initialFormData = {
    //Basic Form Fields
    idType: faker.helpers.arrayElement(["Ghana-Card", "VotersID", "NHIS-Card"]),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    userRole: "",
    image: null,
    verified: false,
    //INdividual Provider Fields
    individual: {
      idType: "",
      idNumber: "",
      skills: [],
      education: "",
      refName: "",
      refPhone: "",
      refRelation: "",
      idUploads: [],
      docUploads: [],
    },
    //Corporate Provider Fields
    corporate: {
      idType: "",
      idNumber: "",
      corpName: "",
      corpEmail: "",
      corpPhone: "",
      corpDate: "",
      corpIdUPload: [],
      corpDoc: [],
    },
  };

  // Setting UserData State
  const [userData, setUserData] = useState(initialFormData);

  //Setting User Provider State
  const [ProviderSelected, setProviderSelected] = useState(false);

  //Checking if user's a Provider
  useEffect(() => {
    const IsProvider = () => {
      if (userData.userRole === "provider") {
        setProviderSelected(true);
      } else {
        setProviderSelected(false);
      }
    };
    IsProvider();
  }, [userData.userRole]);

  ///Handling Form Input Change............
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setUserData({ ...userData, [name]: event.target.files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  //Handling Form Image
  const handleFileInput = (value) => {
    const imageUrl = URL.createObjectURL(value);
    setUserData({ ...userData, image: imageUrl });
  };

  //Cleaning Up ObjectURL with UseEffect
  // useEffect(() => {
  //   if (userData.image) {
  //     URL.revokeObjectURL(userData.image);
  //   }
  // }, [userData.image]);

  //
  //
  // Handling Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userId = uuidv4(); // Generate unique ID
    const user = { userId, ...userData }; // Combine ID with form data
    addUser(user);

    // Resetting the form and loading state
    setUserData(initialFormData);
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
              onChange={(value) => handleFileInput(value)}
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
          {selectedOption === "client" ? (
            <IndividualProvider
              userData={userData}
              handleInputChange={handleInputChange}
            />
          ) : null}
          {selectedOption === "provider" ? (
            <CorporateProvider userData handleInputChange />
          ) : null}
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
        {active !== 0 ? (
          <Button
            leftIcon={<IconArrowNarrowLeft size="1rem" />}
            variant="default"
            onClick={prevStep}
          >
            Back
          </Button>
        ) : null}
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
