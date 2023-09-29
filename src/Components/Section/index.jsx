import './Section.css'
import api from '../../Api/api.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CiEdit } from 'react-icons/ci'
import { BsCheckAll, BsCheck2 } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { MdOutlinePending, MdPriorityHigh } from 'react-icons/md'

export default function Secao(){

    const [tarefas,setTarefas] = useState([])

    useEffect(() => {
        async function lerTarefas(){
            const response = await api.get('/tarefas')
            const data = response.data

            setTarefas(data)
        }

        lerTarefas()
    },[])

    async function excluirTarefa(id){
        const confirmar = window.confirm('Deseja excluir tarefa?')

        if(confirmar){
            await api.delete(`/tarefas/${id}`)

            .then(() => {
                alert('Tarefa excluida!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao excluir tarefa, confira o console')
                console.log(err)
            })
        }
    }

    async function prioridadeTarefa(id){
        const confirmar = window.confirm('Deseja alterar prioridade da tarefa?')

        if(confirmar){
            await api.post(`/tarefas/prioridade/${id}`)
            
            .then(() => {
                alert('Alterada prioridade da tarefa!')
                location.reload()
            })
            .catch(err => {
                alert('Erro ao priorizar tarefa, confira o console')
                console.log(err)
            })
        }
    }

    async function concluirTarefa(id){
        const confirmar = window.confirm('Deseja concluir tarefa?')

        if(confirmar){
            await api.post(`/tarefas/concluir/${id}`)

            .then(() => {
                alert('Tarefa concluida!')
                location.reload()
            })
            .catch(err => {
                alert('Erro, confira o console')
                console.log(err)
            })
        }
    }

    async function limparTodasTarefas(){
        const confirmar = window.confirm('Deseja mesmo limpar todas tarefas?')

        if(confirmar){
            await api.delete('/tarefas')

            .then(() => {
                alert('Lista de tarefas limpa!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro, confira o console')
                console.log(err)
            })
        }
    }

    return(
        <section>
            <div className="tituloTarefa">
                <h1>Tarefas</h1>
                <button>
                    <Link to='/adicionartarefa'>
                        Adicionar tarefa
                    </Link>
                </button>
                <button onClick={() => limparTodasTarefas()}>
                    Limpar tarefas
                </button>
            </div>

            <hr 
                style={{
                    margin:'0.25rem 0 1rem 0'
                }}
            />

            <div className="listaTarefas">

                <ul className='pendentes'>
                    <div className="tituloPendentes">
                        <h2>pendentes</h2>
                        <MdOutlinePending/>
                    </div>

                    {tarefas.map(tarefas => (
                        <div>
                            {tarefas.concluido == false ? 
                                <li 
                                    key={tarefas._id} 
                                    className={
                                        tarefas.prioridade == true ? 
                                        'tarefaPrioridade' : ''
                                    }
                                >
                                    <div className="opcoesMais">
                                        <MdPriorityHigh onClick={() => prioridadeTarefa(tarefas._id)}/>
                                        <BsCheck2 onClick={() => concluirTarefa(tarefas._id)}/>
                                    </div>

                                    <h4>{tarefas.tarefa}</h4>
                                    <h5>{tarefas.descricao}</h5>

                                    <div className="opcoesEdicao">
                                        <hr style={{
                                            margin:'0.5rem 0'
                                        }}/>
                                        <AiFillDelete 
                                            onClick={() => excluirTarefa(tarefas._id)}
                                        />
                                        <Link to={`/editartarefa/${tarefas._id}`}>
                                            <CiEdit/>
                                        </Link>
                                    </div>

                                </li> 
                            : ''}
                            
                        </div>
                    ))}
                </ul>

                <ul className='concluidas'>
                    <div className="tituloConcluidas">
                        <h2>concluidas</h2>
                        <BsCheckAll/>
                    </div>
                    
                    {tarefas.map(tarefas => (
                        <div>
                            {tarefas.concluido == true ? 
                                <li key={tarefas._id}>
                                    <h4>{tarefas.tarefa}</h4>
                                    <h5>{tarefas.descricao}</h5> 
                                </li>
                            : ''}
                        </div>
                    ))}
                    
                </ul>

            </div>
        </section>
    )
}