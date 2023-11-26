import { editableInputTypes } from "@testing-library/user-event/dist/utils"

const Search = ({setSearch, setFilter}) => {

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    return <div className="search">
        <input type="text" className="input input-text" name="search" placeholder="Rechercher..." onChange={e => handleSearch(e)} />
        <select className="input input-select" name="filter" onChange={e => handleFilter(e)} >
            <option value="" selected>Toutes les plantes</option>
            <option value="Chat">Plantes toxiques pour les chats</option>
            <option value="Chien">Plantes toxiques pour les chiens</option>
            <option value="Cheval">Plantes toxiques pour les chevaux</option>
        </select>
    </div>
}

export default Search