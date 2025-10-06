<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="contenedor">
        <h1>Lista de Tareas</h1>
        <input type="text" id="nuevaTarea" placeholder="Nueva tarea...">
        <button id="btnAgregar">Agregar</button>

        <div id="listas">
            <div>
                <h2>Por Hacer</h2>
                <ul id="listaToDo" class="lista"></ul>
            </div>
            <div>
                <h2>En Progreso</h2>
                <ul id="listaDoing" class="lista"></ul>
            </div>
            <div>
                <h2>Completadas</h2>
                <ul id="listaDone" class="lista"></ul>
            </div>
        </div>
    </div>

    <script src="script.js" defer></script>
</body>
</html>

<script>
document.getElementById("btnAgregar").addEventListener("click", agregarTarea);
document.getElementById("nuevaTarea").addEventListener("keydown", function(e){
    if(e.key === "Enter") agregarTarea();
});

function agregarTarea() {
    const texto = document.getElementById("nuevaTarea").value.trim();
    if(texto === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = texto;

    // Crear botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => li.remove();

    li.appendChild(btnEliminar);

    // Agregar evento para mover tarea
    li.addEventListener("click", moverTarea);

    document.getElementById("listaToDo").appendChild(li);
    document.getElementById("nuevaTarea").value = "";
}

function moverTarea(e) {
    e.stopPropagation(); // Evita que se propague al botón eliminar
    const li = e.currentTarget;
    const parent = li.parentElement.id;

    if(parent === "listaToDo") {
        li.remove();
        document.getElementById("listaDoing").appendChild(li);
    } else if(parent === "listaDoing") {
        li.remove();
        li.querySelector("button").remove(); // quitar botón eliminar en Done
        document.getElementById("listaDone").appendChild(li);
    }
}
</script>
