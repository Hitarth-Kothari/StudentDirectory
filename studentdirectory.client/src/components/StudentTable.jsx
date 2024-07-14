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
        return courseIds.map(id => courses.find(course => course.courseId === id)?.courseName).filter(Boolean).join(', ');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-4">
            <h1 className="text-4xl font-bold mb-8">Student Directory</h1>
            <div className="w-full max-w-screen-xl px-4">
                <table className="min-w-full divide-y divide-gray-700 table-fixed">
                    <thead className="bg-green-600">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/4">Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/2">Courses</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {students.map(student => (
                            <tr key={student.studentId} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-center">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{getCourseNames(student.courseIds)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
