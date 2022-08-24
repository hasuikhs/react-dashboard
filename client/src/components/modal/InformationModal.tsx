import { useEffect, useState } from 'react';
// bootstrap
import { Button, Modal } from 'react-bootstrap';
// material
import { Box, Link, Stepper, Step, StepLabel } from '@mui/material';
// image
import process1 from '../../assets/img/process_1.png';
import process2 from '../../assets/img/process_2.png';
import process3 from '../../assets/img/process_3.png';
import process4 from '../../assets/img/process_4.png';

const steps: number[] = [1, 2, 3, 4];

function InformationModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState(process1);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  useEffect(() => {
    if (activeStep === 0) {
      setImgSrc(process1);
    } else if (activeStep === 1) {
      setImgSrc(process2);
    } else if (activeStep === 2) {
      setImgSrc(process3);
    } else {
      setImgSrc(process4);
    }
  }, [ activeStep ]);

  return (
    <>
      <Link underline="always" onClick={ openModal } sx={{ cursor: 'pointer', marginTop: 2, marginLeft: 5 }}>
        서버 ID란?
      </Link>
      <Modal show={ showModal } onHide={ closeModal } size="lg">
        <Modal.Body style={{ height: '600px' }}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={ activeStep }>
              { steps.map((label: number, index: number) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};

                  return (
                    <Step key={ label } { ...stepProps }>
                      <StepLabel { ...labelProps }>과정 { label }</StepLabel>
                    </Step>
                  );
              }) }
            </Stepper>
          </Box>
          <Box sx={{ height: '500px', p: 1 }}>
            <img height={ '500px' } style={{ display: 'block', margin: 'auto' }} src={ imgSrc } />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  pt: 2 }}>
            <Button
              variant="light"
              disabled={ activeStep === 0 }
              onClick={ handleBack }
            >
              뒤로
            </Button>
            <Button
              variant="light"
              disabled={ activeStep === steps.length - 1 }
              onClick={ handleNext }
            >
              다음
            </Button>
          </Box>
        </Modal.Body>
        <Modal.Footer style={{ padding: 5 }}>
          <Button variant="secondary" onClick={ closeModal }>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InformationModal;