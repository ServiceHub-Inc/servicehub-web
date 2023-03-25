import { useState, useRef, useEffect } from "react";
import {
  TextInput,
  Button,
  Divider,
  Group,
  Text,
  Loader,
  NativeSelect,
  useMantineTheme,
  FileInput,
} from "@mantine/core";
import { IconUserExclamation, IconUpload } from "@tabler/icons";
import { VscOrganization, VscPerson } from "react-icons/vsc";

const BasicUserForm = ({ handleInputChange, userData }) => {
  //Getting Input Ref
  const ref = useRef(null);

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
  //
  //Setting User Provider State
  const [ProviderSelected, setProviderSelected] = useState(false);

  //Checking if user is a Provider
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

  return (
    <>
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
            { value: "ADMIN", label: "Admin" },
            { value: "CLIENT", label: "Client" },
            { value: "PROVIDER", label: "Provider" },
            { value: "STAFF", label: "Staff" },
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
          onChange={(value) => setUserData({ ...userData, image: value })}
          required
          name="image"
          id="image"
          label="User's Photo"
          placeholder="upload photo"
          icon={<IconUpload size="1rem" color="green" />}
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
                selectedOption === "client" ? "text-primary" : "text-gray-800"
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
                selectedOption === "provider" ? "text-primary" : "text-gray-800"
              }`}
            >
              CORPORATE
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicUserForm;
