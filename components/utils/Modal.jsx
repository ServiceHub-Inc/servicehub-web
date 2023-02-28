import { useState } from 'react';
import {  IconDotsVertical} from '@tabler/icons';
import { Modal, useMantineTheme, Button, Portal, Transition, Overlay, Paper, Group } from '@mantine/core';

const UserModal = ({title}) => {

    //Setting Modal Open State
    const [opened, setOpened] = useState(false);
        
    const theme = useMantineTheme();
    return ( 
            <>
                <Modal
                    opened={opened}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                    onClose={() => setOpened(false)}
                    title={title}
                >
                    {/* Modal content */}
                </Modal>

                <Group position="center">
                    <IconDotsVertical className="cursor-pointer hover:text-primary" onClick={() => setOpened(true)}/>
                </Group>
            </>
     );
}
 
export default UserModal;