import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { httpClient } from '@frontend/services'

import { SessionHistoryCancelButton } from './SessionHistoryCancelButton'

export interface SessionInfo {
  sessionId: string
  expertName: string
  title: string
  hasPenalty: boolean
  deductAmount: number
  refundAmount: number
}
export function SessionHistoryCardMenu(props: SessionInfo) {
  const [currentSession, setSession] = React.useState<SessionInfo>()
  React.useEffect(() => {
    setSession(props)
    // console.log(props)
  }, [props])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  async function cancelSession() {
    await httpClient.delete(`/session/${props.sessionId}/participant`)
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 0, horizontal: 45 }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          {currentSession && (
            <SessionHistoryCancelButton
              sessionInfo={currentSession}
              cancelSession={cancelSession}
            />
          )}
        </MenuItem>
      </Menu>
    </div>
  )
}
