import isPropValid from '@emotion/is-prop-valid'
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, styled } from '@mui/material'

import { AiOutlineCamera } from 'react-icons/ai'
import { RiMedalFill } from 'react-icons/ri'

const shouldForwardProp = (props: string) => isPropValid(props) && props !== 'editable'

const ContainerBox = styled('div')`
  position: relative;
  width: fit-content;
  height: fit-content;
`
const Overlay = styled('label', { shouldForwardProp })<{ editable?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  border-radius: 100px;
  &:hover {
    opacity: ${({ editable }) => (editable ? 1 : 0)};
  }
`
const Badge = styled(RiMedalFill)`
  position: absolute;
  right: -4px;
  bottom: -4px;
  color: ${({ theme }) => theme.palette.primary.light};
`
const Input = styled('input')`
  opacity: 0;
`
export interface EditableAvatarProps extends MuiAvatarProps {
  editable?: boolean
  isExpert?: boolean
  onUpload?: React.ChangeEventHandler<HTMLInputElement>
}

export const EditableAvatar: React.FC<EditableAvatarProps> = ({
  editable,
  isExpert,
  onUpload,
  ...props
}) => {
  return (
    <>
      <ContainerBox>
        <MuiAvatar src="https://mui.com/static/images/avatar/1.jpg" {...props} />
        <Overlay htmlFor="profile" editable={editable}>
          <AiOutlineCamera style={{ color: 'white' }} />
        </Overlay>
        {isExpert && <Badge />}
      </ContainerBox>
      {editable && (
        <Input type="file" id="profile" style={{ display: 'none' }} onChange={onUpload} />
      )}
    </>
  )
}
