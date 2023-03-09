import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextInput,
  Button,
  Group,
  Select,
  Loader,
  NativeSelect,
  FileInput,
} from "@mantine/core";
import { faker } from "@faker-js/faker";
import { IconUserExclamation, IconUpload } from "@tabler/icons";

const AddUserForm = ({ addUser, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isProviderSelected, setIsProviderSelected] = useState(false);

  // Setting UserData State
  const [userData, setUserData] = useState({
    avatar: faker.image.avatar(),
    idType: faker.helpers.arrayElement(["Ghana-Card", "VotersID", "NHIS-Card"]),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    userRole: "",
  });

  // Handling FormInput Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });

    if (name === "userRole" && value === "provider") {
      setIsProviderSelected(true);
    } else {
      setIsProviderSelected(false);
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
    });
    setIsLoading(false);
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group className="max-w-full mx-auto">
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
      </Group>

      <Group className="py-2">
        <TextInput
          label="Phone"
          radius="lg"
          placeholder="0547-235-323"
          required
          type="tel"
          value={userData.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <TextInput
          className="w-[40%]"
          label="Address"
          radius="lg"
          placeholder="Akompi Street..."
          required
          value={userData.address}
          onChange={handleInputChange}
          name="address"
        />
        <TextInput
          radius="lg"
          label="City"
          placeholder="Accra"
          required
          value={userData.city}
          onChange={handleInputChange}
          name="city"
        />
      </Group>

      <Group className="pt-2 mt-2">
        <NativeSelect
          className="w-[25%]"
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
          radius="lg"
          className="w-[20%]"
          accept="image/*"
          required
          name="image"
          label="User's Photo"
          placeholder="upload photo"
          icon={<IconUpload size="1rem" color="green" />}
          // onChange={handleFileUpload}
        />
        {isProviderSelected && (
          <TextInput
            label="ID Number"
            placeholder="ID"
            required
            value={userData.licenseNumber}
            onChange={handleInputChange}
            name="idNumber"
          />
        )}

        <Button type="submit" variant="outline" color="green" fullWidth>
          {isLoading ? <Loader size={24} /> : "Add User"}
        </Button>
      </Group>
    </form>
  );
};

export default AddUserForm;
