import bcrypt from "bcryptjs";

export class UserData {
    constructor(
        public name: String,
        public email: String,
        public password: String,
        public admin: boolean = false) {
    }
}

export const users: UserData[] = [
    new UserData(
        'Admin User',
        'admin@example.com',
        bcrypt.hashSync('123456'),
        true
    ),
    new UserData(
        'John Doe',
        'john@example.com',
        bcrypt.hashSync('123456'),
    ),
    new UserData(
        'Jane Doe',
        'jane@exmaple.com',
        bcrypt.hashSync('123456'),
    )
];