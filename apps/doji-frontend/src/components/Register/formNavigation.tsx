import { Button } from '@mui/material'
import { FormikValues } from 'formik'
import { useRouter } from 'next/router'

import React from 'react'

interface Props {
  hasPrevious?: boolean
  onBackClick: (values: FormikValues) => void
  isLastStep: boolean
}

const FormNavigation = (props: Props) => {
  const router = useRouter()
  const handleClick = () => {
    {
      props.isLastStep ? router.push('./register/complete') : console.log('Not Complete')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        margin: 24,
        justifyContent: 'space-between',
      }}
    >
      <Button fullWidth type="submit" color="primary" variant="contained" onClick={handleClick}>
        {props.isLastStep ? 'Proceed' : 'Next'}
      </Button>
    </div>
  )
}

export default FormNavigation
