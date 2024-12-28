import fs from 'fs';

type User = {
    username: string;
    password: string;
};

function login(username: string, password: string): string {
    try {
        // Read the users.json file
        const data = fs.readFileSync('./app/_backend/_quizModule/_src/_data/users.json', 'utf-8');
        const users: User[] = JSON.parse(data);

        // Find the user with the given username and password
        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            return `Login successful! Welcome, ${user.username}.`;
        } else {
            return 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Error reading users.json:', error);
        return 'An error occurred while processing the login.';
    }
}

// Example usage
const username = 'testuser'; // Replace with user input
const password = 'testpassword'; // Replace with user input
console.log(login(username, password));
