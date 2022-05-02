import { Stack, styled } from '@mui/material'

export const ImagePreview = styled(Stack)`
  width: 100px;
  height: 100px;
  position: relative;
  margin: ${({ theme }) => theme.spacing(0, 4, 4, 4)};
  cursor: pointer;
  img {
    border-radius: 12px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0;
    border-radius: 12px;
  }
  .cross::before,
  .cross::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: auto;
    margin-right: auto;
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.sky.main};
    border-radius: 12px;
    z-index: 2;
  }

  .cross::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .cross::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after,
  .cross::after,
  .cross::before {
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.create('opacity')};
  }

  &:hover {
    &::after {
      opacity: 0.5;
    }
    .cross::after,
    .cross::before {
      opacity: 1;
    }
  }
`
