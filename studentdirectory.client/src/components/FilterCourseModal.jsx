import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const FilterCourseModal = ({ isOpen, onRequestClose, courses, selectedFilterCourses, setSelectedFilterCourses }) => {
    const handleFilterCourses = (event) => {
        setSelectedFilterCourses([...event.target.selectedOptions].map(option => option.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Filter by Courses"
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="text-2xl font-bold mb-8 flex justify-center">Filter by Courses</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <select
                    multiple
                    value={selectedFilterCourses}
                    onChange={handleFilterCourses}
                    className="bg-gray-700 text-white rounded px-2 py-1 mb-4 w-full"
                >
                    {courses.map(course => (
                        <option key={course.courseId} value={course.courseId}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Apply Filter
                </button>
            </form>
        </Modal>
    );
};

export default FilterCourseModal;
