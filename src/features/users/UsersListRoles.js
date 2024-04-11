import { useGetUserQuery } from "./usersApiSlice"
import User from './User'
import { useState } from "react"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import SearchItem from './SearchItem'

import Form from 'react-bootstrap/Form';
import { PaginationControl } from 'react-bootstrap-pagination-control';
const UsersList = () => {
    useTitle('techNotes: Users List')
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    //const [totale] = useState(8);

    const {
        data: users,
        isLoading,
        isSuccess

    } = useGetUserQuery({
        page,
        pageSize,
        search
    })


    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isSuccess) {
        const tableContent = users.users?.length && users.users.map(userId => <User key={userId._id} userId={userId._id} />)
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__ID">ID User</th>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>

        )
    }

    return (
        <>
            <div className="container">
                < div className="row">
                    < div className="col">
                        <SearchItem search={search} setSearch={setSearch} />
                    </div>
                    < div className="col-auto">
                        <PaginationControl className="pagination "
                            First
                            last

                            page={page}
                            between={3}
                            total={users?.total}
                            limit={pageSize}
                            changePage={(page) => {
                                setPage(page)
                            }}
                            ellipsis={1}
                        />
                    </div>
                    < div className="col col-lg-2">
                        <Form.Select  aria-label="Default select example" value={pageSize} onChange={e => {
                            setPageSize(e.target.value);
                        }}>
                            <option>Open this select menu</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="8">8</option>

                        </Form.Select>
                    </div>
                </div>
            </div>






            {content}


        </>
    )

}
export default UsersList