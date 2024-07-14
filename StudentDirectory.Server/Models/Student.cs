using System.Collections.Generic;

namespace StudentDirectory.Server.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; } = string.Empty; // Initialize with default value
        public List<int> CourseIds { get; set; } = new List<int>(); // Initialize with default value
    }
}
