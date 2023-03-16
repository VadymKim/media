function UsersListItem({user}) {
    return (
        <div  className="flex justify-between rounded bg-gray-200 mb-2 p-2">
            {user.name}
        </div>
    );
}    

export default UsersListItem;