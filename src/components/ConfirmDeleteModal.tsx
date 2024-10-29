interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
}

interface Props {
  DeletePerson: Person | null;
  onConfirmDelete: () => void;
  onClose: () => void;
}

function ConfirmDeleteModal({ DeletePerson, onConfirmDelete, onClose }: Props) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>{" "}
              <tbody>
                <tr>
                  <td>{DeletePerson?.id}</td>
                  <td>{DeletePerson?.firstName}</td>
                  <td>{DeletePerson?.lastName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirmDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
