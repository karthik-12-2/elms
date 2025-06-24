import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({children}) => {
      const [notification, setNotification] = useState(null)

      const showNotification = (message, type='success') => {
            setNotification({message, type});
            setTimeout(() => {
                  setNotification(null)
            }, 3000)
      }

      return (
            <NotificationContext value={{notification, showNotification}}>
                  {children}
            </NotificationContext>
      )
}