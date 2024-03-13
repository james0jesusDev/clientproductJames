import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Model, ModelBody, ModelFooter, ModelHeader } from 'reactstrap'
import { useState, useEffect } from 'react';



function App() {

    // ponemos la url del back
    const baseUrl = "https://localhost:44326/Products_DB";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);


}