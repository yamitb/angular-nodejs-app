export interface User {
 id:string,
 firstName: string,
 lastName: string,
 email: string,
 password?:string,
 age?: number,
 address?:{
   street?: string,
   city?: string
 },

 image?: string,
 isActive?: boolean,
 balance?: number,
 registered? :any,
 hide?: boolean
}