import React, { useState, useEffect } from 'react'
import { DBstore } from '../firebaseconf'
function Formulario() {

    const [id,setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    const [usuarios, setUsuarios] = useState([])
    const [modoEdicion,setModoEdicion] = useState(false)

    const limpiarDatos = () => {
        setNombre('')
        setPhone('')
        setId('')
        setModoEdicion(false)
    }
    const crearUsuario = async (e) => {
        e.preventDefault()
        if (!nombre.trim() || !phone.trim()) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            const usuario = {
                nombre: nombre,
                telefono: phone
            }
            try {
                const data = await DBstore.collection('agenda').add(usuario)
                alert("usuario agregado")
                getUsuarios()
                limpiarDatos()
            } catch (error) {
                console.error(error)
            }
        }
        // if (!phone.trim()) {
        //     setError("El campo telefono esta vacio")
        // }
        //introducir datos a la dbstore de firebase 
    }
    const getUsuarios = async ()=>{ 
        try {
            const {docs} = await DBstore.collection('agenda').get()
            const arrayUsuarios= docs.map(item=>({id:item.id,...item.data()}))
            setUsuarios(arrayUsuarios)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUsuarios()
    },[])

    const eliminarUsuario = async (id)=>{
        try {
            await DBstore.collection('agenda').doc(id).delete()
            getUsuarios()
        } catch (error) {
            console.error(error)
        }
    }

    const editarUsuario = async (id)=>{
        setModoEdicion(true)
        try {
            const data = await DBstore.collection('agenda').doc(id).get()
            setNombre(data.data().nombre)
            setPhone(data.data().telefono)
            setId(id)
        } catch (error) {
            console.error(error)
        }
    }
    const editarUsuarioR = async (e)=>{
        e.preventDefault()
        if (!nombre.trim() || !phone.trim()) {
            setError("Complete los campos vacios")
        } else {
            setError(null)
            const usuarioActualizado = {
                nombre: nombre,
                telefono: phone
            }
            try {
                await DBstore.collection('agenda').doc(id).set(usuarioActualizado)
                alert("Usuario Actualizado")
                getUsuarios()
            } catch (error) {
                console.error(error)
            }
            limpiarDatos()
        }
    }



    return (
        <div className="container  ">
            <div className="row mx-auto mt-5 m-5 login-container" style={{ width: 700 }}>
                <div className="col">
                    <h2 className="text-center">Formulario</h2>
                    <form onSubmit={(e)=>{modoEdicion ? editarUsuarioR(e) : crearUsuario(e)}} className="form-group" >
                        <label>Nombre</label>
                        <input onChange={(e) => { setNombre(e.target.value) }} className="form-control" type="text" value={nombre} />
                        <label className="mt-3" >Telefono</label>
                        <input onChange={(e) => { setPhone(e.target.value) }} className="form-control " type="phone" value={phone} />
                        <input className="btn btn-primary mt-3 btn-block" type="submit" value= {modoEdicion ? 'Editar Contacto' : 'Registrar Contacto'} />   
                    </form>
                    {
                        error !== null ?
                            (<div className="alert alert-danger" role="alert">{error}</div>)
                            :
                            (<div></div>)
                    }
                </div>
                <div className="col">
                    <h2 className="text-center">Lista de Agenda</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                usuarios.length !==0 ?
                                (
                                            usuarios.map(item =>
                                                <tr key={item.id}>
                                                    <th scope="row">{item.nombre} </th>
                                                    <td>{item.telefono} </td>
                                                    <td> <button className="btn btn-success" onClick={()=>{editarUsuario(item.id)}} >Editar</button></td>
                                                    <td> <button className="btn btn-danger" onClick={()=>{eliminarUsuario(item.id)}} >Eliminar</button></td>
                                                </tr>

                                            )
                                )
                                :
                                (
                                    <div className='alert alert-danger' role='alert'>No hay contactos</div>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Formulario
