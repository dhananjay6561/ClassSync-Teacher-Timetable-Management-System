// Import required modules
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected at:', res.rows[0].now);
    }
});

// Updated Database Schema (including free_periods for teachers)
async function updateDatabaseSchema() {
    try {
        // Drop existing tables if needed
        await pool.query('DROP TABLE IF EXISTS leaves CASCADE');
        await pool.query('DROP TABLE IF EXISTS timetables CASCADE');
        await pool.query('DROP TABLE IF EXISTS teachers CASCADE');

        // Create teachers table
        await pool.query(`
            CREATE TABLE teachers (
                teacher_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                free_periods JSONB DEFAULT '[]' -- Store free periods as JSON
            );
        `);

        // Create timetables table
        await pool.query(`
            CREATE TABLE timetables (
                timetable_id SERIAL PRIMARY KEY,
                teacher_id INT REFERENCES teachers(teacher_id),
                day_of_week VARCHAR(50) NOT NULL,
                periods JSONB NOT NULL -- Each period contains subject, class number, and section
            );
        `);

        // Create leaves table
        await pool.query(`
            CREATE TABLE leaves (
                leave_id SERIAL PRIMARY KEY,
                teacher_id INT REFERENCES teachers(teacher_id),
                date DATE NOT NULL
            );
        `);

        console.log('Database schema updated successfully!');
    } catch (err) {
        console.error('Error updating database schema:', err);
    }
}

updateDatabaseSchema();

// Routes

// Add a new teacher
app.post("/api/teachers", async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Teacher name is required" });
    }
  
    try {
      const result = await pool.query(
        "INSERT INTO teachers (name) VALUES ($1) RETURNING *",
        [name]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add teacher" });
    }
  });
  

// Add a new timetable
app.post('/api/timetable', async (req, res) => {
    const { teacherName, timetable } = req.body;
    try {
        // Get the teacher ID
        const teacher = await pool.query('SELECT teacher_id FROM teachers WHERE name = $1', [teacherName]);
        if (teacher.rows.length === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherId = teacher.rows[0].teacher_id;

        // Insert the timetable for each day
        for (let i = 0; i < timetable.length; i++) {
            const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i];
            const periods = timetable[i];

            await pool.query(
                'INSERT INTO timetables (teacher_id, day_of_week, periods) VALUES ($1, $2, $3)',
                [teacherId, dayOfWeek, JSON.stringify(periods)]
            );
        }

        res.status(200).json({ message: 'Timetable saved successfully!' });
    } catch (err) {
        console.error('Error saving timetable:', err);
        res.status(500).json({ error: 'Failed to save timetable' });
    }
});

// Get all teachers
app.get('/api/teachers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM teachers');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a timetable by teacher name
app.get('/api/timetable/:teacherName', async (req, res) => {
    const { teacherName } = req.params;
    try {
        // Get the teacher ID
        const teacher = await pool.query('SELECT teacher_id FROM teachers WHERE name = $1', [teacherName]);
        if (teacher.rows.length === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherId = teacher.rows[0].teacher_id;

        // Fetch the timetable
        const timetable = await pool.query('SELECT * FROM timetables WHERE teacher_id = $1', [teacherId]);
        res.json(timetable.rows);
    } catch (err) {
        console.error('Error fetching timetable:', err);
        res.status(500).json({ error: 'Failed to fetch timetable' });
    }
});

// Mark a teacher on leave
app.post('/api/leaves', async (req, res) => {
    const { teacherId, date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO leaves (teacher_id, date) VALUES ($1, $2) RETURNING *',
            [teacherId, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all leaves
app.get('/api/leaves', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leaves');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Generate substitutions
app.post('/api/substitutions', async (req, res) => {
    const { date } = req.body;
    try {
        // Get teachers on leave
        const leaves = await pool.query(
            'SELECT * FROM leaves WHERE date = $1',
            [date]
        );

        const leaveTeachers = leaves.rows;

        // Get all teachers
        const teachers = await pool.query('SELECT * FROM teachers');
        const allTeachers = teachers.rows;

        const substitutions = [];

        // Generate substitutions
        for (const leaveTeacher of leaveTeachers) {
            const { teacher_id } = leaveTeacher;

            // Find working periods of the absent teacher
            const absentTeacherTimetable = await pool.query(
                'SELECT * FROM timetables WHERE teacher_id = $1',
                [teacher_id]
            );

            const workingPeriods = absentTeacherTimetable.rows;

            for (const period of workingPeriods) {
                // Find a substitute teacher who is free during the absent teacher's period
                const substitute = allTeachers.find(t =>
                    t.teacher_id !== teacher_id &&
                    t.free_periods.includes(period.day_of_week)
                );

                if (substitute) {
                    substitutions.push({
                        absentTeacher: teacher_id,
                        period,
                        substituteTeacher: substitute.teacher_id,
                    });
                }
            }
        }

        res.json(substitutions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
