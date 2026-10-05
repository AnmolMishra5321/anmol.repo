document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  renderChart();
});

function loadStats() {
  const tasks = JSON.parse(localStorage.getItem('studyhub_tasks')) || [];
  const focusMinutes = localStorage.getItem('studyhub_focus_time') || 0;
  const streak = localStorage.getItem('studyhub_streak') || 0;

  const completedTasksCount = tasks.filter(task => task.completed).length;

  document.getElementById('tasks-done-count').innerText = completedTasksCount;
  document.getElementById('focus-time-count').innerText = `${focusMinutes} mins`;
  document.getElementById('streak-count').innerText = `${streak} Days`;
}

function renderChart() {
  const ctx = document.getElementById('weeklyProgressChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Focus Hours',
        data: [2.5, 4.0, 3.0, 5.5, 2.0, 1.5, 4.2],
        backgroundColor: '#4f46e5',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: v => v + ' hrs' }
        }
      }
    }
  });
}