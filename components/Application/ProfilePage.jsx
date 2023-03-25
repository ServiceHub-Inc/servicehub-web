import React from "react";
import { Avatar, Button, Card, Text } from "@mantine/core";
import { useRouter } from "next/router";

function ProfilePage() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-4 my-8">
        <div className="col-span-3">
          <Card shadow="lg" radius="lg" padding="lg">
            <div className="flex items-center mb-4">
              <Avatar
                size="lg"
                src="https://avatars.githubusercontent.com/u/65698982?v=4"
              />
              <div className="ml-4">
                <Text size="xl" weight={600}>
                  John Doe
                </Text>
                <Text size="sm" color="gray">
                  Software Engineer
                </Text>
              </div>
            </div>
            <div className="flex flex-col">
              <Button variant="outline" color="gray" fullWidth>
                Message
              </Button>
              <Button variant="outline" color="gray" fullWidth>
                Connect
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-span-9">
          <Card shadow="lg" radius="lg" padding="lg">
            <Text size="xl" weight={600}>
              About Me
            </Text>
            <Text size="md" className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dictum risus sit amet sapien volutpat, id eleifend ante aliquam.
              Maecenas consequat, lorem vitae consectetur fringilla, dolor arcu
              tempor lorem, nec consequat metus nunc vel massa. Nunc in lobortis
              felis. Sed nec mauris ut enim varius faucibus vel sed tellus.
              Nullam sagittis, quam eget feugiat hendrerit, eros nulla placerat
              odio, a porttitor metus massa eu ipsum. Duis sed quam dignissim,
              suscipit metus quis, sodales purus.
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
