import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// Fetch doctors
const fetchDoctors = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", {
        withCredentials: true,
    });
    return data.doctors;
};

// Submit appointment
const postAppointment = async (appointmentData) => {
    const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        appointmentData,
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        }
    );
    return data;
};

const AppointmentForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("Pediatrics");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);

    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    // Query: fetch doctors
    const { data: doctors = [], isLoading: loadingDoctors } = useQuery({
        queryKey: ["doctors"],
        queryFn: fetchDoctors,
    });

    // Mutation: post appointment
    const { mutate: submitAppointment, isLoading: submitting } = useMutation({
        mutationFn: postAppointment,
        onSuccess: (data) => {
            toast.success(data.message);
            // Reset form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNic("");
            setDob("");
            setGender("");
            setAppointmentDate("");
            setDepartment("Pediatrics");
            setDoctorFirstName("");
            setDoctorLastName("");
            setHasVisited(false);
            setAddress("");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Submission failed");
        },
    });

    const handleAppointment = (e) => {
        e.preventDefault();

        submitAppointment({
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            appointment_date: appointmentDate,
            department,
            doctor_firstName: doctorFirstName,
            doctor_lastName: doctorLastName,
            hasVisited: Boolean(hasVisited),
            address,
        });
    };

    return (
        <div className="container form-component appointment-form">
            <h2>Appointment</h2>
            <form onSubmit={handleAppointment}>
                <div>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
                <div>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input
                        type="date"
                        placeholder="Appointment Date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                            setDoctorFirstName("");
                            setDoctorLastName("");
                        }}
                    >
                        {departmentsArray.map((depart, index) => (
                            <option value={depart} key={index}>
                                {depart}
                            </option>
                        ))}
                    </select>
                    <select
                        value={JSON.stringify({
                            firstName: doctorFirstName,
                            lastName: doctorLastName,
                        })}
                        onChange={(e) => {
                            const { firstName, lastName } = JSON.parse(e.target.value);
                            setDoctorFirstName(firstName);
                            setDoctorLastName(lastName);
                        }}
                        disabled={!department || loadingDoctors}
                    >
                        <option value="">Select Doctor</option>
                        {doctors
                            .filter((doctor) => doctor.doctorDepartment === department)
                            .map((doctor, index) => (
                                <option
                                    key={index}
                                    value={JSON.stringify({
                                        firstName: doctor.firstName,
                                        lastName: doctor.lastName,
                                    })}
                                >
                                    {doctor.firstName} {doctor.lastName}
                                </option>
                            ))}
                    </select>
                </div>
                <textarea
                    rows="10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <div
                    style={{
                        gap: "10px",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}
                >
                    <p style={{ marginBottom: 0 }}>Have you visited before?</p>
                    <input
                        type="checkbox"
                        checked={hasVisited}
                        onChange={(e) => setHasVisited(e.target.checked)}
                        style={{ flex: "none", width: "25px" }}
                    />
                </div>
                <button type="submit" style={{ margin: "0 auto" }} disabled={submitting}>
                    {submitting ? "Submitting..." : "GET APPOINTMENT"}
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;

