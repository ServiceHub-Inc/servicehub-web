import { useRef, useState } from "react";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Image,
  SimpleGrid,
} from "@mantine/core";

import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
const UserUploads = (props) => {
  const theme = useMantineTheme();
  const openRef = useRef();
  const [files, setFiles] = useState([]);

  //Handling Image Preview
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        caption={file.name}
      />
    );
  });
  return (
    <>
      <Dropzone
        onDrop={(files) => {
          console.log("accepted", files);
          setFiles(files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={{ IMAGE_MIME_TYPE, PDF_MIME_TYPE }}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              <span className="font-semibold text-primary">
                Attach / Upload
              </span>{" "}
              a picture of your ID, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </>
  );
};

export default UserUploads;
