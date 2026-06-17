const stats = [
  { value: '3+', label: 'Years building WordPress websites' },
  { value: '50+', label: 'Projects delivered across industries' },
  { value: '6s → <2s', label: 'Load-time improvement experience' },
  { value: 'WP + PHP', label: 'Custom development capability' }
];

export default function StatsBar() {
  return (
    <section className="stats-section" aria-label="Professional proof">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
