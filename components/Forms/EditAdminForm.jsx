import { useState, useRef, useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Text,
  Loader,
  NativeSelect,
  useMantineTheme,
  FileInput,
} from "@mantine/core";
import { faker } from "@faker-js/faker";
import { IconUserExclamation, IconUpload } from "@tabler/icons";

import { useAdminsContext } from "../../lib/hooks/useAdminsContext";

const EditAdminForm = ({ admin, updateAdmin, close }) => {
  const theme = useMantineTheme();

  //State and Dispatch from admins context Hook
  const { state, dispatch } = useAdminsContext();

  //Setting Error State
  const [errors, setErrors] = useState([]);

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
    _id: admin._id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    phone: admin.phone,
    address: admin.address,
    city: admin.city,
    role: "ADMIN",
    password: "12345",
    image: null,
    verified: false,
  };

  // Setting adminData State
  const [adminData, setAdminData] = useState(initialFormData);

  //Setting admin Provider State
  const [ProviderSelected, setProviderSelected] = useState(false);

  //Checking if admin's a Provider
  useEffect(() => {
    const IsProvider = () => {
      if (adminData.adminRole === "PROVIDER") {
        setProviderSelected(true);
      } else {
        setProviderSelected(false);
      }
    };
    IsProvider();
  }, [adminData.role]);

  ///Handling Form Input Change............
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setAdminData({ ...adminData, [name]: event.target.files[0] });
    } else {
      setAdminData({ ...adminData, [name]: value });
    }
  };

  //Handling Form Image
  const handleFileInput = (value) => {
    //const imageUrl = URL.createObjectURL(value);
    setAdminData({ ...adminData, image: value });
  };

  //Cleaning Up ObjectURL with UseEffect
  // useEffect(() => {
  //   if (adminData.image) {
  //     URL.revokeObjectURL(adminData.image);
  //   }
  // }, [adminData.image]);

  //
  //Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3008/admin/${admin._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      const json = await response.json();

      if (response.ok) {
        console.log("admin updated successfully");
        updateAdmin(adminData);
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
      <Group className="max-w-full mx-auto flex justify-around pt-2 mb-3">
        <TextInput
          className="w-[30%]"
          label="First Name"
          placeholder="John"
          required
          radius="lg"
          value={adminData.firstName}
          onChange={handleInputChange}
          name="firstName"
        />

        <TextInput
          className="w-[30%]"
          label="Last Name"
          placeholder="Doe"
          required
          radius="lg"
          value={adminData.lastName}
          onChange={handleInputChange}
          name="lastName"
        />
      </Group>

      <Group className="max-w-full mx-auto flex justify-around mb-3">
        <TextInput
          className="w-[30%]"
          radius="lg"
          label="Email"
          placeholder="John@servicehub.com"
          required
          type="email"
          value={adminData.email}
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
          value={adminData.phone}
          onChange={handleInputChange}
          name="phone"
        />
      </Group>

      <Group className="py-2 my-2 justify-around">
        <NativeSelect
          className="w-[30%]"
          radius="lg"
          label="Role"
          // description="Select admin role"
          required
          icon={<IconUserExclamation size="1rem" color="green" />}
          data={[
            { value: "ADMIN", label: "Admin" },
            { value: "STAFF", label: "Staff" },
          ]}
          value={adminData.role}
          // onChange={(value) => console.log(value)}
          onChange={handleInputChange}
          name="role"
        />
        <FileInput
          ref={ref}
          radius="lg"
          className="w-[30%]"
          accept="image/*"
          onChange={(value) => setAdminData({ ...adminData, image: value })}
          required={true}
          name="image"
          id="image"
          label="Profile Photo"
          placeholder="upload photo"
          icon={<IconUpload size="1rem" color="green" />}
        />
      </Group>

      <Group position="center">
        <Text className="text-danger text-sm">{errors}</Text>
      </Group>

      <Group position="center" mt="sm">
        <Button type="submit">
          {isLoading ? <Loader size={24} /> : "Update Admin"}
        </Button>
      </Group>
    </form>
  );
};

export default EditAdminForm;
