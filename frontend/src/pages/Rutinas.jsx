import Layout from "../components/Layout/Layout";
import "../styles/rutinas.css";

function Rutinas() {
  const rutinas = [
    {
      id: 1,
      nombre: "Push Pull Legs",
      ejercicios: 5,
    },
    {
      id: 2,
      nombre: "Full Body",
      ejercicios: 7,
    },
    {
      id: 3,
      nombre: "Piernas",
      ejercicios: 6,
    },
  ];

  return (
    <Layout>
      <div className="rutinas-header">
        <h1>Mis rutinas</h1>

        <button className="create-btn">
          + Crear rutina
        </button>
      </div>

      <div className="table-container">
        <table className="rutinas-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ejercicios</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rutinas.map((rutina) => (
              <tr key={rutina.id}>
                <td>{rutina.nombre}</td>
                <td>{rutina.ejercicios}</td>

                <td>
                  <button className="edit-btn">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Rutinas;