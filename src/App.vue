<template>
  <div class="app">
    <h1>Lista de tareas</h1>

    <div class="input-container">
      <input
        v-model="nuevaTarea"
        @keydown.enter="agregarTarea"
        placeholder="Ingrese una nueva tarea"
      >
      <button @click="agregarTarea">Agregar Tarea</button>
    </div>

    <div class="task-container">
      <!-- To Do -->
      <div class="task-section to-do">
        <h2>To Do</h2>
        <ul>
          <li
            v-for="(tarea, index) in toDo"
            :key="index"
            class="task-item"
          >
            <span @click="moverTarea(tarea, 'toDo')">{{ tarea.texto }}</span>
          </li>
        </ul>
        <!-- Botón que aparece solo para la última tarea -->
        <button
          v-if="toDo.length > 0"
          class="btn-eliminar-seccion"
          @click="eliminarUltimaTarea('toDo')"
        >
          Eliminar última tarea
        </button>
      </div>

      <!-- Doing -->
      <div class="task-section doing">
        <h2>Doing</h2>
        <ul>
          <li
            v-for="(tarea, index) in doing"
            :key="index"
            class="task-item"
          >
            <span @click="moverTarea(tarea, 'doing')">{{ tarea.texto }}</span>
          </li>
        </ul>
        <button
          v-if="doing.length > 0"
          class="btn-eliminar-seccion"
          @click="eliminarUltimaTarea('doing')"
        >
          Eliminar última tarea
        </button>
      </div>

      <!-- Done -->
      <div class="task-section done">
        <h2>Done</h2>
        <ul>
          <li
            v-for="(tarea, index) in done"
            :key="index"
            class="task-item"
          >
            <span>{{ tarea.texto }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      nuevaTarea: "",
      toDo: [],
      doing: [],
      done: [],
    };
  },
  methods: {
    agregarTarea() {
      if (!this.nuevaTarea.trim()) {
        alert("Por favor, ingrese una tarea");
        return;
      }
      this.toDo.push({ texto: this.nuevaTarea });
      this.nuevaTarea = "";
    },
    moverTarea(tarea, desde) {
      if (desde === "toDo") {
        this.toDo = this.toDo.filter(t => t !== tarea);
        this.doing.push(tarea);
      } else if (desde === "doing") {
        this.doing = this.doing.filter(t => t !== tarea);
        this.done.push(tarea);
      }
    },
    eliminarUltimaTarea(seccion) {
      if (seccion === "toDo" && this.toDo.length > 0) {
        this.toDo.pop();
      } else if (seccion === "doing" && this.doing.length > 0) {
        this.doing.pop();
      }
    }
  }
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

.input-container input {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
}

.input-container button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: rgb(231, 91, 91);
  border: none;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #45a049;
}

.task-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.task-section {
  width: 30%;
  min-height: 200px;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 50px; /* espacio para el botón */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* para posicionar botón fuera del color */
}

.task-section h2 {
  color: rgb(14, 13, 13);
  margin-bottom: 10px;
}

.task-section ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.task-item {
  background-color: #000000;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  display: block;
  width: calc(100% - 20px);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Botón centrado abajo de la columna, fuera del color */
.btn-eliminar-seccion {
  position: absolute;
  bottom: -30px; /* debajo de la columna */
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}

.btn-eliminar-seccion:hover {
  background-color: #e60000;
}

/* Colores de cada sección */
.to-do { background-color: #f28b82; }   /* Rojo */
.doing { background-color: #aecbfa; }  /* Azul */
.done { background-color: #81c995; }   /* Verde */
</style>
