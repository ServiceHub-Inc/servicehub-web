import { useState, useRef } from "react";
import axios from "axios";
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
import { IconUserExclamation, IconUpload } from "@tabler/icons";
// import { VscOrganization, VscPerson } from "react-icons/vsc";

const AddAdminForm = ({ addAdmin, close }) => {
  const theme = useMantineTheme();

  ///----------------------------------------STATES BLOCK----------------------------------//

  //SeTting Select Option State
  const [selectedOption, setSelectedOption] = useState("");

  //Setting Loading State
  const [isLoading, setIsLoading] = useState(false);

  //Getting Input Ref
  const ref = useRef(null);

  //INitializing formData
  const initialFormData = {
    //Basic Form Fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "ADMIN",
    password: "12345",
    image: null,
    verified: false,
  };

  // Setting AdminData State
  const [adminData, setAdminData] = useState(initialFormData);

  //Setting Error State
  const [errors, setErrors] = useState([]);

  //Setting Admin Provider State
  const [ProviderSelected, setProviderSelected] = useState(false);

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

  // Handling Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      //-----------------Using Fetch------------------//
      // const response = await fetch("http://localhost:3008/create-user", {
      //   method: "POST",
      //   body: adminData,
      // });
      const response = await axios.post(
        "http://localhost:3008/create-admin",
        adminData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      // if (!response.ok) {
      //   throw new Error("Failed to submit form");
      // }
      // const json = await response.json();

      // Resetting the form and loading state
      setAdminData(initialFormData);
      setIsLoading(false);

      console.log("Admin added successfully", response.data);
      addAdmin(response.data);

      //Closing modal after adding user
      close();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      // Display error message to user
      setErrors(error?.response?.data?.error);
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
          // description="Select user role"
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
          {isLoading ? <Loader size={24} /> : "ADD ADMIN"}
        </Button>
      </Group>
    </form>
  );
};

export default AddAdminForm;
