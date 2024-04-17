import styles from './SendButton.module.css'
import cl from 'classnames'

// eslint-disable-next-line react/prop-types
const SendButton = ({ isActive, isLoading,  ...props }) => {

   return (
      <button className={cl(
          `${styles.button}`,
          `${styles.buttonReady}`,
          { [styles.buttonActive]: isActive },
          { [styles.buttonProcess]: isLoading}
          )}
              {...props}
      ></button>
   )

}

export default SendButton
