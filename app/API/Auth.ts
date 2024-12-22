import instance from "./Axios"

export const SignUpApi=async ({email,password,username}:{email:string,password:string,username:string})=>
  {
    return await instance.post('/auth/signup',{email,password,username})
  }
  export const LoginApi=async ({email,password}:{email:string,password:string})=>
    {
      return await instance.post('/auth/login',{email,password})
    }