import React, { useEffect, useState } from "react";
import _ from "lodash";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
}

interface Props {
  ListOfPeople: Person[];
  onDeletePerson: (id: number | undefined) => void;
  onUpdatePerson: (person: Person) => void;
}

function PeopleList({ ListOfPeople, onDeletePerson, onUpdatePerson }: Props) {
  const [people, setPeople] = useState(ListOfPeople);

  // check to decide to render list of people again
  if (!_.isEqual(people, ListOfPeople)) {
    setPeople(ListOfPeople);
  }

  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [updatedPerson, setUpdatedPerson] = useState<Person | null>(null);

  const [showModal, setShowModal] = useState(false); // state for ConfirmDelete Modal
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null); // Holds the selected record for deletion

  // Open modal with selected person
  const handleDeleteClick = (person: Person) => {
    setPersonToDelete(person);
    setShowModal(true);
  };

  // Handler the Confirm Delete Button to call onDeletePerson in parent and close the modal
  const handleConfirmDeleteClick = (personToDelete: Person | null) => {
    onDeletePerson(personToDelete?.id);
    setShowModal(false); // Close the modal
  };

  // Handler to editing
  const handleEditClick = (person: Person) => {
    setEditingPersonId(person.id);
    setUpdatedPerson({ ...person }); // Make a copy of the person to edit
  };

  // Handler for Save Button
  const handleSave = async () => {
    if (updatedPerson) {
      setPeople(ListOfPeople);
      await onUpdatePerson(updatedPerson); // Call the update function

      setEditingPersonId(null); // Close the editing mode
    }
  };

  // SEARCH STUFF
  // Update search term based on user input
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  // Filter people based on search term
  const filteredPeople = people.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Search by First name or Last Name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map((person) => (
            <tr key={person.id}>
              <td width="10%">{person.id}</td>
              <td width="20%">
                {editingPersonId === person.id ? (
                  <input
                    type="text"
                    maxLength={255}
                    value={updatedPerson?.firstName}
                    onChange={(e) =>
                      setUpdatedPerson({
                        ...updatedPerson!,
                        firstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  person.firstName
                )}
              </td>
              <td width="20%">
                {editingPersonId === person.id ? (
                  <input
                    type="text"
                    maxLength={255}
                    value={updatedPerson?.lastName}
                    onChange={(e) =>
                      setUpdatedPerson({
                        ...updatedPerson!,
                        lastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  person.lastName
                )}
              </td>
              <td width="20%">
                {editingPersonId === person.id ? (
                  <input
                    type="date"
                    value={updatedPerson?.birthDate}
                    onChange={(e) =>
                      setUpdatedPerson({
                        ...updatedPerson!,
                        birthDate: e.target.value,
                      })
                    }
                  />
                ) : (
                  new Date(person.birthDate).toDateString()
                )}
              </td>
              <td width="10%">{person.age}</td>
              <td width="20%">
                {editingPersonId === person.id ? (
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleEditClick(person)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(person)}
                    >
                      Delete
                    </button>
                  </>
                )}{" "}
                {/* Modal for Confirmation of Deletion */}
                {showModal && (
                  <ConfirmDeleteModal
                    DeletePerson={personToDelete}
                    onConfirmDelete={() =>
                      handleConfirmDeleteClick(personToDelete)
                    }
                    onClose={() => setShowModal(false)}
                  />
                )}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeopleList;
