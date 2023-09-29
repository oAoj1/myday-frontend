import './DataHoje.css'
import { useEffect,useState } from 'react'

export default function DataHoje(){

    const [dia,setDia] = useState('')
    const [data,setData] = useState('')
    const [periodo,setPeriodo] = useState('')

    useEffect(() => {
        var data = new Date()

        async function lerDia(){
            let diaHoje = data.getDay()

            if(diaHoje == 0){
                diaHoje = 'Domingo'
            }
            if(diaHoje == 1){
                diaHoje = 'Segunda-feira'
            }
            if(diaHoje == 2){
                diaHoje = 'Terça-feira'
            }
            if(diaHoje == 3){
                diaHoje = 'Quarta-feira'
            }
            if(diaHoje == 4){
                diaHoje = 'Quinta-feira'
            }
            if(diaHoje == 5){
                diaHoje = 'Sexta-feira'
            }
            if(diaHoje == 6){
                diaHoje = 'Sábado'
            }

            setDia(diaHoje)
        }
    
        async function lerData(){
            let dia = String(data.getDate()).padStart(2,'0')
            let mes = String(data.getMonth() + 1).padStart(2,'0')

            let dataCompleta = `${dia}/${mes}`

            setData(dataCompleta)
        }
    
        async function lerPeriodo(){
            let hora = data.getHours()
            var periodo = ''

            if(hora >= 0 && hora <= 5){
                periodo = 'Madrugada'
                
            }else if(hora >= 6 && hora <= 11){
                periodo = 'Manhã'
                
            }else if(hora >= 12 && hora <= 17){
                periodo = 'Tarde'

            }else if(hora >= 18 && hora <= 23){
                periodo = 'Noite'

            }

            setPeriodo(periodo)
        }
    
        lerDia()
        lerData()
        lerPeriodo()
    
      },[])

    return(
        <div className="infoDia">
            <div className="diaDataContainer">
                <h3>{dia}</h3>
                <h3>{data}</h3>
            </div>
            <div className="periodoContainer">
                <h2>{periodo}</h2>
            </div>
        </div>
    )
}