import { MouseEventHandler, useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


function ControlButtonGroup({ selectFunc, deleteFunc}: { selectFunc: MouseEventHandler, deleteFunc?: MouseEventHandler }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ ref } onClick={ () => setIsOpen(true) } size="small">
        <FontAwesomeIcon icon={ faEllipsisVertical } size="xs"/>
      </IconButton>

      <Menu
        open={ isOpen }
        anchorEl={ ref.current }
        onClose={ () => setIsOpen(false) }
        onBlur={ () => setIsOpen(false) }
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={ deleteFunc }
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={ faTrash } color="#ef5350" />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={ selectFunc }
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={ faPenToSquare } />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default ControlButtonGroup;