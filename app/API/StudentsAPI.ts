import instance from "./Axios"

export const getStudentsApi = async () => {
  return await instance.get('/student/todos')

}
