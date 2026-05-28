import React from "react";

const Biography = ({ imageUrl }) => {
    return (
        <>
            <div className="container biography">
                <div className="banner">
                    <img src={imageUrl} alt="whoweare" />
                </div>
                <div className="banner">
                    <p>Biography</p>
                    <h3>Who We Are</h3>
                    <p className="text-gray-700">
                        Welcome to CareSync HMS — a modern, scalable Hospital Management System
                        built using the MERN stack. We are a team of dedicated developers
                        passionate about transforming healthcare with technology.
                    </p>
                    <p className="text-gray-700">
                        Our system is designed to streamline hospital operations, offering
                        seamless patient records, doctor scheduling, billing, inventory, and
                        much more — all under one intuitive dashboard.
                    </p>
                    <p className="text-gray-700">
                        With real-time data management and secure cloud integration, CareSync
                        enables healthcare providers to focus on what matters most: patient care.
                    </p>
                    <p className="text-gray-700">
                        Built in 2024, our project represents the latest in full-stack web
                        development. From interactive dashboards to powerful backend APIs,
                        every feature is optimized for reliability and performance.
                    </p>
                    <p className="text-gray-700">
                        We believe code can change lives. And we're proud to be coding for a
                        cause.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Biography;
