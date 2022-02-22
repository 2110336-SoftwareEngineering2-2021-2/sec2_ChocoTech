import EmailStep from '@frontend/components/Register/emailStep'
import PasswordStep from '@frontend/components/Register/passwordStep'
import UsernameStep from '@frontend/components/Register/usernameStep'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AppBar,
  Button,
  Container,
  IconButton,
  MobileStepper,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import * as yup from 'yup'

import React, { ReactElement, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiChevronLeft } from 'react-icons/fi'

import FormNavigation from './formNavigation'

interface initVal {
  username: string
  password: string
  displayName: string
  email: string
  confirmPassword: string
}

interface Props {
  children: React.ReactNode
  initialValues: initVal
  onSubmit: (values: initVal) => void | Promise<any>
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
  min-height: 600px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0)

  const steps = React.Children.toArray(children) as ReactElement[]

  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const method = useForm<initVal>({ resolver: yupResolver(step.props.validationSchema) })

  const next = (values: initVal) => {
    setSnapshot(values)
    setStepNumber(stepNumber + 1)
  }

  const previous = (values: initVal) => {
    setSnapshot(values)
    setStepNumber(stepNumber - 1)
  }

  const formSubmitHandler = async (values: initVal) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values)
    }

    if (isLastStep) {
      return onSubmit(values)
    } else {
      next(values)
    }
  }

  return (
    <StyledContainer maxWidth="sm">
      <Stack
        sx={{ minHeight: '100%' }}
        direction="column"
        justifyContent="space-between"
        flexGrow={1}
      >
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(formSubmitHandler)}>
            <AppBar position="static" elevation={0} color="transparent">
              <Toolbar>
                {stepNumber > 0 && (
                  <IconButton edge="start" color="inherit" onClick={() => previous(snapshot)}>
                    <FiChevronLeft />
                  </IconButton>
                )}

                <Typography variant="h6" flexGrow={1} textAlign="center">
                  {step.props.header}
                </Typography>
              </Toolbar>
            </AppBar>
            <Typography>
              {step.props.body1} <br /> {step.props.body2}
            </Typography>
            {stepNumber === 0 && <UsernameStep />}
            {stepNumber === 1 && <EmailStep />}
            {stepNumber === 2 && <PasswordStep />}
            <FormNavigation isLastStep={isLastStep} />
            <MobileStepper
              variant="dots"
              steps={totalSteps}
              position="static"
              activeStep={stepNumber}
              sx={{ flexGrow: 1, marginY: 2 }}
              backButton={<Button variant="text"></Button>}
              nextButton={<Button variant="text"></Button>}
            />
          </form>
        </FormProvider>
      </Stack>
    </StyledContainer>
  )
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }: any) => children
