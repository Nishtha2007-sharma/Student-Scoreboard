import StudentRow from "./StudentRow";

function StudentTable({ students, updateScore }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <StudentRow
            key={s.id}
            student={s}
            updateScore={updateScore}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;