import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState, useEffect } from 'react';

function App() {
    //const baseUrl = "https://localhost:44326/Products_DB";
    const baseUrl = "https://localhost:44326/Products_DB";
    const [data, setData] = useState([]);
    const [productSelected, setProductSelect] = useState({
        id: '',
        name: '',
        category: '',
        price: ''
    });
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const selecionarProduct = (product, caso) => {
        setProductSelect(product);
        caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    };

    const abrirCerrarModalEditar = () => setModalEditar(!modalEditar);
    const abrirCerrarModalEliminar = () => setModalEliminar(!modalEliminar);
    const abrirCerrarModalInsertar = () => setModalInsertar(!modalInsertar);

    const handleChange = e => {
        const { name, value } = e.target;
        setProductSelect({ ...productSelected, [name]: value });
    };

    const peticionPost = async () => {
        try {
            //añadir lo que dice el profe 
            delete productSelected.id;
            const response = await axios.post(baseUrl, productSelected);
            setData([...data, response.data]);
            abrirCerrarModalInsertar();
        } catch (error) {
            console.log(error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const peticionPut = async () => {
        try {
            const response = await axios.put(`${baseUrl}/${productSelected.id}`, productSelected);
            setData(data.map(p => p.id === productSelected.id ? response.data : p));
            abrirCerrarModalEditar();
        } catch (error) {
            console.log(error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const peticionDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/${productSelected.id}`);
            setData(data.filter(p => p.id !== productSelected.id));
            abrirCerrarModalEliminar();
        } catch (error) {
            console.log(error);
        }
    };

    const peticionGet = async () => {
        try {
            const response = await axios.get(baseUrl);
            setData(response.data);
          
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>Insertar new product</button>
            <table className="table table-sm table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td className="text-right">${Number(p.price).toFixed(2)}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarProduct(p, "Editar")}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => selecionarProduct(p, "Eliminar")}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insert Product</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Name</label><br />
                        <input type="text" className="form-control" name="name" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Category</label><br />
                        <input type="text" className="form-control" name="category" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Price</label><br />
                        <input type="text" className="form-control" name="price" onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={peticionPost}>Insert</button>
                    <button className="btn btn-primary" onClick={abrirCerrarModalInsertar}>Cancel</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Id</label>
                        <input type="text" readOnly className="form-control" value={productSelected.id} />
                        <label>Name</label><br />
                        <input type="text" className="form-control" name="name" onChange={handleChange} value={productSelected.name} />
                        <label>Category</label><br />
                        <input type="text" className="form-control" name="category" onChange={handleChange} value={productSelected.category} />
                        <label>Price</label><br />
                        <input type="text" className="form-control" name="price" onChange={handleChange} value={productSelected.price} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={peticionPut}>Submit</button>
                    <button className="btn btn-primary" onClick={abrirCerrarModalEditar}>Cancel</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalHeader>Delete Product</ModalHeader>
                <ModalBody>Are you sure you want to delete this product?</ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={peticionDelete}>Yes</button>
                    <button className="btn btn-primary" onClick={abrirCerrarModalEliminar}>No</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default App;
