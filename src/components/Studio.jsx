import React, {useState, useEffect} from 'react'
import "./index.css"

const Studio = () => {
    const [people, setPerson] = useState([])
    const [filtroPerson, setFiltroPerson] = useState ([])
    const [busca, setBusca] = useState('')

    useEffect(()=>{
        fetch('https://ghibliapi.herokuapp.com/people/')
        .then(resposta => resposta.json())
        .then(dados => setPerson(dados))
        
    },[])

    function adicionaCurtida(id) {
        const listPeople = people.map(person => {
            return person.id === id ?
            {...person, favorit:!person.favorite}
            :person
        })
        setPerson(listPeople)        
    }

    useEffect(()=>{
        setFiltroPerson(
            people.filter(person => {
                return person.name.includes(busca)
            })
        )

    },[busca,people])

    return(
    <>
      <input placeholder="Digite um personagem" onChange={e=>{setBusca(e.target.value)}}/>
            {filtroPerson.map(person=> (
                <div key={person.id}>
                    <p>{person.name}</p>
                    {person.favorite && <span>Favorito</span>} 
                    <button onClick={()=>adicionaCurtida(person.id)}>Curtir❤️</button>
                </div>
            ))}
    </>
    )
}

export default Studio 