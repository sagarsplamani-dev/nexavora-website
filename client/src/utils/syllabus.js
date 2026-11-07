const analyticsModules = [
  ['Introduction to Data Analytics', 'Analytics lifecycle, data types, business questions, and analyst workflow.', '1 week'],
  ['Excel for Data Analysis', 'Formulas, lookup functions, pivot tables, charts, and reporting.', '2 weeks'],
  ['SQL & Database Management', 'Queries, joins, aggregation, subqueries, and database concepts.', '2 weeks'],
  ['Python Programming', 'Python syntax, control flow, functions, and data structures.', '2 weeks'],
  ['NumPy & Pandas', 'Arrays, DataFrames, indexing, transformations, and analysis.', '2 weeks'],
  ['Data Cleaning & Preparation', 'Missing values, duplicates, data types, outliers, and repeatable cleaning.', '1 week'],
  ['Exploratory Data Analysis', 'Summary analysis, distributions, relationships, and hypothesis exploration.', '1 week'],
  ['Statistics & Probability', 'Descriptive statistics, probability, sampling, and testing basics.', '2 weeks'],
  ['Data Visualization', 'Chart selection, visual hierarchy, dashboards, and storytelling.', '1 week'],
  ['Power BI', 'Data import, Power Query, relationships, measures, and reports.', '2 weeks'],
  ['Tableau', 'Connect data, build visualizations, and publish dashboards.', '1 week'],
  ['Machine Learning Fundamentals', 'Regression, classification, training data, and evaluation basics.', '2 weeks'],
  ['Capstone Projects', 'Apply the course workflow to practical sample scenarios.', '2 weeks'],
  ['Interview Preparation', 'Portfolio walkthroughs, technical topics, and practice interviews.', '1 week'],
];

const dataScienceModules = [
  ['Python, NumPy & Pandas', 'Python for Data Science, NumPy arrays, Pandas DataFrames, cleaning, preprocessing, EDA, and visualization.', '3 weeks'],
  ['SQL & Database Management', 'Relational database fundamentals, SQL queries, joins, aggregates, CTEs, window functions, and Python connectivity.', '3 weeks'],
  ['Machine Learning', 'Supervised and unsupervised learning, regression, classification, clustering, feature engineering, and evaluation.', '3 weeks'],
  ['Natural Language Processing', 'Text preprocessing, tokenization, text classification, and sentiment analysis workflows.', '2 weeks'],
  ['Deep Learning', 'Neural networks, artificial neural networks, and the foundations of deep-learning workflows.', '2 weeks'],
  ['Computer Vision', 'Image data fundamentals, image preprocessing, classification concepts, and practical vision workflows.', '2 weeks'],
  ['Generative AI & Agentic AI', 'LLM concepts, prompt design, RAG, tool use, agent workflows, and responsible AI applications.', '3 weeks'],
  ['Projects, Git & Career Readiness', 'Applied projects, Git, GitHub, GitLab, portfolio walkthroughs, and technical interview preparation.', '2 weeks'],
];

async function createSyllabusPdf(title, modules, filename) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = 22;
  pdf.setFillColor(12, 12, 12); pdf.rect(0, 0, 210, 45, 'F');
  pdf.setTextColor(255, 105, 0); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10); pdf.text('NEXAVORA TECHNOLOGIES LLP  /  COURSE GUIDE', 16, 16);
  pdf.setTextColor(255, 255, 255); pdf.setFontSize(22); pdf.text(title, 16, 29);
  pdf.setTextColor(210, 210, 210); pdf.setFontSize(10); pdf.text('Course curriculum and learning modules', 16, 37);
  y = 58;
  modules.forEach(([title, description, duration], index) => {
    const lines = pdf.splitTextToSize(description, 144); const height = 17 + lines.length * 5;
    if (y + height > pageHeight - 22) { pdf.addPage(); y = 20; }
    pdf.setDrawColor(225, 225, 225); pdf.line(16, y + height, 194, y + height);
    pdf.setTextColor(255, 105, 0); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.text(String(index + 1).padStart(2, '0'), 16, y + 5);
    pdf.setTextColor(25, 25, 25); pdf.setFontSize(11); pdf.text(title, 28, y + 5);
    pdf.setTextColor(100, 100, 100); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.text(lines, 28, y + 11); pdf.text(duration, 193, y + 5, { align: 'right' });
    y += height + 5;
  });
  pdf.setTextColor(120, 120, 120); pdf.setFontSize(8); pdf.text('Module durations are estimates and may vary by learning schedule.', 16, pageHeight - 12);
  pdf.save(filename);
}

export function downloadSyllabus() {
  return createSyllabusPdf('Data Analytics', analyticsModules, 'nexavora-data-analytics-syllabus.pdf');
}

export function downloadDataScienceSyllabus() {
  return createSyllabusPdf('Data Science', dataScienceModules, 'nexavora-data-science-syllabus.pdf');
}