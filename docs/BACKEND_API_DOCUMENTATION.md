# Delight International School - Backend API Documentation

## Overview
This document outlines all database models, API endpoints, and authentication requirements for the FastAPI backend of Delight International School's management system.

---

## Table of Contents
1. [Database Models](#database-models)
2. [Authentication & Authorization](#authentication--authorization)
3. [API Endpoints](#api-endpoints)
4. [Admin Backdoor Access](#admin-backdoor-access)
5. [Email Verification Flow](#email-verification-flow)
6. [Enums & Constants](#enums--constants)
7. [Database Relationships Diagram](#database-relationships-diagram)

---

## Database Models

### 1. User (Base Account Model)
Core user account for authentication and authorization.

```python
class User(Base):
    __tablename__ = "users"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str = Field(max_length=255)
    
    # Email Verification
    email_verified: bool = Field(default=False)
    email_verification_token: Optional[str] = Field(max_length=255, nullable=True)
    email_verification_expires: Optional[datetime] = Field(nullable=True)
    
    # Account Status
    is_active: bool = Field(default=True)
    is_locked: bool = Field(default=False)
    failed_login_attempts: int = Field(default=0)
    last_login: Optional[datetime] = Field(nullable=True)
    
    # Role & Permissions
    role: UserRole = Field(default=UserRole.PARENT)  # PARENT, STAFF, ADMIN, SUPER_ADMIN
    
    # Password Reset
    password_reset_token: Optional[str] = Field(max_length=255, nullable=True)
    password_reset_expires: Optional[datetime] = Field(nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    parent_profile: Optional["ParentGuardian"] = Relationship(back_populates="user")
    staff_profile: Optional["Staff"] = Relationship(back_populates="user")
```

---

### 2. ParentGuardian
Parent/Guardian profile linked to User account.

```python
class ParentGuardian(Base):
    __tablename__ = "parents_guardians"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", unique=True)
    
    # Personal Information
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    other_names: Optional[str] = Field(max_length=100, nullable=True)
    phone_primary: str = Field(max_length=20)
    phone_secondary: Optional[str] = Field(max_length=20, nullable=True)
    
    # Identification
    ghana_card_number: Optional[str] = Field(max_length=20, nullable=True)
    
    # Address
    residential_address: str = Field(max_length=500)
    digital_address: Optional[str] = Field(max_length=20, nullable=True)  # Ghana GPS
    city: str = Field(max_length=100, default="Accra")
    region: str = Field(max_length=100, default="Greater Accra")
    
    # Employment (optional)
    occupation: Optional[str] = Field(max_length=200, nullable=True)
    employer: Optional[str] = Field(max_length=200, nullable=True)
    work_address: Optional[str] = Field(max_length=500, nullable=True)
    
    # Emergency Contact
    emergency_contact_name: Optional[str] = Field(max_length=200, nullable=True)
    emergency_contact_phone: Optional[str] = Field(max_length=20, nullable=True)
    emergency_contact_relationship: Optional[str] = Field(max_length=50, nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="parent_profile")
    students: List["Student"] = Relationship(back_populates="parent_guardian")
    applications: List["Application"] = Relationship(back_populates="applicant_parent")
```

---

### 3. Student
Enrolled student records.

```python
class Student(Base):
    __tablename__ = "students"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    # Student Identification
    student_id: str = Field(unique=True, max_length=20)  # e.g., "DIS-2024-0001"
    
    # Personal Information
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    other_names: Optional[str] = Field(max_length=100, nullable=True)
    date_of_birth: date = Field()
    gender: Gender = Field()  # MALE, FEMALE
    
    # Identification Documents
    birth_certificate_number: Optional[str] = Field(max_length=50, nullable=True)
    passport_photo_url: Optional[str] = Field(max_length=500, nullable=True)
    
    # Health Information
    blood_group: Optional[str] = Field(max_length=5, nullable=True)
    allergies: Optional[str] = Field(max_length=500, nullable=True)
    medical_conditions: Optional[str] = Field(max_length=500, nullable=True)
    
    # Academic Information
    current_class_id: Optional[UUID] = Field(foreign_key="classes.id", nullable=True)
    enrollment_date: date = Field()
    enrollment_status: EnrollmentStatus = Field(default=EnrollmentStatus.ACTIVE)
    previous_school: Optional[str] = Field(max_length=200, nullable=True)
    
    # Parent/Guardian
    parent_guardian_id: UUID = Field(foreign_key="parents_guardians.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    parent_guardian: "ParentGuardian" = Relationship(back_populates="students")
    current_class: Optional["Class"] = Relationship(back_populates="students")
    academic_records: List["AcademicRecord"] = Relationship(back_populates="student")
    attendance_records: List["Attendance"] = Relationship(back_populates="student")
    fee_payments: List["FeePayment"] = Relationship(back_populates="student")
```

---

### 4. Application (Admission Application)
Student admission applications submitted via the website.

```python
class Application(Base):
    __tablename__ = "applications"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    application_number: str = Field(unique=True, max_length=20)  # e.g., "APP-2024-0001"
    
    # Student Information
    student_full_name: str = Field(max_length=200)
    student_date_of_birth: date = Field()
    student_gender: Gender = Field()
    
    # Program Applied For
    program: Program = Field()  # EARLY_YEARS, PRIMARY, JHS
    grade_level: str = Field(max_length=50)  # Nursery, KG1, KG2, Primary 1-6, JHS 1-3
    academic_year: str = Field(max_length=20)  # e.g., "2024/2025"
    
    # Parent/Guardian Information
    applicant_parent_id: Optional[UUID] = Field(foreign_key="parents_guardians.id", nullable=True)
    parent_name: str = Field(max_length=200)
    parent_contact: str = Field(max_length=20)
    parent_email: Optional[str] = Field(max_length=255, nullable=True)
    residential_address: str = Field(max_length=500)
    
    # Application Documents
    birth_certificate_url: Optional[str] = Field(max_length=500, nullable=True)
    passport_photo_url: Optional[str] = Field(max_length=500, nullable=True)
    previous_school_report_url: Optional[str] = Field(max_length=500, nullable=True)
    
    # Application Status
    status: ApplicationStatus = Field(default=ApplicationStatus.PENDING)
    # PENDING, UNDER_REVIEW, ASSESSMENT_SCHEDULED, ACCEPTED, REJECTED, WAITLISTED
    
    # Assessment/Interview
    assessment_date: Optional[datetime] = Field(nullable=True)
    assessment_score: Optional[float] = Field(nullable=True)
    assessment_notes: Optional[str] = Field(max_length=1000, nullable=True)
    
    # Decision
    decision_date: Optional[datetime] = Field(nullable=True)
    decision_by_id: Optional[UUID] = Field(foreign_key="users.id", nullable=True)
    decision_notes: Optional[str] = Field(max_length=1000, nullable=True)
    
    # Timestamps
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    applicant_parent: Optional["ParentGuardian"] = Relationship(back_populates="applications")
    decision_by: Optional["User"] = Relationship()
```

---

### 5. Staff (Teachers & Administrative Staff)
School employees including teachers and administrators.

```python
class Staff(Base):
    __tablename__ = "staff"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", unique=True)
    
    # Staff Identification
    staff_id: str = Field(unique=True, max_length=20)  # e.g., "STF-2024-001"
    
    # Personal Information
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    other_names: Optional[str] = Field(max_length=100, nullable=True)
    date_of_birth: date = Field()
    gender: Gender = Field()
    
    # Contact
    phone_primary: str = Field(max_length=20)
    phone_secondary: Optional[str] = Field(max_length=20, nullable=True)
    residential_address: str = Field(max_length=500)
    
    # Identification
    ghana_card_number: Optional[str] = Field(max_length=20, nullable=True)
    
    # Employment Details
    staff_type: StaffType = Field()  # TEACHER, ADMIN, SUPPORT
    department: Optional[str] = Field(max_length=100, nullable=True)
    position: str = Field(max_length=100)
    date_joined: date = Field()
    employment_status: EmploymentStatus = Field(default=EmploymentStatus.ACTIVE)
    
    # Qualifications (for teachers)
    qualifications: Optional[str] = Field(max_length=500, nullable=True)
    subjects_taught: Optional[str] = Field(max_length=500, nullable=True)  # JSON array
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="staff_profile")
    classes_taught: List["ClassTeacher"] = Relationship(back_populates="teacher")
```

---

### 6. Program
Educational programs offered by the school.

```python
class ProgramModel(Base):
    __tablename__ = "programs"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    name: str = Field(max_length=100)  # "Early Years", "Primary", "Junior High"
    code: str = Field(unique=True, max_length=20)  # "EY", "PRI", "JHS"
    description: Optional[str] = Field(max_length=500, nullable=True)
    age_range: str = Field(max_length=20)  # "2-5", "6-11", "12-15"
    
    is_active: bool = Field(default=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    classes: List["Class"] = Relationship(back_populates="program")
```

---

### 7. Class (Grade/Class)
Academic classes/grades.

```python
class Class(Base):
    __tablename__ = "classes"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    name: str = Field(max_length=50)  # "Nursery 1", "KG 2", "Primary 3", "JHS 1"
    code: str = Field(unique=True, max_length=20)  # "NUR1", "KG2", "PRI3", "JHS1"
    program_id: UUID = Field(foreign_key="programs.id")
    
    # Capacity
    max_capacity: int = Field(default=30)
    current_enrollment: int = Field(default=0)
    
    # Academic Year
    academic_year_id: UUID = Field(foreign_key="academic_years.id")
    
    is_active: bool = Field(default=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    program: "ProgramModel" = Relationship(back_populates="classes")
    academic_year: "AcademicYear" = Relationship(back_populates="classes")
    students: List["Student"] = Relationship(back_populates="current_class")
    teachers: List["ClassTeacher"] = Relationship(back_populates="class_")
    subjects: List["ClassSubject"] = Relationship(back_populates="class_")
```

---

### 8. Subject
Academic subjects taught.

```python
class Subject(Base):
    __tablename__ = "subjects"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    name: str = Field(max_length=100)
    code: str = Field(unique=True, max_length=20)
    description: Optional[str] = Field(max_length=500, nullable=True)
    
    # Subject Category
    category: SubjectCategory = Field()
    # CORE (Math, English, Science), ELECTIVE, EXTRACURRICULAR
    
    is_active: bool = Field(default=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    class_subjects: List["ClassSubject"] = Relationship(back_populates="subject")
```

**Default Subjects to Seed:**
- Mathematics (MATH)
- English Language (ENG)
- Science (SCI)
- ICT (ICT)
- Social Studies (SOC)
- Creative Arts (ART)
- Religious & Moral Education (RME)
- Physical Education (PE)
- French (FRE) - Optional
- Ghanaian Language (TWI) - Optional

---

### 9. AcademicYear
School academic years/sessions.

```python
class AcademicYear(Base):
    __tablename__ = "academic_years"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    name: str = Field(unique=True, max_length=20)  # "2024/2025"
    start_date: date = Field()
    end_date: date = Field()
    
    is_current: bool = Field(default=False)
    is_active: bool = Field(default=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    terms: List["AcademicTerm"] = Relationship(back_populates="academic_year")
    classes: List["Class"] = Relationship(back_populates="academic_year")
```

---

### 10. AcademicTerm
School terms within an academic year.

```python
class AcademicTerm(Base):
    __tablename__ = "academic_terms"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    academic_year_id: UUID = Field(foreign_key="academic_years.id")
    
    name: str = Field(max_length=50)  # "First Term", "Second Term", "Third Term"
    term_number: int = Field()  # 1, 2, 3
    start_date: date = Field()
    end_date: date = Field()
    
    is_current: bool = Field(default=False)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    academic_year: "AcademicYear" = Relationship(back_populates="terms")
    academic_records: List["AcademicRecord"] = Relationship(back_populates="term")
```

---

### 11. AcademicRecord (Grades/Results)
Student academic performance records.

```python
class AcademicRecord(Base):
    __tablename__ = "academic_records"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    student_id: UUID = Field(foreign_key="students.id")
    class_id: UUID = Field(foreign_key="classes.id")
    subject_id: UUID = Field(foreign_key="subjects.id")
    term_id: UUID = Field(foreign_key="academic_terms.id")
    
    # Assessment Scores
    class_score: Optional[float] = Field(nullable=True)  # 30% typically
    exam_score: Optional[float] = Field(nullable=True)  # 70% typically
    total_score: Optional[float] = Field(nullable=True)
    
    # Grade
    grade: Optional[str] = Field(max_length=5, nullable=True)  # A1, B2, C4, etc.
    remarks: Optional[str] = Field(max_length=200, nullable=True)
    
    # Teacher
    recorded_by_id: UUID = Field(foreign_key="users.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    student: "Student" = Relationship(back_populates="academic_records")
    class_: "Class" = Relationship()
    subject: "Subject" = Relationship()
    term: "AcademicTerm" = Relationship(back_populates="academic_records")
    recorded_by: "User" = Relationship()
```

---

### 12. Attendance
Daily student attendance records.

```python
class Attendance(Base):
    __tablename__ = "attendance"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    student_id: UUID = Field(foreign_key="students.id")
    class_id: UUID = Field(foreign_key="classes.id")
    date: date = Field()
    
    status: AttendanceStatus = Field()  # PRESENT, ABSENT, LATE, EXCUSED
    
    check_in_time: Optional[time] = Field(nullable=True)
    check_out_time: Optional[time] = Field(nullable=True)
    
    remarks: Optional[str] = Field(max_length=200, nullable=True)
    recorded_by_id: UUID = Field(foreign_key="users.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    student: "Student" = Relationship(back_populates="attendance_records")
    class_: "Class" = Relationship()
    recorded_by: "User" = Relationship()
    
    # Unique constraint
    __table_args__ = (
        UniqueConstraint('student_id', 'date', name='unique_student_attendance_per_day'),
    )
```

---

### 13. FeeStructure
School fee definitions.

```python
class FeeStructure(Base):
    __tablename__ = "fee_structures"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    name: str = Field(max_length=100)  # "Tuition Fee", "Feeding Fee", "Books"
    fee_type: FeeType = Field()  # TUITION, FEEDING, BOOKS, UNIFORM, TRANSPORT, OTHER
    
    program_id: UUID = Field(foreign_key="programs.id")
    academic_year_id: UUID = Field(foreign_key="academic_years.id")
    term_id: Optional[UUID] = Field(foreign_key="academic_terms.id", nullable=True)
    
    amount: Decimal = Field(decimal_places=2)
    currency: str = Field(default="GHS", max_length=3)
    
    is_mandatory: bool = Field(default=True)
    is_active: bool = Field(default=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    program: "ProgramModel" = Relationship()
    academic_year: "AcademicYear" = Relationship()
    term: Optional["AcademicTerm"] = Relationship()
```

---

### 14. FeePayment
Student fee payment records.

```python
class FeePayment(Base):
    __tablename__ = "fee_payments"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    receipt_number: str = Field(unique=True, max_length=50)  # "RCP-2024-00001"
    
    student_id: UUID = Field(foreign_key="students.id")
    fee_structure_id: UUID = Field(foreign_key="fee_structures.id")
    
    amount_paid: Decimal = Field(decimal_places=2)
    payment_method: PaymentMethod = Field()  # CASH, BANK_TRANSFER, MOBILE_MONEY
    
    # Payment Reference (for mobile money, bank transfers)
    transaction_reference: Optional[str] = Field(max_length=100, nullable=True)
    
    payment_date: datetime = Field()
    received_by_id: UUID = Field(foreign_key="users.id")
    
    remarks: Optional[str] = Field(max_length=200, nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    student: "Student" = Relationship(back_populates="fee_payments")
    fee_structure: "FeeStructure" = Relationship()
    received_by: "User" = Relationship()
```

---

### 15. ContactMessage
Contact form submissions from the website.

```python
class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    full_name: str = Field(max_length=200)
    email: str = Field(max_length=255)
    phone: Optional[str] = Field(max_length=20, nullable=True)
    subject: Optional[str] = Field(max_length=200, nullable=True)
    message: str = Field(max_length=2000)
    
    # Status
    status: MessageStatus = Field(default=MessageStatus.UNREAD)
    # UNREAD, READ, RESPONDED, ARCHIVED
    
    responded_by_id: Optional[UUID] = Field(foreign_key="users.id", nullable=True)
    responded_at: Optional[datetime] = Field(nullable=True)
    response_notes: Optional[str] = Field(max_length=1000, nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    responded_by: Optional["User"] = Relationship()
```

---

### 16. GalleryImage
School gallery images.

```python
class GalleryImage(Base):
    __tablename__ = "gallery_images"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    title: Optional[str] = Field(max_length=200, nullable=True)
    description: Optional[str] = Field(max_length=500, nullable=True)
    image_url: str = Field(max_length=500)
    thumbnail_url: Optional[str] = Field(max_length=500, nullable=True)
    
    category: Optional[str] = Field(max_length=50, nullable=True)
    # "Events", "Facilities", "Classroom", "Sports", "Celebrations"
    
    # Display settings
    is_featured: bool = Field(default=False)
    display_order: int = Field(default=0)
    is_active: bool = Field(default=True)
    
    uploaded_by_id: UUID = Field(foreign_key="users.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    uploaded_by: "User" = Relationship()
```

---

### 17. Testimonial
Parent/Student testimonials displayed on website.

```python
class Testimonial(Base):
    __tablename__ = "testimonials"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    author_name: str = Field(max_length=200)
    author_role: str = Field(max_length=50)  # "Parent", "Student", "Alumni"
    author_photo_url: Optional[str] = Field(max_length=500, nullable=True)
    
    content: str = Field(max_length=1000)
    rating: Optional[int] = Field(nullable=True)  # 1-5 stars
    
    # Display settings
    is_featured: bool = Field(default=False)
    display_order: int = Field(default=0)
    is_approved: bool = Field(default=False)
    is_active: bool = Field(default=True)
    
    approved_by_id: Optional[UUID] = Field(foreign_key="users.id", nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    approved_by: Optional["User"] = Relationship()
```

---

### 18. Announcement/News
School announcements and news.

```python
class Announcement(Base):
    __tablename__ = "announcements"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    title: str = Field(max_length=200)
    slug: str = Field(unique=True, max_length=250)
    content: str = Field()  # Rich text/markdown
    excerpt: Optional[str] = Field(max_length=500, nullable=True)
    
    featured_image_url: Optional[str] = Field(max_length=500, nullable=True)
    
    category: AnnouncementCategory = Field(default=AnnouncementCategory.GENERAL)
    # GENERAL, ACADEMIC, EVENTS, ADMISSIONS, URGENT
    
    # Visibility
    target_audience: TargetAudience = Field(default=TargetAudience.ALL)
    # ALL, PARENTS, STUDENTS, STAFF
    
    is_pinned: bool = Field(default=False)
    is_published: bool = Field(default=False)
    published_at: Optional[datetime] = Field(nullable=True)
    expires_at: Optional[datetime] = Field(nullable=True)
    
    author_id: UUID = Field(foreign_key="users.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    author: "User" = Relationship()
```

---

### 19. Event
School events calendar.

```python
class Event(Base):
    __tablename__ = "events"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    title: str = Field(max_length=200)
    description: Optional[str] = Field(max_length=2000, nullable=True)
    
    event_type: EventType = Field()
    # ACADEMIC, SPORTS, CULTURAL, MEETING, HOLIDAY, EXAM, OTHER
    
    start_datetime: datetime = Field()
    end_datetime: Optional[datetime] = Field(nullable=True)
    is_all_day: bool = Field(default=False)
    
    location: Optional[str] = Field(max_length=200, nullable=True)
    
    # Visibility
    is_public: bool = Field(default=True)  # Shown on public website
    target_audience: TargetAudience = Field(default=TargetAudience.ALL)
    
    created_by_id: UUID = Field(foreign_key="users.id")
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    created_by: "User" = Relationship()
```

---

### 20. AuditLog
System audit trail for admin actions.

```python
class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    user_id: Optional[UUID] = Field(foreign_key="users.id", nullable=True)
    
    action: str = Field(max_length=50)  # CREATE, UPDATE, DELETE, LOGIN, LOGOUT
    entity_type: str = Field(max_length=50)  # "User", "Student", "Application", etc.
    entity_id: Optional[UUID] = Field(nullable=True)
    
    description: str = Field(max_length=500)
    
    # Change details (JSON)
    old_values: Optional[str] = Field(nullable=True)  # JSON
    new_values: Optional[str] = Field(nullable=True)  # JSON
    
    # Request metadata
    ip_address: Optional[str] = Field(max_length=45, nullable=True)
    user_agent: Optional[str] = Field(max_length=500, nullable=True)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: Optional["User"] = Relationship()
```

---

### 21. SystemSetting
Application configuration settings.

```python
class SystemSetting(Base):
    __tablename__ = "system_settings"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    key: str = Field(unique=True, max_length=100)
    value: str = Field(max_length=1000)
    value_type: str = Field(max_length=20)  # "string", "int", "bool", "json"
    
    category: str = Field(max_length=50)  # "general", "email", "school", "academic"
    description: Optional[str] = Field(max_length=500, nullable=True)
    
    is_public: bool = Field(default=False)  # Can be fetched by public API
    
    # Timestamps
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    updated_by_id: Optional[UUID] = Field(foreign_key="users.id", nullable=True)
```

**Default Settings to Seed:**
```python
DEFAULT_SETTINGS = [
    {"key": "school_name", "value": "Delight International School", "category": "school"},
    {"key": "school_address", "value": "New Achimota, Ga North, Accra", "category": "school"},
    {"key": "school_phone", "value": "+233 24 123 4567", "category": "school"},
    {"key": "school_email", "value": "info@delightinternationalschool.edu.gh", "category": "school"},
    {"key": "admissions_open", "value": "true", "category": "admissions"},
    {"key": "current_academic_year", "value": "", "category": "academic"},
    {"key": "current_term", "value": "", "category": "academic"},
]
```

---

## Junction/Association Tables

### ClassTeacher (Teacher-Class Assignment)
```python
class ClassTeacher(Base):
    __tablename__ = "class_teachers"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    class_id: UUID = Field(foreign_key="classes.id")
    teacher_id: UUID = Field(foreign_key="staff.id")
    
    is_class_teacher: bool = Field(default=False)  # Form teacher
    academic_year_id: UUID = Field(foreign_key="academic_years.id")
    
    # Relationships
    class_: "Class" = Relationship(back_populates="teachers")
    teacher: "Staff" = Relationship(back_populates="classes_taught")
```

### ClassSubject (Subject-Class Assignment)
```python
class ClassSubject(Base):
    __tablename__ = "class_subjects"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    class_id: UUID = Field(foreign_key="classes.id")
    subject_id: UUID = Field(foreign_key="subjects.id")
    teacher_id: Optional[UUID] = Field(foreign_key="staff.id", nullable=True)
    
    periods_per_week: int = Field(default=5)
    
    # Relationships
    class_: "Class" = Relationship(back_populates="subjects")
    subject: "Subject" = Relationship(back_populates="class_subjects")
    teacher: Optional["Staff"] = Relationship()
```

---

## Authentication & Authorization

### User Roles & Permissions

```python
class UserRole(str, Enum):
    PARENT = "parent"           # Can view own children's records
    STAFF = "staff"             # Teachers and support staff
    ADMIN = "admin"             # School administrators
    SUPER_ADMIN = "super_admin" # System administrators (hidden)

class Permission(str, Enum):
    # Application Management
    VIEW_APPLICATIONS = "view_applications"
    REVIEW_APPLICATIONS = "review_applications"
    APPROVE_APPLICATIONS = "approve_applications"
    
    # Student Management
    VIEW_STUDENTS = "view_students"
    MANAGE_STUDENTS = "manage_students"
    
    # Academic Management
    VIEW_GRADES = "view_grades"
    MANAGE_GRADES = "manage_grades"
    
    # Staff Management
    VIEW_STAFF = "view_staff"
    MANAGE_STAFF = "manage_staff"
    
    # Fee Management
    VIEW_FEES = "view_fees"
    MANAGE_FEES = "manage_fees"
    COLLECT_FEES = "collect_fees"
    
    # Content Management
    MANAGE_GALLERY = "manage_gallery"
    MANAGE_ANNOUNCEMENTS = "manage_announcements"
    MANAGE_TESTIMONIALS = "manage_testimonials"
    
    # System Administration
    MANAGE_SETTINGS = "manage_settings"
    VIEW_AUDIT_LOGS = "view_audit_logs"
    MANAGE_USERS = "manage_users"

ROLE_PERMISSIONS = {
    UserRole.PARENT: [
        Permission.VIEW_GRADES,  # Own children only
        Permission.VIEW_FEES,    # Own children only
    ],
    UserRole.STAFF: [
        Permission.VIEW_STUDENTS,
        Permission.VIEW_GRADES,
        Permission.MANAGE_GRADES,
        Permission.VIEW_APPLICATIONS,
    ],
    UserRole.ADMIN: [
        # All staff permissions plus:
        Permission.VIEW_APPLICATIONS,
        Permission.REVIEW_APPLICATIONS,
        Permission.APPROVE_APPLICATIONS,
        Permission.MANAGE_STUDENTS,
        Permission.VIEW_STAFF,
        Permission.MANAGE_STAFF,
        Permission.VIEW_FEES,
        Permission.MANAGE_FEES,
        Permission.COLLECT_FEES,
        Permission.MANAGE_GALLERY,
        Permission.MANAGE_ANNOUNCEMENTS,
        Permission.MANAGE_TESTIMONIALS,
    ],
    UserRole.SUPER_ADMIN: [
        # All permissions
        "*"
    ]
}
```

---

## Admin Backdoor Access

### Implementation Strategy

The admin access should be **discrete** and not visible to ordinary users. Here's the recommended approach:

#### 1. Hidden Login Route
```python
# Instead of "/admin/login", use an obscure path
ADMIN_LOGIN_PATH = "/api/v1/sys/auth"  # Non-obvious endpoint

# Alternative: Use a special parameter on the regular login
# POST /api/v1/auth/login
# Body: { "email": "...", "password": "...", "access_key": "DELIGHT_SYS_2024" }
```

#### 2. Admin Dashboard Access
```python
# Frontend route (not linked anywhere on public site)
ADMIN_DASHBOARD_ROUTE = "/portal/dashboard"

# Access via direct URL only: https://school.com/portal/dashboard
# Or via special key combination on login page (e.g., Ctrl+Shift+A)
```

#### 3. Super Admin Creation (CLI Only)
```python
# Create super admin only via CLI command, not API
# python manage.py create_superadmin --email admin@school.com --password ...

@cli.command()
@click.option('--email', required=True)
@click.option('--password', required=True)
def create_superadmin(email: str, password: str):
    """Create a super admin user (CLI only)"""
    user = User(
        email=email,
        password_hash=hash_password(password),
        role=UserRole.SUPER_ADMIN,
        email_verified=True,
        is_active=True
    )
    db.add(user)
    db.commit()
```

#### 4. IP Whitelisting for Admin APIs
```python
ADMIN_ALLOWED_IPS = [
    "127.0.0.1",
    "office_ip_here",
]

@app.middleware("http")
async def admin_ip_check(request: Request, call_next):
    if request.url.path.startswith("/api/v1/admin"):
        client_ip = request.client.host
        if client_ip not in ADMIN_ALLOWED_IPS:
            # Log suspicious access attempt
            raise HTTPException(status_code=404, detail="Not Found")
    return await call_next(request)
```

#### 5. Admin Session Security
```python
# Shorter token expiry for admin users
ADMIN_TOKEN_EXPIRE_MINUTES = 30  # vs 24 hours for regular users

# Require re-authentication for sensitive actions
SENSITIVE_ACTIONS = [
    "delete_student",
    "manage_fees",
    "create_admin",
]
```

---

## Email Verification Flow

### 1. Registration Flow
```
User Submits Registration
         ↓
Create User (email_verified=False)
         ↓
Generate Verification Token (6-digit code or UUID)
         ↓
Store Token + Expiry (24 hours)
         ↓
Send Verification Email
         ↓
User Clicks Link / Enters Code
         ↓
Verify Token & Expiry
         ↓
Set email_verified=True
         ↓
User Can Now Login
```

### 2. Email Verification Model Fields
```python
email_verification_token: str      # UUID or 6-digit code
email_verification_expires: datetime  # 24 hours from creation
email_verified: bool               # Default: False
```

### 3. API Endpoints
```python
# Send verification email
POST /api/v1/auth/register
Request: { "email": "...", "password": "...", "confirm_password": "..." }
Response: { "message": "Verification email sent", "user_id": "..." }

# Verify email (link-based)
GET /api/v1/auth/verify-email?token={token}
Response: { "message": "Email verified successfully" }

# Verify email (code-based)
POST /api/v1/auth/verify-email
Request: { "email": "...", "code": "123456" }
Response: { "message": "Email verified successfully" }

# Resend verification email
POST /api/v1/auth/resend-verification
Request: { "email": "..." }
Response: { "message": "Verification email sent" }
```

### 4. Email Template
```html
Subject: Verify Your Delight International School Account

Dear [Name],

Thank you for registering with Delight International School.

Please verify your email address by clicking the link below:
[Verification Link]

Or enter this code: [6-DIGIT CODE]

This link/code expires in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
Delight International School
```

---

## API Endpoints

### Public APIs (No Authentication)

```yaml
# Authentication
POST   /api/v1/auth/register          # Create parent account
POST   /api/v1/auth/login             # Login
POST   /api/v1/auth/verify-email      # Verify email
POST   /api/v1/auth/resend-verification
POST   /api/v1/auth/forgot-password   # Request password reset
POST   /api/v1/auth/reset-password    # Reset password with token

# Public Content
GET    /api/v1/public/programs        # List programs
GET    /api/v1/public/gallery         # Gallery images
GET    /api/v1/public/testimonials    # Approved testimonials
GET    /api/v1/public/announcements   # Public announcements
GET    /api/v1/public/events          # Public events

# Applications (can be public or authenticated)
POST   /api/v1/applications           # Submit admission application

# Contact
POST   /api/v1/contact                # Submit contact message
```

### Parent APIs (Authenticated - Parent Role)

```yaml
# Profile
GET    /api/v1/parent/profile         # Get own profile
PUT    /api/v1/parent/profile         # Update profile

# Children
GET    /api/v1/parent/children        # List enrolled children
GET    /api/v1/parent/children/{id}   # Get child details

# Academics
GET    /api/v1/parent/children/{id}/grades       # View child's grades
GET    /api/v1/parent/children/{id}/attendance   # View attendance
GET    /api/v1/parent/children/{id}/report-card  # Download report card

# Fees
GET    /api/v1/parent/children/{id}/fees         # View fee status
GET    /api/v1/parent/children/{id}/payments     # Payment history

# Applications
GET    /api/v1/parent/applications    # View own applications
GET    /api/v1/parent/applications/{id}
```

### Staff APIs (Authenticated - Staff/Admin Role)

```yaml
# Students
GET    /api/v1/staff/students                    # List students
GET    /api/v1/staff/students/{id}               # Student details
GET    /api/v1/staff/classes/{id}/students       # Students in a class

# Attendance
POST   /api/v1/staff/attendance                  # Record attendance
GET    /api/v1/staff/attendance/{class_id}/{date}
PUT    /api/v1/staff/attendance/{id}

# Grades
POST   /api/v1/staff/grades                      # Submit grades
PUT    /api/v1/staff/grades/{id}
GET    /api/v1/staff/grades/class/{class_id}/subject/{subject_id}
```

### Admin APIs (Authenticated - Admin Role)

```yaml
# Dashboard
GET    /api/v1/admin/dashboard/stats             # Overview statistics

# Applications Management
GET    /api/v1/admin/applications                # List all applications
GET    /api/v1/admin/applications/{id}
PUT    /api/v1/admin/applications/{id}/status    # Update status
POST   /api/v1/admin/applications/{id}/schedule-assessment
POST   /api/v1/admin/applications/{id}/decision  # Accept/Reject

# Student Management
POST   /api/v1/admin/students                    # Enroll student
PUT    /api/v1/admin/students/{id}
DELETE /api/v1/admin/students/{id}               # Soft delete
POST   /api/v1/admin/students/{id}/promote       # Promote to next class

# Staff Management
GET    /api/v1/admin/staff
POST   /api/v1/admin/staff
PUT    /api/v1/admin/staff/{id}
DELETE /api/v1/admin/staff/{id}

# Academic Setup
GET    /api/v1/admin/academic-years
POST   /api/v1/admin/academic-years
GET    /api/v1/admin/terms
POST   /api/v1/admin/terms
GET    /api/v1/admin/classes
POST   /api/v1/admin/classes
GET    /api/v1/admin/subjects
POST   /api/v1/admin/subjects

# Fee Management
GET    /api/v1/admin/fee-structures
POST   /api/v1/admin/fee-structures
PUT    /api/v1/admin/fee-structures/{id}
GET    /api/v1/admin/payments
POST   /api/v1/admin/payments                    # Record payment
GET    /api/v1/admin/payments/reports            # Payment reports

# Content Management
GET    /api/v1/admin/gallery
POST   /api/v1/admin/gallery
DELETE /api/v1/admin/gallery/{id}
GET    /api/v1/admin/testimonials
POST   /api/v1/admin/testimonials
PUT    /api/v1/admin/testimonials/{id}
GET    /api/v1/admin/announcements
POST   /api/v1/admin/announcements
PUT    /api/v1/admin/announcements/{id}
DELETE /api/v1/admin/announcements/{id}

# Contact Messages
GET    /api/v1/admin/contact-messages
PUT    /api/v1/admin/contact-messages/{id}/status

# Reports
GET    /api/v1/admin/reports/enrollment
GET    /api/v1/admin/reports/attendance
GET    /api/v1/admin/reports/fees
GET    /api/v1/admin/reports/academic
```

### Super Admin APIs (Authenticated - Super Admin Only)

```yaml
# Hidden endpoint prefix: /api/v1/sys

# User Management
GET    /api/v1/sys/users
POST   /api/v1/sys/users/admin               # Create admin user
PUT    /api/v1/sys/users/{id}/role           # Change user role
DELETE /api/v1/sys/users/{id}

# System Settings
GET    /api/v1/sys/settings
PUT    /api/v1/sys/settings/{key}

# Audit Logs
GET    /api/v1/sys/audit-logs
GET    /api/v1/sys/audit-logs/user/{user_id}

# Database Operations
POST   /api/v1/sys/backup                    # Trigger backup
GET    /api/v1/sys/health                    # System health check
```

---

## Enums & Constants

```python
from enum import Enum

class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"

class UserRole(str, Enum):
    PARENT = "parent"
    STAFF = "staff"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

class StaffType(str, Enum):
    TEACHER = "teacher"
    ADMIN = "admin"
    SUPPORT = "support"

class EmploymentStatus(str, Enum):
    ACTIVE = "active"
    ON_LEAVE = "on_leave"
    TERMINATED = "terminated"

class EnrollmentStatus(str, Enum):
    ACTIVE = "active"
    GRADUATED = "graduated"
    WITHDRAWN = "withdrawn"
    SUSPENDED = "suspended"
    TRANSFERRED = "transferred"

class Program(str, Enum):
    EARLY_YEARS = "early_years"
    PRIMARY = "primary"
    JHS = "jhs"

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    UNDER_REVIEW = "under_review"
    ASSESSMENT_SCHEDULED = "assessment_scheduled"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    WAITLISTED = "waitlisted"

class AttendanceStatus(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"
    EXCUSED = "excused"

class FeeType(str, Enum):
    TUITION = "tuition"
    FEEDING = "feeding"
    BOOKS = "books"
    UNIFORM = "uniform"
    TRANSPORT = "transport"
    EXAMINATION = "examination"
    OTHER = "other"

class PaymentMethod(str, Enum):
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"
    MOBILE_MONEY = "mobile_money"
    CHEQUE = "cheque"

class MessageStatus(str, Enum):
    UNREAD = "unread"
    READ = "read"
    RESPONDED = "responded"
    ARCHIVED = "archived"

class SubjectCategory(str, Enum):
    CORE = "core"
    ELECTIVE = "elective"
    EXTRACURRICULAR = "extracurricular"

class AnnouncementCategory(str, Enum):
    GENERAL = "general"
    ACADEMIC = "academic"
    EVENTS = "events"
    ADMISSIONS = "admissions"
    URGENT = "urgent"

class TargetAudience(str, Enum):
    ALL = "all"
    PARENTS = "parents"
    STUDENTS = "students"
    STAFF = "staff"

class EventType(str, Enum):
    ACADEMIC = "academic"
    SPORTS = "sports"
    CULTURAL = "cultural"
    MEETING = "meeting"
    HOLIDAY = "holiday"
    EXAM = "exam"
    OTHER = "other"
```

---

## Database Relationships Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           USERS                                  │
│  ┌─────────┐    ┌──────────────────┐    ┌─────────────────────┐ │
│  │  User   │────│ ParentGuardian   │────│     Student         │ │
│  └─────────┘    └──────────────────┘    └─────────────────────┘ │
│       │                                          │               │
│       │         ┌──────────────────┐            │               │
│       └─────────│     Staff        │            │               │
│                 └──────────────────┘            │               │
└─────────────────────────────────────────────────│───────────────┘
                                                  │
┌─────────────────────────────────────────────────│───────────────┐
│                         ACADEMICS               │               │
│                                                 ▼               │
│  ┌──────────────┐   ┌─────────┐   ┌───────────────────────┐    │
│  │ AcademicYear │───│  Term   │───│   AcademicRecord      │    │
│  └──────────────┘   └─────────┘   └───────────────────────┘    │
│         │                                   │                   │
│         ▼                                   │                   │
│  ┌──────────────┐   ┌─────────┐            │                   │
│  │    Class     │───│ Subject │────────────┘                   │
│  └──────────────┘   └─────────┘                                │
│         │                                                       │
│         │           ┌────────────┐                             │
│         └───────────│ Attendance │                             │
│                     └────────────┘                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          FINANCE                                 │
│  ┌──────────────────┐        ┌─────────────────────┐           │
│  │   FeeStructure   │────────│    FeePayment       │           │
│  └──────────────────┘        └─────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         ADMISSIONS                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Application                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          CONTENT                                 │
│  ┌────────────┐  ┌─────────────┐  ┌────────────┐  ┌─────────┐  │
│  │  Gallery   │  │ Testimonial │  │Announcement│  │  Event  │  │
│  └────────────┘  └─────────────┘  └────────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          SYSTEM                                  │
│  ┌────────────────┐  ┌───────────────┐  ┌────────────────────┐ │
│  │ ContactMessage │  │ SystemSetting │  │     AuditLog       │ │
│  └────────────────┘  └───────────────┘  └────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### 1. Database Recommendations
- **PostgreSQL** recommended for production
- **SQLite** acceptable for development
- Use **Alembic** for migrations

### 2. Authentication
- Use **JWT tokens** for API authentication
- Short-lived access tokens (15-30 min)
- Long-lived refresh tokens (7-30 days)
- Store refresh tokens in database for revocation

### 3. File Storage
- Use **AWS S3** or **Cloudinary** for images/documents
- Store only URLs in database
- Implement file type validation
- Set max file size limits (5MB for images, 10MB for documents)

### 4. Email Service
- Use **SendGrid**, **Mailgun**, or **AWS SES**
- Implement email templates
- Queue emails for async processing

### 5. Security Considerations
- Rate limiting on authentication endpoints
- Input validation with Pydantic
- SQL injection prevention (use ORM)
- XSS prevention (sanitize outputs)
- CORS configuration
- HTTPS only in production

### 6. Ghana-Specific Fields
- Ghana Card Number validation
- Ghana GPS Digital Address format
- Mobile Money integration (MTN MoMo, Vodafone Cash, AirtelTigo Money)
- GHS currency

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-17 | Backend Team | Initial documentation |

---

## Contact

For questions about this documentation, contact the development team.
