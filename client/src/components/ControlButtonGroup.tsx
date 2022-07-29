import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

function ControlButtonGroup() {
  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={ () => console.log('update') }
      >
        <FontAwesomeIcon icon={ faPen } />
      </Button>
      { ' ' }
      <Button
        variant="outline-danger"
        size="sm"
        onClick={ () => console.log('delete') }
      >
        <FontAwesomeIcon icon={ faTrash } />
      </Button>
    </>
  );
}

export default ControlButtonGroup;