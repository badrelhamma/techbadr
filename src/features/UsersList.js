import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import { useState } from "react"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const UsersList = () => {
    useTitle('techNotes: Users List')

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [searshRoles, setSearshRoles] = useState([])
   

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = users
        if (!searshRoles.length) return setSearshRoles([...ids])
        const handleSubmit = (e) => e.preventDefault()
        
        const handleSearchChange = (e) => {
            
            
            if (!e.target.value) return setSearshRoles(ids) 
           
            let filteredIds = ids.filter(userId => entities[userId].username.includes(e.target.value) )
            
           setSearshRoles(filteredIds)
            
        }
         
        const tableContent = searshRoles?.length && searshRoles.map(userId => <User key={userId} userId={userId} />)

        
        content = (
            <div>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        className="search__input"
                        type="text"
                        id="search"
                        onChange={handleSearchChange}
                    />
                    <button className="search__button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                </form>


                <table className="table table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">Username</th>
                            <th scope="col" className="table__th user__roles">Roles</th>
                            <th scope="col" className="table__th user__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>

        )
    }
    
    return content
}
export default UsersList