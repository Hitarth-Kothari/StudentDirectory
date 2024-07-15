import React from 'react';
import Modal from 'react-modal';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

Modal.setAppElement('#root');

const StatsModal = ({ isOpen, onRequestClose, courseStats }) => {
    const data = {
        labels: Object.keys(courseStats),
        datasets: [
            {
                label: 'Number of Students',
                data: Object.values(courseStats),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                },
            },
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Course Stats"
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="text-2xl font-bold mb-8 flex justify-center">Course Stats</h2>
            <div className="m-10">
                <Bar data={data} options={options} />
            </div>
            <button onClick={onRequestClose} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                Close
            </button>
        </Modal>
    );
};

export default StatsModal;
