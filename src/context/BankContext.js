import React, { useContext, useState, useEffect } from "react"
import { db } from "../firebase"

const BankContext = React.createContext()

export function useBank() {
    return useContext(BankContext)
}

export function BankProvider({ children }) {
    const [bankList, setbankList] = useState([]);
    const [schemaBankList, setSchemaBankList] = useState(["State Bank of India", "Punjab National Bank", "Bank of Baroda"])
    async function addBank(bank){
        await db.collection('banks').add(bank)
    }

    const value = {
        addBank,
        bankList,
        schemaBankList,
    }

    useEffect(() => {
        const fetchData = () => {
            db.collection("banks").onSnapshot((querySnapshot) => {
                var currentbankList = [];
                querySnapshot.forEach((doc) => {
                    currentbankList.push({ ...doc.data(), id: doc.id })
                })
                setbankList(currentbankList)
            })
        }
        fetchData()
    }, [])

    return (
        <BankContext.Provider value={value}>
          {children}
        </BankContext.Provider>
    )
}