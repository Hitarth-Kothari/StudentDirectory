import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddStudentModal.css';

Modal.setAppElement('#root');

const AddStudentModal = ({ isOpen, onRequestClose, fetchStudents, courses, student }) => {
    const [name, setName] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        if (isOpen) {
            if (student) {
                setName(student.name);
                setSelectedCourses(student.courseIds.map(String));
            } else {
                setName('');
                setSelectedCourses([]);
            }
        }
    }, [isOpen, student]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newStudent = {
            studentId: student ? student.studentId : undefined,
            name,
            courseIds: selectedCourses.map(Number),
        };
        console.log('Submitting student data:', newStudent); // Log the request data
        try {
            if (student) {
                console.log(`Updating student with ID: ${student.studentId}`); // Log the student ID being updated
                await axios.put(`/api/students/${student.studentId}`, newStudent);
            } else {
                await axios.post('/api/students', newStudent);
            }
            fetchStudents();
            onRequestClose();
        } catch (error) {
            console.error('Error adding/updating student:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Student"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-gray-700 text-white rounded px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label>Courses</label>
                    <select
                        multiple
                        value={selectedCourses}
                        onChange={(e) =>
                            setSelectedCourses(
                                [...e.target.selectedOptions].map((option) => option.value)
                            )
                        }
                        required
                        className="bg-gray-700 text-white rounded px-2 py-1 w-full"
                    >
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                        {student ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={onRequestClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddStudentModal;
