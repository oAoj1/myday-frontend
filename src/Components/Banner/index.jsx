import './Banner.css'
import ListaPrioridade from '../Banner/listaPrioridade'
import DataHoje from '../Banner/dataHoje'

export default function Banner(){
    return(
        <main>
            <ListaPrioridade/>
            <DataHoje/>
        </main>
    )
}