import { ExtendedNextPage } from '@frontend/type'
import { TopBarActionType } from '@libs/mui'
import { Typography } from '@mui/material'

const AddNewBankAccountPage: ExtendedNextPage = () => {
  return (
    <>
      <Typography variant="title2" align="center" color="primary" mt={20}>
        Commng Soon
      </Typography>
    </>
  )
}

export default AddNewBankAccountPage

AddNewBankAccountPage.topBarProps = {
  title: 'Add bank account',
  action: TopBarActionType.Back,
}
