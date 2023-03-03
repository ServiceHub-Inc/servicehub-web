import React, { useState } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Loader,
} from '@mantine/core';

const AddUserForm = ({onSubmit}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    //setting UserData State
    const [userData, setUserData] = useState({
        name: '', email: '',role: '', bio: '',
    });

    //Handling FormInput Change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
      };
    
      //Handle Form Submit
      const handleSubmit = async (event) => {
         event.preventDefault();
            setIsLoading(true);
            console.log(userData);

       
        // Reset the form and loading state
        setUserData({ name: '', email: '', role: '', bio: '' });
        setIsLoading(false);
      };
    

    return ( 
        <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          label="Name"
          placeholder="Enter name"
          required
          value={userData.name}
          onChange={handleInputChange}
          name="name"
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          required
          type="email"
          value={userData.email}
          onChange={handleInputChange}
          name="email"
        />
        <Select
          label="Role"
          placeholder="Select role"
          required
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },
          ]}
          value={userData.role}
          onChange={(value) => setUserData({ ...userData, role: value })}
          name="role"
        />
        <Textarea
          label="Bio"
          placeholder="Enter bio"
          value={userData.bio}
          onChange={handleInputChange}
          name="bio"
        />
        <Button  type="submit" variant="outline" color="green" fullWidth>
          {isLoading ? <Loader size={24} /> : 'Add User'}
        </Button>
      </Group>
    </form>
    );
}
 
export default AddUserForm;