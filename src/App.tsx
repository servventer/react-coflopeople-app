import { useEffect, useState } from "react";

import cofloLogo from "./assets/co_flo_logo.jpg";
// import "./App.css";
import PeopleList from "./components/PeopleList";
import AddPersonModal from "./components/AddPersonModal";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
}

function App() {
  const [listOfPeople, setPeople] = useState<Person[]>([]);
  const [showModal, setShowModal] = useState(false); // Modal for Add Person
  const [loading, setLoading] = useState(true); // State to wait for Data from REST API

  // Fetch the People List from the REST API
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("/PeopleManagement/api/person/getlist");
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Handler to Add a new person to the People List
  const handleAddPerson = (newPerson: Person) => {
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };

  // Handler Call the REST API to delete the person by ID
  const handleDeletePerson = async (id?: number) => {
    let uri = "/PeopleManagement/api/person/delete/" + id;
    const response = await fetch(uri, {
      method: "DELETE",
    });

    if (response.ok) {
      // Filter out the deleted person from the list
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== id)
      );
    } else {
      console.error("Error deleting person");
    }
  };

  // Handler Call the REST API to UPDATE the person by ID
  const handleUpdatePerson = async (updatedPerson: Person) => {
    const response = await fetch("/PeopleManagement/api/person/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerson),
    });

    if (response.ok) {
      const updatedPerson = await response.json();
      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        )
      );
    } else {
      console.error("Error updating person");
    }
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div>
          <img src={cofloLogo} className="logo react" alt="CoFlo logo" />
        </div>
        <h1>People Management</h1>
        <br />
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowModal(true)}
        >
          + Add Person
        </button>

        {/* Modal for Adding a New Person */}
        {showModal && (
          <AddPersonModal
            onAddPerson={handleAddPerson}
            onClose={() => setShowModal(false)}
          />
        )}

        <PeopleList
          ListOfPeople={listOfPeople}
          onDeletePerson={handleDeletePerson}
          onUpdatePerson={handleUpdatePerson}
        />
      </div>
    </div>
  );
}

export default App;
