import React, { useState , useId } from 'react'
import buildingImg from '@/assets/building.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Select from 'react-select';


const options = [
    { value: 'NC', label: 'No Censado' },
    { value: 'FC', label: 'Fuera de Censo' },
    { value: 'NME', label: 'Nombre mal Escrito' }
];



/*const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'gray'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'gray'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'black' : 'gray',
        color: state.isSelected ? 'white' : 'inherit',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: state.isSelected ? 'black' : 'lightgray',
            color: state.isSelected ? 'white' : 'inherit',
            boxShadow: 'none'
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    input: (provided) => ({
	D
        ...provided,
        color: 'white'
    })
};*/

function Firma() {
    const [name, setName] = useState("")	
    const [cc, setCc] = useState("")
    const [selectedOption, setSelectedOption] = useState(""); //or Null? 
    
	
    const router = useRouter();

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { name: name, cc:cc , problem_type: selectedOption.value  }
            const response = await fetch("http://localhost:5002/api/one", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/" // Reload the page
            console.log("response:", response)
            //router.push('/');
        } catch (err) {
            console.error(err.message)
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
        </div>
      </div>
    )
}

export default Firma
