import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// --------------------------------------------------------------------------------

function TableControlMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ ref } onClick={ () => setIsOpen(true) } >
        <FontAwesomeIcon icon={ faEllipsisVertical } />
      </IconButton>

      <Menu
        open={ isOpen }
        anchorEl={ ref.current }
        onClose={ () => setIsOpen(false) }
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={ faTrash } />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <FontAwesomeIcon icon={ faPenToSquare } />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

// --------------------------------------------------------------------------------

export default TableControlMenu;