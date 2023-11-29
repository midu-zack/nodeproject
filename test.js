const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/user-list') {
        const usersFilePath = path.join(__dirname, 'data', 'users.json');
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const users = JSON.parse(data);
                const userListHTML = generateUserListHTML(users);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
          <html>
            <head>
              <title>User List</title>
            </head>
            <body>
              <h1>User List</h1>
              <a href="/add-user">Add User</a>
              <table border="1">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                ${userListHTML}
              </table>
            </body>
          </html>
        `);
            }
        });
    }
    if (url === '/add-user') {
        const addUserFilePath = path.join(__dirname, 'public', 'user-form.html');
        fs.readFile(addUserFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    if (req.method === 'POST' && url === '/save-user') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Parse form data
            const formData = new URLSearchParams(body);
            const name = formData.get('name');
            const email = formData.get('email');

            // Add your logic here to update users.json file with new user data
            // For simplicity, let's assume 'users' is an array containing user objects

            // Example: Assuming 'users' is an array of user objects
            const newUser = {
                id: Math.floor(Math.random() * 1000), // Example: Generate an ID (You can have a better mechanism)
                name,
                email,
            };

            // Read existing user data from JSON file
            const usersFilePath = path.join(__dirname, 'data', 'users.json');
            fs.readFile(usersFilePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    let users = JSON.parse(data);
                    users.push(newUser);

                    // Write updated user data back to the JSON file
                    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(302, { 'Location': '/user-list' }); // Redirect to user list page
                            res.end();
                        }
                    });
                }
            });
        });
    }
    if (url.startsWith('/edit-user')) {
        const userId = parseInt(url.split('?id=')[1]); // Extracting user ID from URL (simplified)

        const usersFilePath = path.join(__dirname, 'data', 'users.json');
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const users = JSON.parse(data);
                const userToEdit = users.find(user => user.id === userId);

                if (!userToEdit) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('User Not Found');
                } else {
                    const formPagePath = path.join(__dirname, 'public', 'user-form.html');
                    fs.readFile(formPagePath, 'utf8', (err, formPageContent) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                        } else {
                            // Modify 'user-form.html' to pre-fill user data for editing
                            const editedFormPageContent = formPageContent
                                .replace(/{{name}}/g, userToEdit.name)
                                .replace(/{{email}}/g, userToEdit.email);

                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(editedFormPageContent);
                        }
                    });
                }
            }
        });
    }
    if (url.startsWith('/delete-user')) {
        const userId = parseInt(url.split('?id=')[1]); // Extract user ID from URL

        const usersFilePath = path.join(__dirname, 'data', 'users.json');
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                let users = JSON.parse(data);

                // Find user index by ID in the users array
                const userIndex = users.findIndex(user => user.id === userId);

                if (userIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('User Not Found');
                } else {
                    // Remove the user from the array using splice
                    users.splice(userIndex, 1);

                    // Write updated user data back to the JSON file
                    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(302, { 'Location': '/user-list' }); // Redirect to user list page
                            res.end();
                        }
                    });
                }
            }
        });
    }
});

function generateUserListHTML(users) {
    return users.map(user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <a href="/edit-user?id=${user.id}">Edit</a> |
        <a href="/delete-user?id=${user.id}">Delete</a>
      </td>
    </tr>
  `).join('');
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
