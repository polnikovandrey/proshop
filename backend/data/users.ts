import bcrypt from "bcryptjs";

class User {
    constructor(name: String,
                email: String,
                password: String,
                admin: boolean = false) {
    }
}
export const users = [
    new User(
        'Admin User',
        'admin@example.com',
        bcrypt.hashSync('123456'),
        true
    ),
    new User(
        'John Doe',
        'john@example.com',
        bcrypt.hashSync('123456'),
    ),
    new User(
        'Jane Doe',
        'jane@exmaple.com',
        bcrypt.hashSync('123456'),
    )
];