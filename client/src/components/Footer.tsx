import styles from './Footer.module.css'

function Footer(): JSX.Element {
  return (
    <>
      <footer className={ styles.footer }>
        <div className={ styles.contents }>
          <span className={ styles.title }>
            this is footer
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;