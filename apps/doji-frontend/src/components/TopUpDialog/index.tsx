import { Button, CircularProgress, Stack, useTheme } from '@mui/material'
import { FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

export enum TopUpDialogState {
  IDLE = 'idle',
  WAITING = 'waiting',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum DialogState {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERRPOR = 'error',
}

export interface TopUpDialogProps {
  actionText: string
  dialogState: DialogState
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const TopUpDialog: React.FC<TopUpDialogProps> = ({
  dialogState,
  onSubmit,
  actionText,
  children,
}) => {
  const theme = useTheme()

  const statusContent: Record<DialogState, React.ReactNode> = {
    [DialogState.LOADING]: <CircularProgress size="5em" />,
    [DialogState.ERRPOR]: <ImCross fontSize="5em" color={theme.palette.primary.main} />,
    [DialogState.SUCCESS]: <FaCheckCircle fontSize="5em" color={theme.palette.primary.main} />,
  }

  if (dialogState in Object.keys(statusContent)) {
    return (
      <Stack padding="2em" alignItems="center" spacing="0.5em" maxWidth="sm">
        {statusContent[dialogState]}
      </Stack>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack padding="2em" alignItems="center" spacing="1em" maxWidth="sm">
        {children}
        <Button fullWidth={true} type="submit">
          {actionText}
        </Button>
      </Stack>
    </form>
  )
}
