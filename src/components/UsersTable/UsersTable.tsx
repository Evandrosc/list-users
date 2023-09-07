import "./UsersTable.scss";
import { api } from "../../api/api";
import { useQuery } from "react-query";

interface User {
  uuid: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  dob: {
    date: string;
    age: number;
  };
  login: {
    uuid: string;
  }
 
}

export const UsersTable = () => {
  const { data } = useQuery(['users'], () => api.getUsers(10));


  return (
    <div className="table-users">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th>Date</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.results?.map((user: User) => (
          <tr key={user.uuid}>
            <td>{user.login.uuid}</td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.name.title}</td>
            <td>{new Date(user.dob.date).toLocaleDateString()}</td>
            <td>{user.dob.age}</td>
            <td>View profile</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default UsersTable;
