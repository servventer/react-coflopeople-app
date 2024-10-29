import React, { useState } from "react";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
}

interface Props {
  onAddPerson: (newPerson: Person) => void;
  onClose: () => void;
}

function AddPersonModal({ onAddPerson, onClose }: Props) {
  const [newPerson, setNewPerson] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    age: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the REST API to add the person
    const response = await fetch("/PeopleManagement/api/person/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      const addedPerson = await response.json();
      onAddPerson(addedPerson); // Call the parent component's function to add the person
      setNewPerson({ firstName: "", lastName: "", birthDate: "", age: 0 }); // Reset the form
      onClose(); // Close the modal
    } else {
      console.error("Error adding person");
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Person</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={newPerson.firstName}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, firstName: e.target.value })
                }
                className="form-control mb-2"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newPerson.lastName}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, lastName: e.target.value })
                }
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                placeholder="Birth Date"
                value={newPerson.birthDate}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, birthDate: e.target.value })
                }
                className="form-control mb-2"
                required
              />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Person
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPersonModal;
