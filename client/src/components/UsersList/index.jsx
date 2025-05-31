import { connect } from "react-redux";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./UsersList.module.sass";
import defImage from "./defaultPhoto.jpg";

export const UsersList = ({ isFetching, error }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.data));
  }, []);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <img
              className={styles.userImage}
              src={
                u.image ? `http://localhost:5000/images/${u.image}` : defImage
              }
              alt={`${u.firstName} ${u.lastName}`}
            />
            <p>{JSON.stringify(u)}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData }) => usersData;

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
