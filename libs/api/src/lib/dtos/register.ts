export interface IUserChangePasswordRequestDTO {
  currentPassword: string
  newPassword: string
}

export interface IUserRegistrationRequestDTO {
  username: string
  displayName: string
  email: string
  password: string
}

export interface IAdminCreationRequestDTO {
  username: string
  password: string
}
