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
    <Stack direction="row" spacing={2} justifyContent="center" p={3}>
      <EditableAvatar
        onUpload={onUpload}
        isExpert={isExpert}
        src={profileUrl}
        editable={editable}
      />
      <Stack direction="column" spacing={1} justifyContent="center">
        <Typography variant="large" fontWeight={700} color="ink.darkest">
          {displayName}
        </Typography>
        <Typography variant="tiny" fontWeight={400} color="sky.main">
          @{username}
        </Typography>
      </Stack>
    </Stack>
  )
}
