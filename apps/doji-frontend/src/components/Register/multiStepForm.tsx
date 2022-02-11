import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { AppBar, Button, IconButton, MobileStepper, Toolbar, Typography } from '@mui/material'
import { Form, Formik, FormikConfig, FormikHelpers, FormikValues } from 'formik'

import React, { ReactElement, useState } from 'react'

import FormNavigation from './formNavigation'

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0)

  const steps = React.Children.toArray(children) as ReactElement[]

  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const next = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(stepNumber + 1)
  }

  const previous = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(stepNumber - 1)
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values)
    }

    if (isLastStep) {
      return onSubmit(values, actions)
    } else {
      actions.setTouched({})
      next(values)
    }
  }

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <AppBar position="static" elevation={0}>
              <Toolbar>
                {stepNumber > 0 && (
                  <IconButton edge="start" color="inherit" onClick={() => previous(formik.values)}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                )}

                <Typography variant="h6" flexGrow={1} textAlign="center">
                  {step.props.header}
                </Typography>
              </Toolbar>
            </AppBar>
            <Typography margin={2}>
              {step.props.body1} <br /> {step.props.body2}
            </Typography>
            {step}
            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
            <MobileStepper
              variant="dots"
              steps={totalSteps}
              position="static"
              activeStep={stepNumber}
              sx={{ maxWidth: 400, flexGrow: 1 }}
              backButton={<Button variant="text"></Button>}
              nextButton={<Button variant="text"></Button>}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }: any) => children
