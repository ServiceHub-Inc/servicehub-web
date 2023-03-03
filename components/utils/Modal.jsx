import { useState } from 'react';
import {  IconDotsVertical} from '@tabler/icons';
import { Modal, useMantineTheme, Button, Portal, Transition, Overlay, Paper, Group } from '@mantine/core';

const UserModal = ({title, children}) => {

    const [opened, setOpened] =useState(false)

    return ( 
            <>
                <Modal
                    opened={opened}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                    onClose={()=>setOpened(false)}
                    title={title}
                >
                    {/* Modal content */}
                    {children}
                </Modal>
                <Group position="center">
                    <IconDotsVertical onClick={()=>setOpened(true)} className="hover:text-primary cursor-pointer"/>
                </Group>
            </>
     );
}
 
export default UserModal;