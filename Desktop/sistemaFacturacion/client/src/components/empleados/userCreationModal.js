// src/components/empleados/UserCreationModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createUser } from '../../services/userService';
import { getAllRoles } from '../../services/roleService';
import { createError } from '../../services/errorService'; // Importa el servicio de errores

const noti = withReactContent(Swal);

const UserCreationModal = ({ show, handleClose, onUserCreated }) => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [idRol, setIdRol] = useState('');
    const [roles, setRoles] = useState([]);

    // Efecto para cargar los roles cuando el modal se muestra
    useEffect(() => {
        if (show) {
            const fetchRoles = async () => {
                try {
                    const rolesData = await getAllRoles();
                    setRoles(rolesData);
                    if (rolesData.length > 0 && !idRol) {
                        setIdRol(rolesData[0].id_rol);
                    }
                } catch (error) {
                    console.error("Error al cargar los roles:", error);
                    noti.fire({
                        icon: 'error',
                        title: 'Error de Carga',
                        text: 'No se pudieron cargar los roles. Inténtalo de nuevo.',
                    });
                    // *** CAPTURA Y REPORTE DE ERROR ***
                    createError({
                        mensajeError: "Error al cargar roles en modal de creación de usuario",
                        detalleError: error.message,
                        pantallaOrigen: "UserCreationModal",
                        eventoOrigen: "fetchRoles"
                    });
                }
            };
            fetchRoles();
        }
    }, [show, idRol]);

    const handleCreateUser = async () => {
        if (!correoElectronico || !password || !idRol) {
            noti.fire({
                icon: 'warning',
                title: 'Campos Incompletos',
                text: 'Por favor, rellena el correo electrónico, la contraseña y selecciona un rol.',
            });
            return;
        }

        try {
            const newUser = await createUser({
                correo_electronico: correoElectronico,
                password_hash: password,
                id_rol: parseInt(idRol, 10),
                habilitado: true,
                failed_login_attempts: 0,
            });

            noti.fire({
                title: 'Usuario Creado',
                html: `El usuario <strong>${newUser.correo_electronico}</strong> ha sido creado con ID: <strong>${newUser.id_usuario}</strong>`,
                icon: 'success',
            });

            onUserCreated(newUser.id_usuario);
            handleClose();

            setCorreoElectronico('');
            setPassword('');
            setIdRol('');
        } catch (error) {
            console.error('Error al crear usuario:', error.response?.data?.message || error.message);
            noti.fire({
                icon: 'error',
                title: 'Error al Crear Usuario',
                text: error.response?.data?.message || 'Hubo un problema al crear el usuario.',
            });
            // *** CAPTURA Y REPORTE DE ERROR ***
            createError({
                mensajeError: error.response?.data?.message || 'Error al crear usuario',
                detalleError: error.stack,
                pantallaOrigen: "UserCreationModal",
                eventoOrigen: "handleCreateUser"
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico:</Form.Label>
                        <Form.Control
                            type="email"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            placeholder="Ingrese el correo electrónico"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese la contraseña"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar Rol:</Form.Label>
                        <Form.Select
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un rol...</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.nombre_rol}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            El rol determina los permisos del usuario.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreateUser}>
                    Crear Usuario
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserCreationModal;
