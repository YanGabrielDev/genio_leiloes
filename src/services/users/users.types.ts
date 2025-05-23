export interface CreateUser {
  email: string, 
  name: string,
  password: string,
  confirm_password?: string,
}
  
export interface LoginUser {
  email: string, 
  password: string,
}
