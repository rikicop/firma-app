import React, { useState } from 'react'
import buildingImg from '@/assets/building.jpg'
import Image from 'next/image'
import Select from 'react-select';

const options = [
    { value: 'No Censado', label: 'No Censado' },
    { value: 'Fuera de Censo', label: 'Fuera de Censo' },
    { value: 'Nombre mal Escrito', label: 'Nombre mal Escrito' }
];


const customStyles = {
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
        ...provided,
        color: 'white'
    })
};

const Firma = () => {
    /* USESTATES */
    const [enlace, setEnlace] = useState("");
    const [cc, setCc] = useState("");
    const [name, setName] = useState("");
    const [validSignature, setValidSignature] = useState("");
    const [verifiedSignature, setVerifiedSignature] = useState("");
    const [selectedOption, setSelectedOption] = useState(""); /* useState(null) */	
    const [originType, setOriginType] = useState("");
    
    /* HANDLERS */	
       
    const handleEnlaceChange = (event) => {
      setEnlace(event.target.value);
    };

    const handleCcChange = (event) => {
      setCc(event.target.value);
      console.log('cc:', cc)
    };

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handleValidSignatureChange = (event) => {
      setValidSignature(event.target.value);
    };

    const handleVerifiedSignatureChange = (event) => {
      setVerifiedSignature(event.target.value);
    };


    const handleOptionChange = (selectedOption) => {
        setSelectedOption(event.target.value);
    };

    //const handleProblemTypeChange = (event) => {
    //  setProblemType(event.target.value);
    //};

    const handleOriginTypeChange = (event) => {
      setOriginType(event.target.value);
    };
    

    /* OnSubmitForm */
    const handleSubmit = (event) => {
      event.preventDefault(); // prevent default form submission behavior

  // create an object with the form data
    const formData = {
    	cc,
    	name,
    	validSignature,
    	verifiedSignature,
    	selectedOption,
	originType,
    };
     console.log(formData)
  // make an API call to submit the form data
  	fetch('/api/one', {
    		method: 'POST',
    		headers: {
      			'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(formData)
  	})
  	.then(response => response.json())
  	.then(data => {
    		console.log('Success:', data);
    	// handle success response from API, e.g. show a success message
  	})
  	.catch((error) => {
    		console.error('Error:', error);
    	// handle error response from API, e.g. show an error message
  	});
};

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <Image className='w-full h-full object-cover' src={buildingImg} alt="build" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <h2 className='text-4xl dark:text-white font-bold text-center mb-2'>Ingreso de Firmas</h2>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleSubmit} >
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>CC</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text"
	    			value={cc} onChange={handleCcChange}
	    		/>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Nombre y Apellidos</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text"
	    			value={name} onChange={handleNameChange}
	    		/>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>FIRMA (VALIDA (V) / NO VALIDA (NV))</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text"
	    			value={validSignature} onChange={handleValidSignatureChange}
	    		/>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>FIRMA VERIFICADA (FV) / NO VERIFICADA (NV)</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text"
	    			value={verifiedSignature} onChange={handleVerifiedSignatureChange}
	    		/>
                    </div>
	    	   {/*
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="problema">PROBLEMA</label>
                        <Select
                            id="problema"
                            options={options}
                            value={selectedOption}
                            onChange={handleOptionChange}
                            styles={customStyles}
                            classNamePrefix='react-select'
                            isSearchable // add this line
                        />
                    </div>
		    */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Problema</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text"
	    			value={selectedOption} onChange={handleOptionChange}
	    		/>
                    </div>
		    	
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>ORIGEN (Coord, Enlace, Movimiento, Independiente, Mujeres)</label>
                        <input 
	    			className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    			type="text" 
	    			value={originType} onChange={handleOriginTypeChange}
	    		/>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg  hover:bg-teal-400 text-white font-semibold rounded-lg' type="submit">
	    		Ingresar
	    	    </button>
                </form>
            </div>
        </div>
    )
}

export default Firma
