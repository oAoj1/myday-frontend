import './Header.css'
import { WiDayLightWind } from 'react-icons/wi'

export default function Cabecalho(){

    const menuHeader = [
        'semana',
        'mes',
        'ano'
    ]

    return(
        <header>
            <div className="tituloHeader">
                <WiDayLightWind/>
                <h1>MyDay</h1>
            </div>
            <ul className="menuHeader">
                {menuHeader.map(opcoes => (
                    <li key={opcoes}>
                        <button>{opcoes}</button>
                    </li>
                ))}
            </ul>
        </header>
    )
}