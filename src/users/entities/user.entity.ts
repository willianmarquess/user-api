import { randomUUID } from "crypto";

export class User {
    public id: string;
    public email: string;
    public password: string;
  
    constructor(email: string, password: string, id: string = null) {
      this.email = email;
      this.password = password;
      this.id = id || randomUUID();
    }
}
