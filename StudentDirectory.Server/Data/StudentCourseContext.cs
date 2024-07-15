using Microsoft.EntityFrameworkCore;
using StudentDirectory.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace StudentDirectory.Server.Data
{
    public class StudentCourseContext : DbContext
    {
        public StudentCourseContext(DbContextOptions<StudentCourseContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }

        public static readonly List<Course> Courses = new List<Course>
        {
            new Course { CourseId = 1, CourseName = "Math" },
            new Course { CourseId = 2, CourseName = "Science" },
            new Course { CourseId = 3, CourseName = "History" },
            new Course { CourseId = 4, CourseName = "English" },
            new Course { CourseId = 5, CourseName = "Computer Science" },
            new Course { CourseId = 6, CourseName = "Art" },
            new Course { CourseId = 7, CourseName = "Music" },
            new Course { CourseId = 8, CourseName = "Physical Education" }
        };

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .Property(e => e.CourseIds)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', System.StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList());
        }
    }
}
