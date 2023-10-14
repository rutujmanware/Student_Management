import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const StudentTeam = ({ student, setMyTeam, myTeam , allowJudgement , setLoading}) => {
  const { name, email, marked, totalMarks } = student;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    ideation: null,
    execution: null,
    viva: null,
    presentation: null,
  });

 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Update the corresponding field in the formData state
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      formData.ideation === null ||
      formData.execution === null ||
      formData.viva === null ||
      formData.presentation === null
    ) {
      setIsFormValid(false);
      return;
    }

    // Reset the validation status
    setIsFormValid(true);
    try {
      const response = await fetch("http://localhost:8000/api/addmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          Ideation: formData.ideation,
          Execution: formData.execution,
          Viva: formData.viva,
          Presentation: formData.presentation,
          marked: "yes",
          totalMarks:Number(formData.ideation) + Number(formData.execution) + Number(formData.viva) +  Number(formData.presentation)
        }),
      });
    
  
      if (response.ok) {
        setIsFormSubmitted(true);
        setIsModalOpen(false);
      } else {
        console.log("Failed to add marks.");
      }
      setLoading(false)
    } catch (error) {
      console.log("Fetch Error", error);
    }
  };
  const handleAddMarks = () => {
    
    if(localStorage.getItem("allowJudgement") === "true"){
      // console.log("Hi");
      setIsModalOpen(true); // Open the modal when "Add Marks" button is clicked
      
    }else{
      // console.log("Hi");
      alert("Finalize Team First")
    }
    
  };
  useEffect(() => {
    // Load myTeam from local storage on component mount
    const storedMyTeam = localStorage.getItem("myTeam");
    if (storedMyTeam) {
      setMyTeam(JSON.parse(storedMyTeam));
    }
  }, [isFormSubmitted]);

  // Update local storage when myTeam changes

  const handleRemoveFromTeam = async () => {
    setLoading(true)
    try {
      // console.log("Before removal: myTeam", myTeam);
      const response = await fetch("http://localhost:8000/api/removestudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          Ideation: null,
          Execution: null,
          Viva: null,
          Presentation: null,
          marked: "No",
          totalMarks:null
        }),
      });

      if (response.ok) {
        const updatedTeam = myTeam.filter((teamMember) => teamMember !== email);
        console.log(myTeam);
        setMyTeam(updatedTeam);
        console.log(myTeam);
        console.log("Student removed from the team successfully.");

      } else {
        console.error("Failed to remove student from the team.");
      }
      setLoading(false)
    } catch (error) {
      console.error("Server Error", error);
    }
  };
  useEffect(() => {
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
    if (myTeam.length === 0) {
      localStorage.removeItem("myTeam");
      console.log(localStorage.getItem("myTeam"));
    }
  }, [myTeam]);

  return (
    <div className="sm:flex bg-white p-4 m-4 rounded-lg shadow-md">
      <div className="sm:w-1/4 w-full text-center">
        <p className="text-lg font-semibold">Name:</p>
        <p className="text-gray-600">{name}</p>
      </div>
      <div className="sm:w-1/4 w-full text-center">
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="sm:w-1/4 w-full text-center">
        <p className="text-lg font-semibold">Marked:</p>
        <p className={`${marked === "No" ? "text-red-600" : "text-green-600"}`}>
          {marked === "No" ? "Not Marked Yet" : `Total Marks: ${totalMarks}/40`}
        </p>
      </div>
      <div className="sm:w-1/4 w-full text-center flex items-center">
      <div className="w-full sm:m-2">
  {localStorage.getItem("finalSubmission") === "true" ? (
    <div className="text-green-600 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  ) : (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded hover:cursor-pointer m-3 "
      onClick={handleAddMarks}
    >
      Add Marks
    </button>
  )}
</div>
<div className="w-full sm:m-2">

        {localStorage.getItem("allowJudgement") !== "true" && (
  <button
    className="bg-blue-500 text-white px-3 py-1 rounded hover:cursor-pointer "
    onClick={handleRemoveFromTeam}
  >
    Remove
  </button>
)}
</div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Marks Modal"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Add Marks</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="ideation"
                className="block text-sm font-medium text-gray-700"
              >
                Ideology (out of 10):
              </label>
              <input
                type="number"
                id="ideation"
                name="ideation"
                min="0"
                max="10"
                value={formData.ideation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="execution"
                className="block text-sm font-medium text-gray-700"
              >
                Execution (out of 10):
              </label>
              <input
                type="number"
                id="execution"
                name="execution"
                min="0"
                max="10"
                value={formData.execution}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="viva"
                className="block text-sm font-medium text-gray-700"
              >
                Viva (out of 10):
              </label>
              <input
                type="number"
                id="viva"
                name="viva"
                min="0"
                max="10"
                value={formData.viva}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="presentation"
                className="block text-sm font-medium text-gray-700"
              >
                Presentation (out of 10):
              </label>
              <input
                type="number"
                id="presentation"
                name="presentation"
                min="0"
                max="10"
                value={formData.presentation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-400"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 text-blue-500 hover:underline focus:outline-none focus:ring"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default StudentTeam;
