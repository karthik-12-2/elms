import { useNotification } from './NotificationContext'
import { Alert, Box } from '@mui/material'

const Notification = () => {
      const { notification } = useNotification()

      if (!notification) return null
      return (
            <Box sx={{ mb: 1 }}>
                  <Alert severity={notification.type}>{notification.message}</Alert>
            </Box>
      )
}

export default Notification