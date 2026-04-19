function StudentRow({ student, updateScore }) {
  const isPass = student.score >= 40;

  return (
    <tr>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) =>
            updateScore(student.id, e.target.value)
          }
        />
      </td>
      <td className={isPass ? "pass" : "fail"}>
        {isPass ? "PASS" : "FAIL"}
      </td>
    </tr>
  );
}

export default StudentRow;