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
        <select className="input input-select" name="filter" onChange={e => handleFilter(editableInputTypes)} >
            <option value="none" selected>Toutes les plantes</option>
            <option value="cat">Plantes toxiques pour les chats</option>
            <option value="dog">Plantes toxiques pour les chiens</option>
            <option value="horse">Plantes toxiques pour les chevaux</option>
        </select>
    </div>
}

export default Search