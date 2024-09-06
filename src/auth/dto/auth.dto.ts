

export class SignUpDto {
    user_name?:string;
    emailId?:string;
    dob?:string;
    address?:string;
    password?:string;
    phone?:string;
  
}




export class SignInDto {
    emailId?:string;
    password?:string;
}


export class AdminSignInDto {
    admin_emailId?: string;
    admin_password?: string;
  }



