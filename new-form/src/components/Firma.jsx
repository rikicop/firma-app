import React, { useState , useId } from 'react'
import buildingImg from '@/assets/building.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router';
//REACT SELECT
import Select from 'react-select';
//TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Download CSV
import Link from 'next/link';

const options = [
    { value: 'NC', label: 'No Censado' },
    { value: 'FC', label: 'Fuera de Censo' },
    { value: 'U', label: 'Uniprocedencia' },  
    { value: 'NME', label: 'Nombre Mal Escrito' },  
    { value: 'CPM', label: 'Cancelada por Muerte' },  
    { value: 'SDP', label: 'Suspención de Derechos P.' },  
    { value: 'MPH', label: 'Mal procedimiento por huella' },  
    { value: 'ND', label: 'Nombre Diferente por Huella' },   
    { value: 'SF', label: 'Firma Sobrepuesta' },  
    { value: 'CI', label: 'Casilla Intercalda' },  
    { value: 'NI', label: 'Número Ilegible' },  
    { value: 'NNC', label: 'Número no correspondiente' },  
    { value: 'NHPV', label: 'No Habilitada para Votar' },  
    { value: 'HDPT', label: 'Hoja Dañada por tachón' },
    { value: 'NI', label: 'Nombre Incompleto o Inválido' },  
    { value: 'D', label: 'Duplicado' },  
    { value: 'ID', label: 'Datos Incompletos'},  
    { value: 'FI', label: 'Firma Inválida'},  
];


function Firma() {
	
    const [name, setName] = useState("")	
    const [cc, setCc] = useState("")
    //const [shortv,setShortv] = useState(false)	
    const [vasignature,setVasignature] = useState("-")
    const [vesignature,setVesignature] = useState("-")
    const [selectedOption, setSelectedOption] = useState(""); //or Null? 
    
    // Cambiar estado de shortv
    function handleVV() {
       setVasignature("NV");	        
       setVesignature("NV"); 	
    }	
    function handleNV() {
       setVasignature("NV");	        
       setVesignature("FV"); 	
    }
    function handlePerfect() {
       setVasignature("V");	        
       setVesignature("FV");
       setSelectedOption("");
    }
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
	//if(selectedOption.value === "FC"){
        //   setVasignature("NV");	        
        //   setVesignature("FV"); 
	//}
	if(selectedOption.value === "FC" || selectedOption.value === "NC" 
         || selectedOption.value === "CPM" ||         
            selectedOption.value === "SDP" || 
            selectedOption.value === "ND" || 
            selectedOption.value === "NHPV" || 
            selectedOption.value === "NMC")
        {
           setVasignature("NV");	        
           setVesignature("FV"); 
	}
        if(selectedOption.value === "EE" || selectedOption.value === "NL" || 
         selectedOption.value === "U" || selectedOption.value === "NME" ||
         selectedOption.value === "SF" || selectedOption.value === "CI" ||
         selectedOption.value === "MPH" || selectedOption.value === "HDPT" ||
         selectedOption.value === "D" || selectedOption.value === "ID" ||
         selectedOption.value === "FI")
        {	
	   setVasignature("NV");	        
           setVesignature("NV"); 
        }  
	    
    };


    
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
            const response = await fetch("http://192.168.1.12:5002/api/one", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            //window.location = "/" // Reload the page
            console.log("response:", response)
            
	    if (response.status === 200) {
                toast.success(`Successfully Saved ${name}`, { position: toast.POSITION.TOP_RIGHT, autoClose:2000 })
            }
	    if (response.status !== 200) {
               toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT, autoClose: false })
    
	    }
            setName("");
	    setCc("");
	    setVasignature("-")
	    setVesignature("-")
            setSelectedOption("")		
 
	    //router.push('/');
        } catch (err) {
            console.error(err.message)
	    toast.error('Something went wrong in catch!', { position: toast.POSITION.TOP_RIGHT, autoClose: false })
        }
    }
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
	  <div className='hidden sm:block'>
                <Image className='w-full h-full object-cover' src={buildingImg} alt="build" />
          </div>
          <div className='bg-gray-800 flex flex-col justify-center'>
                <h2 className='text-4xl dark:text-white font-bold text-center mb-2'>Ingreso de Firmas</h2>
                <div className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
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
                     <label>Nombre </label>
                       <input 
	    		  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
	    		  type="text"
	    		  value={name} 
	                  onChange={ e => setName(e.target.value) }
	    	      />
                 </div>

{/*
	         <div className='flex flex-col text-gray-400 py-2'>
                        <button onClick={handleVV} style={{ backgroundColor: "tomato", color: "white" }}>
	                  No Pasan Verificación Visual (NV | NV)
	                </button>
                 </div>
	         <div className='flex flex-col text-gray-400 py-2'>
                        <button onClick={handleNV} style={{ backgroundColor: "red", color: "white" }}>
	                  No Pasan Verificación Del Sistema (NV | FV)
	                </button>
                 </div>
		 */}
	          <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="problema">Problema</label>
                         <Select
                            id="problema"
                            options={options}
                            value={selectedOption}
	                    onChange={handleSelectChange}
                            classNamePrefix='react-select'
                            isSearchable // add this line
	    		    instanceId={useId()}	
                        />
                   </div>

	          <div className='flex flex-col text-gray-400 py-2'>
                        <button onClick={handlePerfect} style={{ backgroundColor: "green", color: "white" }}>
	                 Perfecto! 
	                </button>
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
	         	         		    	
                 <button className="bg-green-500 text-white ml-1 py-2 px-3 rounded" onClick={onSubmitForm}>
                     Add
                 </button>
		<Link href="http://192.168.1.12:5002/api/download">        		
	        	<div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 ml-2 inline-block rounded">
	                 Descargar CSV
	                </div>
      		</Link>
              </div>
	     <ToastContainer />	
        </div>
      </div>
    )
}

export default Firma
