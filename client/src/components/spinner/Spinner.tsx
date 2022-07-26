import styles from './Spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <>
      <div className={ styles['spinner'] } />
    </>
  )
}

export default Spinner;