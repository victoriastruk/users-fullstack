import { connect } from "react-redux";
import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./UsersList.module.sass";
import defImage from "./defaultPhoto.jpg";
import { deleteUserThunk, getUsersThunk } from "../../store/slices/usersSlice";

export const UsersList = ({
  users,
  isFetching,
  error,
  getUsers,
  deleteUser,
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <button onClick={() => deleteUser(u.id)}>X</button>
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

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersThunk()),
  deleteUser: (id) => dispatch(deleteUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
