
import { Modal, useMantineTheme, Button, Portal, Text, Menu, Group } from '@mantine/core';

const UserModal = ({ title, isOpen, handleClose, children }) => {
  
  const theme = useMantineTheme();

  
  return (
    <>
      <Modal
        opened={isOpen}
        styles={{
          title: {
            color: 'green',
          },
          close: { color: 'red' },
        }}
        size="70%"
        transition="fade"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        onClose={handleClose}
        title={title}
      >
        {/* Modal content */}
        {children}
      </Modal>
    </>
  );
};

export default UserModal;
