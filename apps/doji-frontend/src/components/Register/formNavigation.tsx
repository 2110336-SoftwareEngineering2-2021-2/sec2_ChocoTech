import { Button } from '@mui/material'
import { FormikValues } from 'formik'

import React from 'react'

interface Props {
  hasPrevious?: boolean
  onBackClick: (values: FormikValues) => void
  isLastStep: boolean
}

const FormNavigation = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 24,
        justifyContent: 'space-between',
      }}
    >
      <Button fullWidth type="submit" color="primary" variant="contained">
        {props.isLastStep ? 'Proceed' : 'Next'}
      </Button>
    </div>
  )
}

export default FormNavigation
