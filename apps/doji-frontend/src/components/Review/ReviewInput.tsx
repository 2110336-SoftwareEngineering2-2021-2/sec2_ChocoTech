import { Avatar, Button, Modal, Stack, TextField, Typography, styled } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { httpClient } from '@frontend/services'

import { IReviewCreationRequestDTO } from '@libs/api'
import { theme } from '@libs/mui'

const BoxStyled = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ theme }) => theme.spacing(41)};
  background-color: white;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  outline: none;
`

const ReviewInput = (props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setContent('')
    setRate(0)
  }
  const [rate, setRate] = useState(0)
  const [content, setContent] = useState('')

  const { register, handleSubmit } = useForm<IReviewCreationRequestDTO>()

  const submitReview: SubmitHandler<IReviewCreationRequestDTO> = async (data) => {
    handleClose()

    data.sessionId = String(props.sessionId)
    data.rating = rate

    try {
      await toast.promise(httpClient.post('review', data), {
        loading: 'Loading...',
        success: 'Review success',
        error: 'An error occur',
      })
    } catch {}

    setContent('')
    setRate(0)
  }

  return (
    <form>
      <Stack direction="row" spacing="1em" alignItems="center">
        <Avatar src="https://mui.com/static/images/avatar/3.jpg" sx={{ width: 40, height: 40 }} />

        <TextField
          {...register('content')}
          fullWidth
          label="Review the session..."
          value={content}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleOpen()
            }
          }}
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />

        <Modal open={open}>
          <BoxStyled>
            <Stack display="flex" flexDirection="column" alignItems="center" gap="24px">
              <Stack display="flex" flexDirection="column" alignItems="center" gap="8px">
                <Typography variant="title3">Rate this session</Typography>

                <Typography
                  variant="regular"
                  textAlign="center"
                  color="ink.lighter"
                  lineHeight={1.75}
                >
                  Tell us how good was it?
                </Typography>
              </Stack>

              <Stack direction="row" fontSize={40}>
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= rate ? (
                    <AiFillStar
                      color={theme.palette.primary.dark}
                      key={i}
                      onClick={() => {
                        setRate(i)
                      }}
                    />
                  ) : (
                    <AiOutlineStar
                      color={theme.palette.primary.dark}
                      key={i}
                      onClick={() => {
                        setRate(i)
                      }}
                    />
                  ),
                )}
              </Stack>

              <Button fullWidth onClick={handleSubmit(submitReview)}>
                Rate
              </Button>

              <Button fullWidth variant="text" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </BoxStyled>
        </Modal>
      </Stack>
    </form>
  )
}

export default ReviewInput
