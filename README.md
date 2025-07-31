Sickle Cell Crisis Tracker – Health Monitoring Web App
Welcome to the Sickle Cell Crisis Tracker, a web-based platform designed to help individuals living with Sickle Cell Disease (SCD) track their health, monitor pain episodes, and share vital information with caregivers.

Tech Stack
Frontend
HTML, CSS, JavaScript

Responsive UI optimized for mobile and desktop

Deployed on GitHub pages and render

Backend
Node.js + Express.js

RESTful API design for user authentication, pain log storage, and profile data


Database
MongoDB (Mongoose ODM) for scalable storage

Pain logs

Caretaker info

User health profiles

Authentication
JSON Web Tokens (JWT) for secure, persistent sessions

Deployment Ready
Render, GitHub Pages (frontend)

Features
1. Sign Up as a Patient 
Patients register with name, email, phone number, and password

Caregivers register with basic info relationship to patient, and optional notes(after logging in)

2. Secure Login
Email + password authentication



3. Dashboard Access
After login, users are redirected to a role-specific dashboard:

Patients:

Log pain episodes with date, intensity, location, and notes

Track health status (conditions, allergies, medications)

Upload profile photo and see progress of profile completion

Caregivers:

View patient info and recent pain logs

Access emergency instructions

4. Pain Log Management
Add pain logs

Filter Pain logs

Delete pain logs


5. Caregiver Information
Patients can add and update caregiver contact details

View caregiver info directly from the dashboard during emergencies

6. Profile Editing
Update personal details and health information

7. Resources to watch on information about sickle cell

8. Reminder buttons
Set reminders according to what action needed e.g hydration, wellness check, medication

8. Persistent Data
All user data (accounts, pain logs, caregiver details, and profiles) is stored in MongoDB via Mongoose.

Local Setup Instructions
Follow the steps below to run the app locally on your machine:

1. Clone the Repository
git clone (clone this repository in your file editor)
2. Install Backend Dependencies
npm install
3. Start the Backend
npm run server
If successful, you’ll see:
Server running on port 3000
4. Launch the Frontend
 Use VS Code Live Server

Right-click index.html → Open with Live Server

5. Login & Start Using
Default login is disabled; create a user first

Data is persisted locally and ready for API integration

Navigation

Signup – Patients can create an account by providing their details (name, email, password, and any additional info).

Login – Secure login using email and password; authenticated users are redirected to the dashboard.

Front Page / Home (Dashboard) – Main control panel that gives users access to all the app’s features, including:

Viewing personal health status and caregiver information

Adding and managing pain logs

Editing profile and health data

Accessing exports, alerts, and additional tools

Logout – Users can securely log out from their session; this clears their authentication token.

All accessible in the top nav