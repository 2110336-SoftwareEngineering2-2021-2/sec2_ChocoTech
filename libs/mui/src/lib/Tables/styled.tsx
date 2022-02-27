import { css } from '@emotion/react'
import { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled'
import { Badge, Stack, StackProps, styled } from '@mui/material'

import { TablesAvatarStatus } from '.'

export const StyledBadge = styled(Badge)<{ status?: TablesAvatarStatus }>`
  ${({ status, theme }) => {
    const statusColor =
      status === TablesAvatarStatus.Online
        ? theme.palette.green.main
        : status === TablesAvatarStatus.Offline
        ? theme.palette.ink.lighter
        : 'transparent'

    const ripple = css`
      &::after {
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: ripple 1.2s infinite ease-in-out;
          border: 1px solid currentColor;
          content: '';
        }
      }
      @keyframes ripple {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        100% {
          transform: scale(1.6);
          opacity: 0;
        }
      }
    `

    return css`
      & .${badgeUnstyledClasses.badge} {
        background: ${statusColor};
        color: ${statusColor};
        box-shadow: 0 0 0 2px ${theme.palette.background.paper};
        ${status === TablesAvatarStatus.Online && ripple}  
    `
  }}
`

type StyledStack = StackProps & {
  hoverable?: boolean
}

export const StyledStack = styled(Stack)<StyledStack>`
  ${({ hoverable, theme }) => css`
    background: ${theme.palette.white};
    border-radius: ${theme.shape.borderRadius}px;
    transition: ${theme.transitions.create('background-color')};
    ${hoverable &&
    css`
      &:hover {
        cursor: pointer;
        background: ${theme.palette.sky.lightest};
      }
    `}
  `};
`
