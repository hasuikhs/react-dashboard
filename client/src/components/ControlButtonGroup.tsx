import { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

function ControlButtonGroup({ selectFunc, deleteFunc}: { selectFunc: MouseEventHandler, deleteFunc: MouseEventHandler }) {
  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={ selectFunc }
      >
        <FontAwesomeIcon icon={ faPen } />
      </Button>
      { ' ' }
      <Button
        variant="outline-danger"
        size="sm"
        onClick={ deleteFunc }
      >
        <FontAwesomeIcon icon={ faTrash } />
      </Button>
    </>
  );
}

export default ControlButtonGroup;