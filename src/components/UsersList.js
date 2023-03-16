import { fetchUsers, addUser } from "../store";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import Skeleton from './Skeleton';
import { Spin, Skeleton } from 'antd';
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";


function UsersList() {
    const [runFetchUsersThunk, isLoading, isLoadingError] = useThunk(fetchUsers);
    const [runAddUserThunk, isCreatingUser, isCreatingUserError] = useThunk(addUser);
    const { data } = useSelector((state) => {
        return state.users;
    });
    
    useEffect(() => {
       runFetchUsersThunk();
      },[runFetchUsersThunk]); 

    const handleAddUser = () => {
      runAddUserThunk();
    };

    let content;

    if (isLoading) {
        //return <Skeleton times={6} className="h-10 w-full" />
        //return <Spin tip="Loading..." size="large"/>;
        content =  <Skeleton active />;
    } else if (isLoadingError) {
        content =  <div><h2>Error during fetching data ....</h2></div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
            
        });
    }

    

    return (
        <div>
            <div className="flex flex-row justify-between item-center m-3">
                <h1 className="text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleAddUser}>+ Add</Button>
                
                {isCreatingUserError && 'Error during creating user'}
            </div>
            {content}
        </div>
    );
}

export default UsersList;