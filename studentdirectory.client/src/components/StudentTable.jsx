import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentModal from './AddStudentModal';
import './StudentTable.css';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/students/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.delete(`/api/students/${studentId}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const getCourseNames = (courseIds) => {
        return courseIds.map(id => courses.find(course => course.courseId === id)?.courseName).filter(Boolean);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-4">
            <h1 className="text-4xl font-bold mb-8">Student Directory</h1>
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-screen-xl px-4">
                {students.map(student => (
                    <div key={student.studentId} className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1 min-w-[300px] max-w-[400px] flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 text-center">{student.name}</h2>
                        <ul className="list-disc list-inside mb-4 flex-1">
                            {getCourseNames(student.courseIds).map((courseName, index) => (
                                <li key={index}>{courseName}</li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => {
                                    setEditingStudent(student);
                                    setIsAddStudentModalOpen(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDeleteStudent(student.studentId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-2xl"
                onClick={() => {
                    setEditingStudent(null);
                    setIsAddStudentModalOpen(true);
                }}
            >
                +
            </button>
            <AddStudentModal
                isOpen={isAddStudentModalOpen}
                onRequestClose={() => setIsAddStudentModalOpen(false)}
                fetchStudents={fetchStudents}
                courses={courses}
                student={editingStudent}
            />
        </div>
    );
};

export default StudentTable;
