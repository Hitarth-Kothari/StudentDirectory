# Student Directory Web Application

This is a web application for managing a student directory. It allows users to add, edit, and delete students and their associated courses. The application also includes the following features:

- **Search Functionality:** Users can search for students by name.
- **Course Filtering:** Users can filter the student list by the courses they have taken.
- **Course Statistics:** A statistics modal shows the number of students enrolled in each course using a bar chart.
- **Add Courses:** Users can add new courses to the directory.
- **Responsive Design:** The application is designed to be responsive and works well on various screen sizes.

## Technologies Used

- **Frontend**: React, TailwindCSS, Axios, React Modal
- **Backend**: .NET Core, Entity Framework Core, C#
- **Database**: SQLite
- **Build Tools**: Vite

## Prerequisites

- Node.js (>= 14.x)
- .NET SDK (>= 5.x)
- SQLite

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/Hitarth-Kothari/StudentDirectory
cd student-directory
```

## Frontend Setup

1. Navigate to the client directory:

        cd studentdirectory.client
    
2. Install the required dependencies:

        npm install

## Backend Setup

1. Navigate to the client directory:

        cd ../StudentDirectory.Server
    
2. Restore the required packages:

        dotnet restore

3. Apply the migrations and update the database:

        dotnet ef database update

4. Run the backend server (This will also initialize the frontend and host the website):

        dotnet run

## Usage

1. Open your browser and navigate to `http://localhost:8000` to access the frontend.

### Adding Students

1. Click on the "+" button at the bottom right to open the modal for adding a new student.
2. Fill in the student's name and select the courses they are enrolled in.
3. Click "Add" to save the student.

### Editing Students

1. Click the "✏️" button next to the student you want to edit.
2. Modify the student's name and courses as needed.
3. Click "Save" to update the student's information.

### Using the Search Bar

1. Locate the search bar at the top of the page, below the "Student Directory" title.
2. Type the name of the student you are looking for.
3. The list of students will be filtered in real-time to match your search query.
4. If no students match the search query, a message saying "No students match this name" will be displayed.

### Viewing Course Statistics

1. Click the "📊" button at the top right to open the statistics modal.
2. View the bar chart showing the number of students enrolled in each course.
3. Click "Close" to exit the statistics modal.

### Filtering by Course

1. Click the "📘" button at the top left to filter the student list by courses.
2. Select the courses you want to filter by.
3. Click "Apply" to see the filtered list of students.
4. To clear the filter, click the "Clear Filter" button that appears.


### Deleting Students

1. Click the "🗑️" button next to the student you want to remove.
2. Confirm the deletion in the prompt.

## Entity Framework Core Migrations

### Adding a New Migration

To add a new migration, run the following command in the Package Manager Console:

```powershell
dotnet ef migrations add MigrationName
```
### Updating the Database

To apply the migrations and update the database, run:

```powershell
dotnet ef database update
```
### Example: Adding More Courses

1. Modify the StudentCourseContext class to add more courses:

        public static readonly List<Course> Courses = new List<Course>
        {
            new Course { CourseId = 1, CourseName = "Math" },
            new Course { CourseId = 2, CourseName = "Science" },
            new Course { CourseId = 3, CourseName = "History" },
            new Course { CourseId = 4, CourseName = "Art" },
            new Course { CourseId = 5, CourseName = "Music" },
            new Course { CourseId = 6, CourseName = "Physical Education" },
            new Course { CourseId = 7, CourseName = "Computer Science" },
            new Course { CourseId = 8, CourseName = "Literature" }
        };

2. Create a new migration:

        dotnet ef migrations add AddMoreCourses

3. Update the database:

        dotnet ef database update
