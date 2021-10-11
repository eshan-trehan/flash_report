import React, { useContext, useState, useEffect } from "react"
import "firebase/auth";
import { db, storage, secondaryApp } from "../firebase"


const AdminContext = React.createContext()

export function useAdmin() {
    return useContext(AdminContext)
}

export function AdminProvider({ children }) {
    const [employeeList, setEmployeeList] = useState([]);
    const [taskList, setTaskList] = useState([]);

    async function createUser(user){
        await secondaryApp.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
            return db.collection('users').doc(firebaseUser.user.uid).set({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                designation: user.designation,
            })
        }).then(() => {
            console.log("User created successfully!")
            secondaryApp.auth().signOut()
        })
    }

    function getFileExtension(filename){
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }

    function putStorageItem(file, taskID) {
        const fileExtension = getFileExtension(file.name)
        return storage.ref(`tasks/${taskID}/${file.id}.${fileExtension}`).put(file)
        .then(() => {console.log('One success!')})
        .catch(() => {console.log('One failed...')});
    }

    async function createTask(task){
        await Promise.all(
        task.images.map(file => putStorageItem(file, task.id)))
        .then(() => {
            return db.collection('tasks').doc(task.id).set({
                images: task.images.map(image => (`${image.id}.${getFileExtension(image.name)}`)),
                schema: task.schema,
                bank: task.bank,
                borrowerNumber: task.borrowerNumber,
                remark: task.remark,
                state: "PENDING"
            })
        })
        .then(() => {console.log('Task created successfully!')})
    }

    const value = {
        createUser,
        createTask,
        employeeList,
        taskList,
    }

    useEffect(() => {
        const fetchEmployees = () => {
            db.collection("users").onSnapshot((querySnapshot) => {
                var currentEmployeeList = [];
                querySnapshot.forEach((doc) => {
                    currentEmployeeList.push({ ...doc.data(), id: doc.id })
                })
                setEmployeeList(currentEmployeeList)
            })
        }
        const fetchTasks = () => {
            db.collection("tasks").onSnapshot((querySnapshot) => {
                var currentTaskList = []
                querySnapshot.forEach((doc) => {
                    currentTaskList.push({...doc.data(), id: doc.id })
                })
                setTaskList(currentTaskList)
            })
        }
        fetchTasks()
        fetchEmployees()
    }, [])

    return (
        <AdminContext.Provider value={value}>
          {children}
        </AdminContext.Provider>
    )
}