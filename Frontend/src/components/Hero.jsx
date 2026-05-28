import React from "react";

const Hero = ({ title, imageUrl }) => {
    return (
        <>
            <div className="hero container">
                <div className="banner">
                    <h1>{title}</h1>
                    <p>
                        CareSync Medical Institute is a next-generation healthcare facility designed to deliver integrated, patient-centered services with precision, care, and innovation. Backed by a team of highly skilled medical professionals,
                        we are dedicated to offering personalized treatment experiences tailored to every individual.
                        At CareSync, your health is our priority — ensuring every step of your wellness journey is guided by compassion, expertise, and advanced technology.
                    </p>
                </div>
                <div className="banner">
                    <img src={imageUrl} alt="hero" className="animated-image" />
                    <span>
                        <img src="/Vector.png" alt="vector" />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Hero;
