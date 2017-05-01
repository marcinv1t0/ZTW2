export class User {
    Id :number;
    Username: string;
    Role: string;
    Password: string;
    RememberMe: boolean;

    constructor(Id: number, username: string, role: string,
        password: string ) {
        this.Id = Id;
        this.Username = username;
        this.Role = role;
        this.Password = password;
        this.RememberMe = false;
    }



}