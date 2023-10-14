import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Student from "../Components/Student";
import StudentTeam from "../Components/StudentTeam";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [allowJudgement, setAllowJudgement] = useState(false);
  const [finalSubmission, setFinalSubmission] = useState(false);
  const [filterValue, setFilterValue] = useState("all"); 
  const [loading, setLoading] = useState(true);
  const handleFinalMarksSubmit = () => {
    setLoading(true)
    // Check if all students in myTeam are marked
    const allMarked = myTeam.every((email) => {
      // Find the corresponding student by email
      const student = students.find((s) => s.email === email);
      // Check if the student is marked
      return student && student.marked === "yes";
    });

    if (allMarked) {
      setFinalSubmission(true);
      localStorage.setItem("finalSubmission", "true");
    } else {
      alert(
        "Not all students in your team are marked. Please mark all team members."
      );
    }
    setLoading(false)
  };

  const loadStudents = async () => {
    let fetchedStudents = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/getstudents`, {
      method: "GET",
    });
    fetchedStudents = await fetchedStudents.json();
    // console.log(fetchedStudents);
    setStudents(fetchedStudents);
  };

  useEffect(() => {
    loadStudents();
  }, [myTeam]);

  useEffect(() => {
    const storedMyTeam = localStorage.getItem("myTeam");
    if (storedMyTeam) {
      setMyTeam(JSON.parse(storedMyTeam));
    }
    setLoading(false);
  }, []);
  const handleFinalizeTeam = () => {
    setLoading(true)
    const finalTeam = JSON.parse(localStorage.getItem("myTeam"));

    // console.log(finalTeam.length)
    if (
      Array.isArray(finalTeam) &&
      finalTeam.length >= 3 &&
      finalTeam.length <= 4
    ) {
      setAllowJudgement(true);
      localStorage.setItem("allowJudgement", "true");
    } else {
      alert("Please select Team Size between 3 and 4 inclusive.");
    }
    setLoading(false)
  };
  // useEffect(() => {
  //   return () => {
  //     effect
  //   };
  // }, [allowJudgement])
  const [activeBtn, setActiveBtn] = useState("List");
  const activeBtnStyles = "w-1/2 p-2 text-white bg-custom-red shadow-lg ";
  const notActiveBtnStyles =
    "w-1/2 p-2 bg-custom-pink text-white hover:bg-custom-red hover:shadow-lg ";
    const handleFilterChange = (event) => {
      setFilterValue(event.target.value);
    };
    const filteredStudents =
    filterValue === "all"
      ? students
      : filterValue === "marked"
      ? students.filter((student) => student.marked === "yes")
      : students.filter((student) => student.marked === "No");

      if(loading) return(<Spinner messeage="Loading..."/>)
  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-5 mx-10">
        <div
          className={`${
            activeBtn === "List" ? activeBtnStyles : notActiveBtnStyles
          } border-r border-black rounded rounded-l-full text-center cursor-pointer`}
          onClick={() => setActiveBtn("List")}
        >
          List
        </div>
        <div
          className={`${
            activeBtn === "My Team" ? activeBtnStyles : notActiveBtnStyles
          } border-l border-black rounded rounded-r-full text-center cursor-pointer`}
          onClick={() => setActiveBtn("My Team")}
        >
          My Team
        </div>
      </div>
      <div className=" flex justify-end p-5">
  <label  className="text-xl p-1 mr-2 font-bold">
    Filter Students:
  </label>
  <select
    id="filter"
    name="filter"
    value={filterValue}
    onChange={handleFilterChange}
    className="w-full max-w-md" 
  >
    <option value="all">All Students</option>
    <option value="marked">Marked Students</option>
    <option value="not-marked">Not Marked Students</option>
  </select>
</div>

      
      <div className="flex flex-col">
        {activeBtn === "List" ? (
          filteredStudents.length > 0 ? (
            filteredStudents.map((student, key) => {
              return (
                <Student
                  student={student}
                  setMyTeam={setMyTeam}
                  myTeam={myTeam}
                  allowJudgement={allowJudgement}
                  setLoading={setLoading}
                />
              );
            })
          ) : (
            <div>
              <div className="flex bg-white p-4 m-4 rounded-lg shadow-md mx-10">
                <div className="w-full text-center">
                  <p className="text-lg font-semibold">
                    No student entries available!!!{" "}
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col">
            {myTeam.length > 0 ? (
              <>
                {filteredStudents.map((student, key) => {
                  if (student.assignedTo === "Mithoon") {
                    return (
                      <StudentTeam
                        key={key}
                        student={student}
                        setMyTeam={setMyTeam}
                        myTeam={myTeam}
                        allowJudgement={allowJudgement}
                        setLoading={setLoading}
                      />
                    );
                  }
                  return null; 
                })}
                {localStorage.getItem("finalSubmission") !== "true" && (
                  <button
                    onClick={
                      localStorage.getItem("allowJudgement") === "true"
                        ? null
                        : handleFinalizeTeam
                    }
                    className={`${
                      localStorage.getItem("allowJudgement") === "true"
                        ? "bg-green-500 cursor-not-allowed px-4 py-2 rounded text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    }`}
                  >
                    {localStorage.getItem("allowJudgement") === "true"
                      ? "Team Finalized"
                      : "Finalize Team"}
                  </button>
                )}
                {localStorage.getItem("allowJudgement") === "true" && (
                  <button
                    className={`${
                      localStorage.getItem("finalSubmission") === "true"
                        ? "bg-green-500 cursor-not-allowed px-4 py-2 rounded text-white"
                        : "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                    }`}
                    onClick={
                      localStorage.getItem("finalSubmission") === "true"
                        ? null
                        : handleFinalMarksSubmit
                    }
                  >
                    {localStorage.getItem("finalSubmission") === "true"
                      ? "Marks Allotted"
                      : "Submit Final Marks"}
                  </button>
                )}
              </>
            ) : (
              <div>
                <div className="flex bg-white p-4 m-4 rounded-lg shadow-md mx-10">
                  <div className="w-full text-center">
                    <p className="text-lg font-semibold">
                      No student is present in your Team!!!{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div>
        <Student />
      </div> */}
    </div>
    
  );
};

export default Home;
