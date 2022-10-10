import { render } from '@testing-library/react'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, editUser } from './userSlice'
import { v4 as uuidv4 } from 'uuid';

export default function UserList() {
    const [id, setId] = useState('')
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    })
    const users = useSelector(store => store.users)
    const dispatch = useDispatch()
    const existingUser = users.filter(user => user.id == id)
   
   // const { name, email } = userData;
    //function 
    let changeData = (e) => {
        const value = e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        })
    }
     let handleAdd = (e) => {
        e.preventDefault()

        console.log("val", userData)
        dispatch(addUser({
            id: uuidv4(),
            name: userData.name,
            email: userData.email
        }))
    }
    let edit = (user) => {
        let id1 = user.id
        let name1 = user.name;
        let email1 = user.email
        setUserData({
            name: name1,
            email: email1
        })
        setId(id1)
        setShow(true)
    }
    let update = (e) => {
        e.preventDefault()
        dispatch(editUser({
            id: id,
            name: userData.name,
            email: userData.email

        }))
        setUserData({
            name: "",
            email: ""
        })

    }
    let deleteData = (id) => {
        console.log(id)
        dispatch(deleteUser({
            id: id
        }))
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" name="name" onChange={changeData} value={userData.name} placeholder="Enter UserName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={changeData} value={userData.email} placeholder="Enter email" />

                </Form.Group>
                {
                    !show ? <Button variant="success" onClick={handleAdd} type="submit"> Submit</Button> :
                           <Button variant="success" type="submit" onClick={update}> Update</Button>
                }
            </Form>
                {
                    users.map(user => (
                     <Card key={user.id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                <div>
                                    <Button variant="outline-danger" onClick={() => { deleteData(user.id) }}>Delete</Button>{' '}
                                    <Button variant="outline-info" onClick={() => { edit(user) }}>update</Button>{' '}
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            
        </div>
    )
}
