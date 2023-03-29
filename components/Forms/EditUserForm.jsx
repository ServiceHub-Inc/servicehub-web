import { useState, useRef, useEffect } from "react";
import axios from "axios";
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
  clsx,
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
import IndividualProvider from "./individual/IndividualProvider";
import CorporateProvider from "./corporate/CorporateProvider";
import IndividualTwo from "./individual/IndividualTwo";
import CorporateTwo from "./corporate/CorporateTwo";
import { useUsersContext } from "../../lib/hooks/useUsersContext";

const EditUserForm = ({ user, updateUser, close }) => {
  const theme = useMantineTheme();

  //State and Dispatch from users context Hook
  const { state, dispatch } = useUsersContext();

  ///----------------------------------------STATES BLOCK----------------------------------//

  //Skills Set and State
  const [skillsSet, setSkillsSet] = useState([
    { value: "coding", label: "Coding" },
  ]);

  //Form Stepper States
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
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
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    userRole: "CLIENT",
    password: "12345",
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
    // //Corporate Provider Fields
    // corporate: {
    //   idType: "",
    //   idNumber: "",
    //   corpName: "",
    //   corpEmail: "",
    //   corpPhone: "",
    //   corpDate: "",
    //   corpIdUPload: [],
    //   corpDoc: [],
    // },
  };

  // Setting UserData State
  const [userData, setUserData] = useState(initialFormData);

  //Setting User Provider State
  const [ProviderSelected, setProviderSelected] = useState(false);

  //Checking if user's a Provider
  useEffect(() => {
    const IsProvider = () => {
      if (userData.userRole === "PROVIDER") {
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
    //const imageUrl = URL.createObjectURL(value);
    setUserData({ ...userData, image: value });
  };

  //Cleaning Up ObjectURL with UseEffect
  // useEffect(() => {
  //   if (userData.image) {
  //     URL.revokeObjectURL(userData.image);
  //   }
  // }, [userData.image]);

  //
  //Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3008/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (response.ok) {
        console.log("User updated successfully");
        updateUser(userData);
        close();
      }
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Personal Info" description="Basic User Bio">
          <Group className="py-2 my-2 max-w-full flex justify-center">
            <TextInput
              className="ml-10 w-[30%]"
              label="First Name"
              placeholder="John"
              required
              radius="lg"
              value={userData.firstName}
              onChange={handleInputChange}
              name="firstName"
            />

            <TextInput
              className="ml-32 w-[30%]"
              label="Last Name"
              placeholder="Doe"
              required
              radius="lg"
              value={userData.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </Group>

          <Group className="py-2 my-2 max-w-full flex justify-center">
            <TextInput
              className="ml-10 w-[30%]"
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
              className="ml-32 w-[30%]"
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

          <Group className="py-2 my-2 max-w-full flex justify-center">
            <TextInput
              className="ml-10 w-[30%]"
              label="Address"
              radius="lg"
              placeholder="Akompi Street..."
              required
              value={userData.address}
              onChange={handleInputChange}
              name="address"
            />
            <TextInput
              className="ml-32 w-[30%] "
              radius="lg"
              label="City"
              placeholder="Accra"
              required
              value={userData.city}
              onChange={handleInputChange}
              name="city"
            />
          </Group>

          <Group className="py-2 my-2 max-w-full ">
            <NativeSelect
              className="ml-44 pl-2 w-[30%]"
              radius="lg"
              label="User Role"
              // description="Select user role"
              required
              icon={<IconUserExclamation size="1rem" color="green" />}
              data={[
                { value: "CLIENT", label: "Client" },
                { value: "PROVIDER", label: "Provider" },
              ]}
              value={userData.userRole}
              // onChange={(value) => console.log(value)}
              onChange={handleInputChange}
              name="userRole"
            />
            {/* <FileInput
              ref={ref}
              radius="lg"
              className="w-[30%]"
              accept="image/*"
              onChange={(value) => setUserData({ ...userData, image: value })}
              required
              name="image"
              id="image"
              label="User's Profile Photo / Logo"
              placeholder="upload photo"
              icon={<IconUpload size="1rem" color="green" />}
            /> */}
          </Group>

          {ProviderSelected && (
            <div className="flex justify-center space-x-4 items-center">
              <div>
                <label
                  className={`bg-gray-50 shadow-md hover:bg-green-100 active:bg-green-800 w-16 h-16 rounded-full hover:shadow-2xl transition duration-150 ease-in-out text-center justify-center flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-green-400 ${
                    selectedOption === "individual"
                      ? "ring-2 ring-offset-2 ring-green-400"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="individual"
                    checked={selectedOption === "individual"}
                    onChange={() => setSelectedOption("individual")}
                    className="hidden"
                  />
                  <h3 className="text-white font-semibold text-2xl">
                    <VscPerson className="text-3xl text-gray-800" />
                  </h3>
                </label>
                <p
                  className={`font-semibold ${
                    selectedOption === "individual"
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
                    selectedOption === "corporate"
                      ? "ring-2 ring-offset-2 ring-primary"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="corporate"
                    checked={selectedOption === "corporate"}
                    onChange={() => setSelectedOption("corporate")}
                    className="hidden"
                  />
                  <h3 className="text-white font-semibold text-xl">
                    <VscOrganization className="text-4xl text-gray-800" />
                  </h3>
                </label>
                <p
                  className={`font-semibold ${
                    selectedOption === "corporate"
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

        {/* --------------------------------STAGE TWO-----------INDIVIDUAL PROVIDERS */}
        {ProviderSelected && selectedOption === "individual" ? (
          <Stepper.Step
            label="Individual Info"
            description="Identification & Referee"
          >
            <IndividualProvider
              userData={userData}
              handleInputChange={handleInputChange}
            />
          </Stepper.Step>
        ) : null}

        {ProviderSelected && selectedOption === "individual" ? (
          <Stepper.Step
            label="Individual Info"
            description="Education & Skills"
          >
            <div>
              <IndividualTwo
                userData={userData}
                handleInputChange={handleInputChange}
              />
            </div>
          </Stepper.Step>
        ) : null}

        {/* ----------------------------STAGE TWO--------------CORPORATE PROVIDER */}

        {ProviderSelected && selectedOption === "corporate" ? (
          <Stepper.Step label="Corporate Info" description="Identification">
            <CorporateProvider
              userData={userData}
              handleInputChange={handleInputChange}
            />
          </Stepper.Step>
        ) : null}
        {ProviderSelected && selectedOption === "corporate" ? (
          <Stepper.Step label="Corporate Info" description="Experiences">
            <CorporateTwo
              userData={userData}
              handleInputChange={handleInputChange}
            />
          </Stepper.Step>
        ) : null}

        {/* ---------------UPLOADS STEP----------------------------- */}
        {ProviderSelected ? (
          <Stepper.Step label="Uploads" description="IDs and Attachments">
            <div className="py-2 my-2">
              <UserUploads />
            </div>
          </Stepper.Step>
        ) : null}

        {/* ------------------------------FINAL STEPS--------------------------------- */}
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
            {active === 4 ? "Finish" : "Next Step"}
          </Button>
        ) : (
          <Button type="submit">
            {isLoading ? <Loader size={24} /> : "Update User"}
          </Button>
        )}
      </Group>
    </form>
  );
};

export default EditUserForm;
