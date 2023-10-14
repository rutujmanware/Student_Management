import React, { useEffect } from "react";

const Student = ({ student, setMyTeam, myTeam, allowJudgement, setLoading }) => {
  const { name, email, marked, totalMarks, assignedTo } = student;

  const handleAddtoTeam = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/api/addstudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          email: email,
          assignedTo: "Mithoon",
        }), 
      });

      // console.log(myTeam)
      setLoading(false)
      if (response.ok) {
        // setMyTeam([...myTeam,response])
        setMyTeam([...myTeam, email]);
        console.log("Student added to the team successfully.");
      } else {
        console.error("Failed to add student to the team.");
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };
  useEffect(() => {
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
  }, [myTeam]);
  // console.log(localStorage.getItem("myTeam"));
  return (
    <div className="sm:flex  bg-white p-4 m-4 rounded-lg shadow-md">
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
        <p className={`text-${marked === "No" ? "red" : "green"}-600`}>
          {marked === "No" ? "Not Marked Yet" : `Total Marks: ${totalMarks}/40`}
        </p>
      </div>
      <div className="sm:w-1/4 w-full text-center flex items-center sm:m-1">
        <button
          className={`${
            assignedTo === "No"
              ? "bg-blue-500 hover:cursor-pointer"
              : "bg-green-500 cursor-not-allowed"
          } text-white px-3 py-1 rounded sm:w-auto w-full sm:m-2`}
          
          disabled={localStorage.getItem("allowJudgement") === "true" || assignedTo !== "No"}
          onClick={
            localStorage.getItem("allowJudgement") === "true"
              ? null
              : handleAddtoTeam
          }
          //   disabled={assignedTo !== "No"}
        >
          {assignedTo !== "No"
            ? `Added to ${
                assignedTo === "Mithoon" ? "Your" : `${assignedTo}'s`
              } Team`
            : "Add to Team"}
        </button>
      </div>
    </div>
  );
};

export default Student;
