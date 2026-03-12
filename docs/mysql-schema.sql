-- Delight International School - MySQL Schema

-- Students
CREATE TABLE Students (
  StudentID INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(100),
  Surname VARCHAR(100),
  OtherName VARCHAR(100),
  Gender VARCHAR(10),
  DateOfBirth DATE,
  ClassID INT,
  ParentID INT,
  Contact VARCHAR(50),
  Address VARCHAR(255),
  Picture VARCHAR(255)
);

-- Teachers
CREATE TABLE Teachers (
  TeacherID INT AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(100),
  Gender VARCHAR(10),
  Phone VARCHAR(50),
  Email VARCHAR(100),
  Subject VARCHAR(100),
  Address VARCHAR(255)
);

-- Parents
CREATE TABLE Parents (
  ParentID INT AUTO_INCREMENT PRIMARY KEY,
  FatherName VARCHAR(100),
  MotherName VARCHAR(100),
  Contact1 VARCHAR(50),
  Contact2 VARCHAR(50),
  Address VARCHAR(255)
);

-- Classes
CREATE TABLE Classes (
  ClassID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50),
  TeacherID INT
);

-- Subjects
CREATE TABLE Subjects (
  SubjectID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100)
);

-- Users (for login/auth)
CREATE TABLE Users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(100) UNIQUE,
  PasswordHash VARCHAR(255),
  Role VARCHAR(20),
  Email VARCHAR(100)
);

-- Enrollments (student-class link)
CREATE TABLE Enrollments (
  EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
  StudentID INT,
  ClassID INT,
  AcademicYear VARCHAR(20)
);
