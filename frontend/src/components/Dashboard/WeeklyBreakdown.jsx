function WeeklyBreakdown({ days, averageSets }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Actividad</p>
          <h2>Esta semana</h2>
        </div>
        <span className="muted">{averageSets} series por sesión</span>
      </div>
      <div className="week-strip">
        {days.map(({ date, data }) => (
          <div className={`week-day ${data ? "is-active" : ""}`} key={date.toISOString()}>
            <span>{date.toLocaleDateString("es-AR", { weekday: "short" })}</span>
            <strong>{date.getDate()}</strong>
            <small>{data ? `${data.setCount} series` : "Descanso"}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeeklyBreakdown;
