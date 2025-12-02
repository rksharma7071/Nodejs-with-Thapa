import mysql from "mysql2/promise";

// Create MySQL connection
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin@123",
});

console.log("MySQL Connected Successfully!");

// Create Database
const createDatabase = async (dbName) => {
    try {
        await db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log("Database created or already exists");

        // Switch to DB
        await db.query(`USE ${dbName}`);
        console.log(`Using database: ${dbName}`);
    } catch (error) {
        console.log("Database error:", error.code);
    }
};

// Create Table
const createTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE
            )
        `);

        console.log("Table created successfully!");
    } catch (error) {
        console.log("Table creation error:", error.code);
    }
};

// Insert User
const insertUser = async (name, email) => {
    try {
        await db.query(`INSERT INTO users (name, email) VALUES (?, ?)`, [
            name,
            email,
        ]);
        console.log("User inserted:", name);
    } catch (error) {
        if (error.code == "ER_DUP_ENTRY") {
            console.log(`User email ${email} is already exist!`);
        } else {
            console.log("Insert error:", error.code);
        }
    }
};

// Insert Multiples User
const insertMultipleUser = async (users) => {
    for (const { name, email } of users) {
        try {
            await db.query(`INSERT INTO users (name, email) VALUES (?, ?)`, [
                name,
                email,
            ]);
            console.log("User inserted:", name);
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                console.log(`User email ${email} is already exist!`);
            } else {
                console.log("Insert error:", error.code);
            }
        }
    }
};

// Update User
const updateUser = async (email, newData) => {
    const { name } = newData;

    try {
        const [result] = await db.query(
            `UPDATE users SET name = ? WHERE email = ?`,
            [name, email]
        );

        if (result.affectedRows === 0) {
            console.log("No user found with email:", email);
        } else {
            console.log("User updated successfully:", email);
        }

    } catch (error) {
        console.log("Update error:", error.code);
    }
};

// Delete User
const deleteUser = async (email) => {
    try {
        const [result] = await db.query(
            "DELETE FROM users WHERE email = ?",
            [email]
        );

        if (result.affectedRows === 0) {
            console.log(`No user found with email: ${email}`);
        } else {
            console.log(`Deleted user with email: ${email}`);
        }

        console.log(await getUsers());
    } catch (error) {
        console.log("Delete error:", error.code);
    }
};

// Get Users
const getUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

// ====================== RUN SCRIPT =========================

await createDatabase("mysql_db");
await createTable();

const users = [
    { name: "Amit Sharma", email: "amit.sharma@example.com" },
    { name: "Priya Verma", email: "priya.verma@example.com" },
    { name: "Rohan Singh", email: "rohan.singh@example.com" },
    { name: "Sneha Patel", email: "sneha.patel@example.com" },
    { name: "Vishal Mishra", email: "vishal.mishra@example.com" },
    { name: "Neha Gupta", email: "neha.gupta@example.com" },
    { name: "Rahul Mehta", email: "rahul.mehta@example.com" },
    { name: "Anjali Soni", email: "anjali.soni@example.com" },
    { name: "Karan Yadav", email: "karan.yadav@example.com" },
    { name: "Pooja Nair", email: "pooja.nair@example.com" },
    { name: "Saurabh Kulkarni", email: "saurabh.kulkarni@example.com" },
    { name: "Nikita Jain", email: "nikita.jain@example.com" },
    { name: "Harshit Arora", email: "harshit.arora@example.com" },
    { name: "Divya Menon", email: "divya.menon@example.com" },
    { name: "Manish Tiwari", email: "manish.tiwari@example.com" },
    { name: "Swati Mishra", email: "swati.mishra@example.com" },
    { name: "Yogesh Shinde", email: "yogesh.shinde@example.com" },
    { name: "Tanvi Desai", email: "tanvi.desai@example.com" },
    { name: "Arjun Bedi", email: "arjun.bedi@example.com" },
    { name: "Megha Kapoor", email: "megha.kapoor@example.com" },
];

// await insertUser("Aman", "aman@gmail.com");

// await insertMultipleUser(users);

// console.log(await getUsers());

await deleteUser('nikita.jain@example.com')

await db.end();
console.log("Connection Closed");
