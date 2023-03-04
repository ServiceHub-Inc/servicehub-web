import { useDisclosure } from '@mantine/hooks';
import {  IconDotsVertical} from '@tabler/icons';
import { Modal, useMantineTheme, Button, Portal, Transition, Overlay, Paper, Group } from '@mantine/core';

const UserModal = ({title, children}) => {

    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    return ( 
            <>
                <Modal
                    
                    opened={opened}
                    styles={{
                        title: {
                          color: 'green',
                        },
                        close:{color:"red"}
                      }}
                    size="70%"
                    transition="fade"
                    overlayProps={{
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                        opacity: 0.55,
                        blur: 3,
                      }}
                    onClose={close}
                    title={title}
                >
                    {/* Modal content */}
                    {children}
                </Modal>
                <Group position="center">
                    <IconDotsVertical onClick={open} className="hover:text-primary cursor-pointer"/>
                </Group>
            </>
     );
}
 
export default UserModal;