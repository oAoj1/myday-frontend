import './EditarTarefa.css'
import api from '../../Api/api.js'
import { useState,useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditarTarefa(){

    const navigate = useNavigate()
    const { id } = useParams()

    const listaTarefas = [
        '',
        'estudar',
        'treinar',
        'leitura',
        'pesquisar',
        'roteiro',
        'editar',
        'thumbnail'
    ]

    var data = new Date()

    let dia = String(data.getDate()).padStart(2,'0')
    let mes = String(data.getMonth() + 1).padStart(2,'0')
    let ano = String(data.getFullYear())

    let hora = String(data.getHours())
    let minuto = String(data.getMinutes())
    let segundos = String(data.getSeconds())
    let milisegundos = String(data.getMilliseconds())
    let dataHoje = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundos}.${milisegundos}Z`

    const [novaTarefa,setNovaTarefa] = useState([])

    async function editandoTarefa(e){
        e.preventDefault()
        
        api.put(`/tarefas/${id}`, novaTarefa)
            .then(() => {
                alert('Tarefa atualizada!')
                navigate('/')
            })
            .catch(err => {
                alert('Erro, confira o console')
                console.log(err)
            })
    }

    useEffect(() => {
        async function lerTarefa(){
            const response = await api.get(`/tarefas/${id}`)
            .then(res => (
                setNovaTarefa(res.data)
            ))
            .catch(err => (
                console.log(err)
            ))
        }

        lerTarefa()
    },[])

    return(
        <form 
            onSubmit={editandoTarefa} 
            className='editandoTarefaForm'
        >
            <div className="tituloEditandoTarefa">
                <div className="voltar">
                    <IoIosArrowBack/>
                    <Link to='/'>Voltar</Link>
                </div>
                <h1>Editando tarefa</h1>
            </div>

            <select 
                value={novaTarefa.tarefa}
                onChange={e => setNovaTarefa({
                    ...novaTarefa,tarefa:e.target.value
                })}
            >
                {listaTarefas.map(tarefas => (
                    <option key={tarefas}>
                        {tarefas}
                    </option>
                ))}
            </select>

            <input 
                required
                type="text" 
                placeholder='Descricao'
                value={novaTarefa.descricao}
                onChange={e => setNovaTarefa({
                    ...novaTarefa,descricao:e.target.value
                })}
            />

            <button>Enviar</button>
        </form>
    )
}