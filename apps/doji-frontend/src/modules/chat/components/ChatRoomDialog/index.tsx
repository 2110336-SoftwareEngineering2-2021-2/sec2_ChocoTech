import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'

import { ICreateChatRoomRequestDTO, IUser } from '@libs/api'

export interface ChatRoomDialogProps extends DialogProps {
  close: () => void
  roomId: string
}

export const ChatRoomDialog: React.FC<ChatRoomDialogProps> = (props) => {
  const owner = useAuthStore((store) => store.user)
  const { register, handleSubmit, reset } = useForm<{ username: string }>()
  const queryCleint = useQueryClient()

  /**
   * TODO: should be replaced by GET friends
   */
  const { data: users, isLoading } = useQuery(
    '/auth/users',
    async () => {
      return (await httpClient.get<IUser[]>('/auth/users')).data
    },
    { enabled: props.open },
  )

  const createChatRoomMutation = useMutation(
    '/chat',
    async (username: string) => {
      const body: ICreateChatRoomRequestDTO = {
        participants: [username],
      }
      return await httpClient.post('/chat', body)
    },
    {
      onSuccess: async () => {
        props.close()
        reset()
        await queryCleint.refetchQueries('/chat', { active: true, exact: true })
      },
    },
  )

  const options = useMemo(() => {
    return (users || [])
      .filter((user) => user.username !== owner.username)
      .map((user) => ({
        label: user.username,
        value: user.username,
      }))
  }, [users, owner])

  const onSubmit: SubmitHandler<{ username: string }> = ({ username }) => {
    toast.promise(createChatRoomMutation.mutateAsync(username), {
      loading: 'Creating chat room...',
      success: 'Chat room created',
      error: 'create chat room error',
    })
  }

  return (
    <Dialog
      maxWidth="xs"
      PaperProps={{
        sx: {
          width: '100%',
          p: 2,
          overflowY: 'visible',
        },
      }}
      {...props}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Chat Room</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="ink.lighter" fontWeight={400} mb={2}>
            Select the user to chat with
          </Typography>
          <Select fullWidth {...register('username', { value: null })}>
            {options.map((name) => (
              <MenuItem key={name.value} value={name.value}>
                {name.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small">
            Close
          </Button>
          <Button size="small" type="submit">
            Enter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
