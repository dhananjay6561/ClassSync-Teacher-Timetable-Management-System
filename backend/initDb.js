const pool = require("./db");

const createTables = async () => {
  try {
    // Create Teachers Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        teacher_id SERIAL PRIMARY KEY,
        teacher_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Timetables Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS timetables (
        timetable_id SERIAL PRIMARY KEY,
        teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Timetable Periods Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS timetable_periods (
        id SERIAL PRIMARY KEY,
        timetable_id INT REFERENCES timetables(timetable_id) ON DELETE CASCADE,
        day_of_week VARCHAR(10) NOT NULL,
        period_number INT NOT NULL,
        class_section VARCHAR(10) DEFAULT 'FREE',
        subject VARCHAR(255) DEFAULT NULL
      );
    `);

    // Create Substitution Periods Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS substitution_periods (
        id SERIAL PRIMARY KEY,
        absent_teacher_id INT REFERENCES teachers(teacher_id),
        day_of_week VARCHAR(10) NOT NULL,
        period_number INT NOT NULL,
        substitute_teacher_id INT REFERENCES teachers(teacher_id),
        class_section VARCHAR(10) DEFAULT NULL,
        subject VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("All tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    pool.end();
  }
};

createTables();
