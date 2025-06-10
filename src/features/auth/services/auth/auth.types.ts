export interface CreateUser {
  email: string
  name: string
  password: string
  confirm_password?: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface ProfileData {
  id: number
  name: string
  email: string
  email_verified: boolean
  created_at: string
  current_plan: {
    id: number
    plan_name: string
    start_date: string
    end_date: string | null
    is_active: boolean
  }
}

export interface ValidateUsers {
  accessToken: string
  name: string
  email: string
  picture: string
  sub: string
}
