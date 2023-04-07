import React, { useState } from 'react'

function Firma() {
    const [name, setName] = useState("")
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { name: name }
            const response = await fetch("http://localhost:5002/api/one", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
            console.log("response:", response)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="flex justify-center mt-5" onSubmit={onSubmitForm}>
                <input type="text"
                    className="
                      form-control block
                      px-3 py-0.5
                      text-sm leading-5
                    text-gray-700
                    bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                    focus:text-gray-700 
                    focus:bg-white 
                    focus:border-blue-600 focus:outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="bg-green-500 text-white ml-1 py-2 px-3 rounded">
                    Add
                </button>
            </form>
        </>
    )
}

export default Firma
