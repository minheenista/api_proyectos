const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//srchivo JSON con los datos
const proyectos = require('./proyectos.json');
const tareas = require('./tareas.json');

// Obtener la lista de todos los proyectos (GET).
app.get('/proyectos/all/', (req, res) => {
    if (proyectos.data.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: 'Proyectos encontrados',
            proyectos: proyectos.data,
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'No se encontraron proyectos',
        })
    }
})

// Obtener un proyecto por su ID (GET).
app.get('/proyectos/:id', (req, res) => {
    const id = req.params.id;

    const proyecto = proyectos.data.find(proyecto => proyecto.id == id);

    if (proyecto) {
        res.status(200).json({
            estado: 1,
            mensaje: 'Proyecto encontrado',
            proyecto: proyecto,
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Proyecto no encontrado',
        })
    }
})

// Agregar un proyecto (POST).
app.post('/proyectos/', (req, res) => {
    const { title, description, inicio, final } = req.body;

    if (title == undefined || description == undefined || inicio == undefined || final == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'Datos incompletos',
        })
    } else {
        const id = proyectos.data.length + 1;

        const nuevoProyecto = {
            id: id,
            title: title,
            description: description,
            inicio: inicio,
            final: final,
        }

        proyectos.data.push(nuevoProyecto);

        if (proyectos.data.length > id - 1) {
            res.status(200).json({
                estado: 1,
                mensaje: 'Proyecto agregado',
                data: nuevoProyecto,
            })
        } else {
            res.status(500).json({
                estado: 0,
                mensaje: 'No se pudo agregar el proyecto, error de servidor',
            })
        }
    }
})

// Actualizar un proyecto por su ID (PUT).
app.put('/proyectos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, inicio, final } = req.body;

    if (title == undefined || description == undefined || inicio == undefined || final == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'Datos incompletos',
        })
    } else {
        const proyecto = proyectos.data.findIndex(proyecto => proyecto.id == id);

        if (proyecto >= 0) {
            proyectos.data[proyecto].title = title;
            proyectos.data[proyecto].description = description;
            proyectos.data[proyecto].inicio = inicio;
            proyectos.data[proyecto].final = final;
            res.status(200).json({
                estado: 1,
                mensaje: 'Proyecto actualizado correctamente',
                data: proyectos.data[proyecto],
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'Proyecto no encontrado',
            })
        }
    }


})

// Eliminar un proyecto por su ID (DELETE).
app.delete('/proyectos/:id', (req, res) => {
    const id = req.params.id;

    const proyectoIndex = proyectos.data.findIndex(proyecto => proyecto.id == id);

    if (proyectoIndex >= 0) {
        proyectos.data.splice(proyectoIndex, 1);
        res.status(200).json({
            estado: 1,
            mensaje: 'Proyecto eliminado correctamente',
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Proyecto no encontrado',
        })
    }
})


// Obtener la lista de todos las tareas (GET).
app.get('/proyectos/all/tareas/all', (req, res) => {
    if (tareas.data.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: 'Tareas encontradas',
            tareas: tareas.data,
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'No se encontraron tareas',
        })
    }
})

// Obtener una tarea por su ID (GET).
app.get('/proyectos/all/tareas/:id', (req, res) => {
    const id = req.params.id;

    const tarea = tareas.data.find(tarea => tarea.id == id);

    if (tarea) {
        res.status(200).json({
            estado: 1,
            mensaje: 'Tarea encontrada',
            tarea: tarea,
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Tarea no encontrada',
        })
    }
})

// Agregar una nueva tarea por su ID (POST).
app.post('/proyectos/all/tareas/', (req, res) => {
    const { idProyecto, titleTarea, descripcion, fecha, estado } = req.body;

    if (idProyecto == undefined || titleTarea == undefined || descripcion == undefined || fecha == undefined || estado == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'Datos incompletos',
        })
    } else {
        const id = tareas.data.length + 1;

        const nuevaTarea = {
            id: id,
            idProyecto: idProyecto,
            titleTarea: titleTarea,
            descripcion: descripcion,
            fecha: fecha,
            estado: estado,
        }

        tareas.data.push(nuevaTarea);
        if (tareas.data.length > id - 1) {
            res.status(200).json({
                estado: 1,
                mensaje: 'Tarea agregada',
                data: nuevaTarea,
            })
        } else {
            res.status(500).json({
                estado: 0,
                mensaje: 'No se pudo agregar la tarea, error de servidor',
            })
        }

    }
})


// Actualizar una tarea por su ID (PUT).
app.put('/proyectos/all/tareas/:id', (req, res) => {
    const id = req.params.id;
    const { idProyecto, titleTarea, descripcion, fecha, estado } = req.body;

    if (idProyecto == undefined || titleTarea == undefined || descripcion == undefined || fecha == undefined || estado == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'Rellena todos los campos',
        })
    } else {
        const tareaUpdate = tareas.data.findIndex(tarea => tarea.id == id);

        if (tareaUpdate) {
            tareas.data[tareaUpdate].idProyecto = idProyecto;
            tareas.data[tareaUpdate].titleTarea = titleTarea;
            tareas.data[tareaUpdate].descripcion = descripcion;
            tareas.data[tareaUpdate].fecha = fecha;
            tareas.data[tareaUpdate].estado = estado;
            res.status(200).json({
                estado: 1,
                mensaje: 'Tarea actualizada correctamente',
                data: tareas.data[tareaUpdate],
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'Tarea no encontrada',
            })
        }
    }
})
// Eliminar una tarea por su ID (DELETE).
app.delete('/proyectos/all/tareas/:id', (req, res) => {
    const id = req.params.id;

    const tareaIndex = tareas.data.findIndex(tarea => tarea.id == id);

    if (tareaIndex >= 0) {
        tareas.data.splice(tareaIndex, 1);
        res.status(200).json({
            estado: 1,
            mensaje: 'Tarea eliminada correctamente',
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Tarea no encontrada',
        })
    }
})

// Mostrar todas las tareas de un proyecto
app.get('/proyectos/:id/tareas/all', (req, res) => {
    const id = req.params.id;

    const proyecto = proyectos.data.find(proyecto => proyecto.id == id);

    if (proyecto) {
        const tareasProyecto = tareas.data.filter(tarea => tarea.idProyecto == id);
        if (tareasProyecto.length > 0) {
            res.status(200).json({
                estado: 1,
                mensaje: 'Tareas encontradas',
                tareas: tareasProyecto,
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'No se encontraron tareas',
            })
        }
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Proyecto no encontrado',
        })
    }
})
// Mostrar una tarea específica de un proyecto
app.get('/proyectos/:id/tareas/:idTarea', (req, res) => {
    const id = req.params.id;
    const idTarea = req.params.idTarea;

    const proyecto = proyectos.data.find(proyecto => proyecto.id == id);

    if (proyecto) {
        const tarea = tareas.data.find(tarea => tarea.idProyecto == id && tarea.id == idTarea);
        if (tarea) {
            res.status(200).json({
                estado: 1,
                mensaje: 'Tarea encontrada',
                tarea: tarea,
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'No se encontró la tarea',
            })
        }
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Proyecto no encontrado',
        })
    }
})
// Mostrar tareas de un proyecto por estado (Use Query String para el estado)
app.get('/proyectos/:id/tareas/', (req, res) => {
    const id = req.params.id;
    const estado = req.query.estado;

    const proyecto = proyectos.data.find(proyecto => proyecto.id == id);

    if (proyecto) {
        const tareasProyecto = tareas.data.filter(tarea => tarea.idProyecto == id && tarea.estado == estado);
        if (tareasProyecto.length > 0) {
            res.status(200).json({
                estado: 1,
                mensaje: 'Tareas encontradas',
                tareas: tareasProyecto,
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'No se encontraron tareas',
            })
        }
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Proyecto no encontrado',
        })
    }
})

// Mostrar todas las tareas de un proyecto paginadas (User Query String para especificar número de página y cuantos registros por página)
app.get("/proyecto/:id/tareas/registrosPorPagina/", (req, res) => {
    const idProyecto = req.params.id;
    const proyecto = proyectos.data.find((proyecto) => proyecto.id == idProyecto);

    const { pagina, registrosPorPagina } = req.query;
    const paginaActual = parseInt(pagina) || 1;
    const registrosPorPaginaActual = parseInt(registrosPorPagina) || 10;
    const startIndex = (paginaActual - 1) * registrosPorPaginaActual;
    const endIndex = startIndex + registrosPorPaginaActual;
    const tareasProyecto = tareas.data.filter((tarea) => tarea.idProyecto == idProyecto).slice(startIndex, endIndex);

    if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado",
            tareas: null,
        });
    } else if (!tareasProyecto || tareasProyecto.length == 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "El proyecto no tiene tareas",
            tareas: null
        });
    } else {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas del proyecto paginadas",
            tareas: tareasProyecto,
        });
    }
});

// Mostrar tareas de un proyecto por fecha de inicio
app.get("/proyectos/:id/tareasFecha", (req, res) => {
    const idProyecto = req.params.id;
    const { fechaInicio } = req.query;

    const proyecto = proyectos.data.find(proyecto => proyecto.id == idProyecto);

    const Tareas = tareas.data.filter(tarea => tarea.idProyecto == idProyecto && tarea.fecha == fechaInicio)

    if (fechaInicio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan datos en la solicitud",
            tareas: null,
        });
    } else if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado",
            tareas: null,
        });
    } else if (!Tareas || Tareas.length == 0) {
        res.status(200).json({
            estado: 1,
            proyecto: proyecto,
            mensaje: "El proyecto no tiene tareas para esta fecha",
            tareas: null,
        });
    } else if (Tareas && Tareas.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: Tareas,
        });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////
/* app.get("/proyectos/:id/tareas_por_fecha_inicio", (req, res) => {
    const id = req.params.id;
    const { fechaInicio } = req.query;

    const proyecto = proyectos.find((proyecto) => proyecto.id == id);

    const tareas = TareasArr.filter(tarea => tarea.id_proyecto == id && tarea.fechaAsig == fechaInicio)

    if (fechaInicio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan datos en la solicitud",
            tareas: null,
        });
    } else if (!proyecto) {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado",
            tareas: null,
        });
    } else if (!tareas || tareas.length == 0) {
        res.status(200).json({
            estado: 1,
            proyecto: proyecto,
            mensaje: "El proyecto no tiene tareas para esta fecha",
            tareas: null,
        });
    } else if (tareas && tareas.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: tareas,
            proyecto: proyecto,
        });
    }
});
 */

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});