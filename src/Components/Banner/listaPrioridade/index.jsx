import './ListaPrioridade.css'
import api from '../../../Api/api.js'
import { useState,useEffect } from 'react'
import { BsArrowReturnRight } from 'react-icons/bs'

export default function ListaPrioridade(){

    const [prioridades,setPrioridades] = useState([])

    useEffect(() => {
        async function lerPrioridades(){
            const response = await api.get('/tarefas')
            const data = response.data

            setPrioridades(data)
        }

        lerPrioridades()
    },[])

    return(
        <main>
            <div className="prioridadeContainer">

                <div className="tituloPrioridade">
                    <h1>Prioridades de hoje:</h1>
                </div>

                <ul className='listaPrioridade'>
                    {prioridades.map(prioridade => (
                        <div>
                            {prioridade.prioridade == true ?  
                                <li key={prioridade._id}>
                                    <h2>{prioridade.tarefa}</h2>
                                    <div className="descricaoTarefa">
                                        <BsArrowReturnRight/>
                                        <p>{prioridade.descricao}</p>
                                    </div>
                                </li>
                            : ''}
                        </div>
                    ))}
                </ul>

            </div>
        </main>
    )
}