import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";

const RoleStepper = ({ UserForm }) => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="User Information" description="Fill in details">
          {/* <div className="flex justify-around space-x-6 items-center">
            <p>
              <div className="bg-primary shadow-md hover:bg-green-600 active:bg-green-800 w-24 h-24 rounded-full hover:shadow-2xl  transition duration-150 ease-in-out text-center justify-center flex items-center cursor-pointer">
                <h3 className="text-white font-semibold text-2xl">Client</h3>
              </div>
            </p>
            <p>
              <div className="bg-primary shadow-md hover:bg-green-600 active:bg-green-800 w-24 h-24 rounded-full hover:shadow-2xl  transition duration-150 ease-in-out text-center justify-center flex items-center cursor-pointer">
                <h3 className="text-white font-semibold text-xl ">Provider</h3>
              </div>
            </p>
          </div> */}
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
};

export default RoleStepper;
