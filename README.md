Project Overview

The Hospital Network Management System is a web-based application that connects different sections of a hospital through a centralized platform.

This system allows:

Doctors to log in and prescribe treatments

Departments to view prescriptions

A timeline to track all patient updates

Real-time data sharing within the hospital network

The goal of this project is to improve communication between doctors and hospital departments and maintain a structured patient update record.
Features
 1. Login Interface (Index Page)
Users can log in as:
Doctor
Department
Timeline Viewer
Simple and user-friendly interface.

 2. Doctor Section
Doctors can:
Enter patient names
Write prescriptions
Data is saved to the system
Information becomes visible in other sections

3. Department Section
Departments can:
View patient prescription
Access treatment details written by doctors

4. Timeline Section

Displays:
All patient updates
Prescription history
Overall activity log

 5. Styling

Custom CSS styling applied
Clean and structured UI design

 Technologies Used
Frontend:
HTML
CSS
JavaScript
Backend:
Node.js
Express.js

Data Handling:
JSON file storage (data.json)

Project Structure
HospitalNetwork/
 public/
    index.html
    doctor.html
    department.html
    timeline.html
 style.css
 script.js
server.js
 data.json
 package.json
 package-lock.json

How It Works:

The server runs on port 3000
Static files are served using Express
Doctor enters patient data
Data is saved into data.json
Department and Timeline pages fetch data using:
GET /data
Updates are reflected across all sections

How to Run the Project:

Install Node.js
Open terminal in project folder
Run:
npm install
node server.js
Open browser and go to:
http://localhost:3000

Objective of the Project:

To create a connected hospital system where:
Information flows smoothly
Doctors and departments are synchronized
Patient updates are centralized
Communication gaps are reduced

 Future Improvements:

Database integration (MongoDB / MySQL)
User authentication system
Role-based access control
Real-time updates using WebSockets
Better UI/UX enhancements

Developed By

Team 404 Not Found
Team Members:
K.Pooja Sri
G.Baby Kavya
MD.Sana
Hospital Network Project
