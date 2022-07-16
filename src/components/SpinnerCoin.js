import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';





const SpinnerCoin = () => {
  return (
    <div className='justfy-content-center'>
    <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button> 
  </div> )
}

export default SpinnerCoin