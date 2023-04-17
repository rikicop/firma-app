import React, { useState , useId } from 'react'
import buildingImg from '@/assets/building.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router';
//REACT SELECT
import Select from 'react-select';
//TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = [
    { value: 'NC', label: 'No Censado' },
    { value: 'FC', label: 'Fuera de Censo' },
    { value: 'NME', label: 'Nombre mal Escrito' }
];


function Firma() {
	
    const [name, setName] = useState("")	
    const [cc, setCc] = useState("")
    const [vasignature,setVasignature] = useState("")
    const [vesignature,setVesignature] = useState("")
    const [selectedOption, setSelectedOption] = useState(""); //or Null? 
    
	
    const router = useRouter();

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { 
		           name: name, 
		           cc:cc , 
		           valid_signature: vasignature ,
		           verified_signature: vesignature , 
		           problem_type: selectedOption.value  
	                 }
            const response = await fetch("http://localhost:5002/api/one", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            //window.location = "/" // Reload the page
            console.log("response:", response)
            
	    if (response.status === 200) {
                toast.success('Successfully Saved', { position: toast.POSITION.TOP_RIGHT })
            }
	    if (response.status !== 200) {
               toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT, autoClose: false })
    
	    }


	    //router.push('/');
        } catch (err) {
            console.error(err.message)
	    toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT, autoClose: false })
        }
    }
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
	  <div className='hidden sm:block'>
                <Image className='w-full h-full object-cover' src={buildingImg} alt="build" />
          </div>
          <div className='bg-gray-800 flex flex-col justify-center'>
                <h2 className='text-4xl dark:text-white font-bold text-center mb-2'>Ingreso de Firmas</h2>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={onSubmitForm}>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>CC</label>
                        <input 
	    		   className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    		   type="text"
	    		   value={cc} 
	                   onChange={ e => setCc(e.target.value) }
	    		/>
                 </div>
	         <div className='flex flex-col text-gray-400 py-2'>
                    <label>Validación De Firma</label>
                        <input 
	    		   className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    		   type="text"
	    		   value={ vasignature }
	                   onChange={ e => setVasignature(e.target.value) }
	    		/>
                 </div>
	         <div className='flex flex-col text-gray-400 py-2'>
                    <label>Verificación De Firma</label>
                        <input 
	    		   className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    		   type="text"
	    		   value={vesignature} 
	                   onChange={ e => setVesignature(e.target.value) }
	    		/>
                 </div>
	         <div className='flex flex-col text-gray-400 py-2'>
                     <label>Name</label>
                       <input 
	    		  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    		  type="text"
	    		  value={name} 
	                  onChange={ e => setName(e.target.value) }
	    	      />
                 </div>

	         <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="problema">PROBLEMA</label>
                         <Select
                            id="problema"
                            options={options}
                            value={selectedOption}
	                    onChange={selectedOption => setSelectedOption(selectedOption)}
                            classNamePrefix='react-select'
                            isSearchable // add this line
	    		    instanceId={useId()}	
                        />
                   </div>
		    	
                 <button className="bg-green-500 text-white ml-1 py-2 px-3 rounded">
                     Add
                 </button>
              </form>
	     <ToastContainer />	
        </div>
      </div>
    )
}

export default Firma
