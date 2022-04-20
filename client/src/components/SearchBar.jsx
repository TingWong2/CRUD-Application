import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar ({seachTerm, setSearchTerm}) {

return (
    <div>
    <Form className="d-flex">
    <FormControl
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
    value={seachTerm}
    onChange={(e)=>{setSearchTerm(e.target.value)}}
    />
    <Button variant="outline-success">Search</Button>
    </Form>
    
    </div>
)
}

export default SearchBar;