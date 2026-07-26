function MetricGrid({ cards, label }) {
  return (
    <section className="metric-grid" aria-label={label}>
      {cards.map(({ label: cardLabel, value, icon: Icon }) => (
        <article className="metric-card" key={cardLabel}>
          {Icon && <Icon size={20} />}
          <strong>{value}</strong>
          <span>{cardLabel}</span>
        </article>
      ))}
    </section>
  );
}

export default MetricGrid;