import { Stack, Typography } from '@mui/material'
import { EditableAvatar } from 'libs/mui/src/lib/EditableAvatar'

export interface CompactPrpfileProps {
  username: string
  displayName: string
  profileUrl?: string
  isExpert?: boolean
  editable?: boolean
  onUpload?: React.ChangeEventHandler<HTMLInputElement>
}

export const CompactPrpfile: React.FC<CompactPrpfileProps> = ({
  username,
  displayName,
  profileUrl,
  isExpert,
  editable = false,
  onUpload,
}) => {
  return (
    <Stack direction="row" spacing={2} py={2} px={3} mb={2}>
      <EditableAvatar
        onUpload={onUpload}
        isExpert={isExpert}
        src={profileUrl}
        editable={editable}
        sx={{ width: 80, height: 80 }}
      />
      <Stack direction="column" spacing={1.5} justifyContent="center">
        <Typography variant="large" fontWeight={700} color="ink.darkest">
          {displayName}
        </Typography>
        <Typography variant="small" fontWeight={400} color="sky.main">
          @{username}
        </Typography>
      </Stack>
    </Stack>
  )
}
