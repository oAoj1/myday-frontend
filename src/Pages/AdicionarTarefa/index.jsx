import './AdicionarTarefa.css'
import api from '../../Api/api.js'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

export default function AdicionarTarefa(){

    const navigate = useNavigate()

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

    const [novaTarefa,setNovaTarefa] = useState({
        tarefa:'',
        descricao:'',
        concluido:false,
        prioridade:false,
        data:dataHoje
    })

    async function adicionandoTarefa(e){
        e.preventDefault()
        
        api.post('/tarefas', novaTarefa)
            .then(() => {
                alert('Nova tarefa adicionada!')
                navigate('/')
            })
            .catch(err => {
                alert('Erro, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={adicionandoTarefa} 
            className='adicionandoTarefaForm'
        >
            <div className="tituloAdicionarTarefa">
                <div className="voltar">
                    <IoIosArrowBack/>
                    <Link to='/'>Voltar</Link>
                </div>
                <h1>Adicionar tarefa</h1>
            </div>

            <select 
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
                onChange={e => setNovaTarefa({
                    ...novaTarefa,descricao:e.target.value
                })}
            />

            <button>Enviar</button>
        </form>
    )
}