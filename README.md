# ClassSync: Teacher Timetable Management System

## **Overview**
ClassSync is a full-stack web application designed to simplify and automate teacher timetable management for educational institutions. The system allows administrators to input and manage teacher timetables, ensuring streamlined substitution management for absent teachers.

## **Features**
- Dynamic timetable input for teachers (5 days × 8 periods).
- Storage and retrieval of timetables using PostgreSQL.
- Teacher registration and timetable association.
- API-driven architecture for seamless frontend-backend communication.
- Intuitive user interface built with React and Tailwind CSS.

---

## **Project Architecture**

### **Frontend**
- **Framework**: React (with Vite for optimized development).
- **Styling**: Tailwind CSS.
- **Functionality**:
  - A form to input teacher name and timetable (5×8 grid).
  - Submits data to the backend via API.
  - Displays error or success messages based on server response.

### **Backend**
- **Framework**: Express.js.
- **Database**: PostgreSQL.
- **Endpoints**:
  - `POST /api/timetable`: Stores teacher timetable data.
  - `GET /api/timetable/:teacherName`: Retrieves timetable data for a specific teacher.
  - `POST /api/teachers`: Adds a teacher to the database.
  - `GET /api/teachers`: Fetches all registered teachers.
  - `POST /api/leaves`: Records teacher leave.
  - `POST /api/substitutions`: Generates teacher substitutions for absentees.

---

## **Installation**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/dhananjay6561/ClassSync-Teacher-Timetable-Management-System
   cd ClassSync/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure PostgreSQL:
   - Create a `.env` file in the backend directory:
     ```
     DB_USER=<your_postgresql_username>
     DB_PASSWORD=<your_postgresql_password>
     DB_HOST=localhost
     DB_PORT=5432
     DB_DATABASE=classsync
     ```
   - Ensure your PostgreSQL server is running and create a database:
     ```sql
     CREATE DATABASE classsync;
     ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at:
   ```
   http://localhost:5173
   ```

---

## **How It Works**
1. **Register Teacher**:
   - Use the `POST /api/teachers` endpoint or frontend form to add a teacher.

2. **Add Timetable**:
   - Enter a teacher's name and their 5×8 timetable via the frontend form.
   - The timetable is stored in the PostgreSQL `timetables` table.

3. **View Timetable**:
   - Retrieve a teacher's timetable using the `GET /api/timetable/:teacherName` endpoint.

4. **Substitute Teachers**:
   - Mark absent teachers via `POST /api/leaves`.
   - Generate substitution schedules with the `POST /api/substitutions` endpoint.

---

## **Contributing**
We welcome contributions to enhance the functionality of ClassSync. Follow these steps:

1. **Fork the Repository**:
   ```bash
   git fork https://github.com/dhananjay6561/ClassSync-Teacher-Timetable-Management-System
   ```

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/dhananjay6561/ClassSync-Teacher-Timetable-Management-System/fork
   cd ClassSync
   ```

3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**:
   - Update code in the `frontend` or `backend` directory.
   - Add documentation for your feature in this README if necessary.

5. **Test Your Changes**:
   - Run the backend and frontend locally.

6. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**:
   - Navigate to the original repository and create a pull request from your fork.

---

## **Future Enhancements**
- Implement user authentication for secure access.
- Add analytics to visualize teacher workload and substitution frequency.
- Provide email notifications for substitutions.

---

## **Outro**
ClassSync aims to streamline teacher scheduling and substitution management, reducing manual workload and errors. Your contributions and feedback are invaluable to improving this project. Let’s make educational administration seamless and efficient!

---

Happy Coding! 🎉
