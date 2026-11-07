import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  Eye,
  GitBranch,
  Layers3,
  LineChart,
  MessageSquareText,
  Network,
  Download,
  Laptop,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';
import { downloadDataScienceSyllabus } from '../utils/syllabus';

const ecosystemNodes = [
  ['Machine Learning', 'ML', LineChart, 'node-ml'],
  ['Artificial Intelligence', 'AI', BrainCircuit, 'node-ai'],
  ['Natural Language Processing', 'NLP', MessageSquareText, 'node-nlp'],
  ['Deep Learning', 'DL', Layers3, 'node-dl'],
  ['Computer Vision', 'CV', Eye, 'node-cv'],
  ['Generative AI', 'GenAI', Sparkles, 'node-genai'],
  ['Agentic AI', 'Agents', Network, 'node-agentic'],
];

function EcosystemHero() {
  const [selectedNode, setSelectedNode] = useState(ecosystemNodes[0]);
  const SelectedIcon = selectedNode[2];

  return (
    <div className="ds-ecosystem-hero">
      <div className="ds-ecosystem-hero-heading">
        <span className="eyebrow">NEXAVORA AI ECOSYSTEM</span>
        <h2>
          One ecosystem. <em>Infinite possibilities.</em>
        </h2>
        <p>Explore the technologies that connect our Data Science curriculum to practical, intelligent products.</p>
      </div>
      <div className="ds-ecosystem-hero-layout">
        <div className="ds-ecosystem-map" aria-label="Interactive Nexavora AI technology ecosystem">
          <div className="ds-ecosystem-glow" />
          <div className="ds-ecosystem-ring ds-ecosystem-ring-one" />
          <div className="ds-ecosystem-ring ds-ecosystem-ring-two" />
          <div className="ds-ecosystem-ring ds-ecosystem-ring-three" />
          <div className="ds-ecosystem-lines" aria-hidden="true">
            {ecosystemNodes.map((node) => <span className={`connection ${node[3]}`} key={node[0]} />)}
          </div>
          <div className="ds-ecosystem-core">
            <BrainCircuit aria-hidden="true" />
            <strong>NEXAVORA</strong>
            <span>AI ECOSYSTEM</span>
          </div>
          {ecosystemNodes.map(([name, shortName, Icon, position]) => (
            <button
              className={`ds-ecosystem-node ${position}${selectedNode[0] === name ? ' is-selected' : ''}`}
              key={name}
              type="button"
              aria-pressed={selectedNode[0] === name}
              onClick={() => setSelectedNode([name, shortName, Icon, position])}
            >
              <Icon aria-hidden="true" />
              <span>{shortName}</span>
              <b>{name}</b>
            </button>
          ))}
        </div>
        <article className="ds-ecosystem-detail" aria-live="polite">
          <span className="ds-ecosystem-detail-label">ACTIVE TECHNOLOGY / 0{ecosystemNodes.findIndex((node) => node[0] === selectedNode[0]) + 1}</span>
          <SelectedIcon aria-hidden="true" />
          <h3>{selectedNode[0]}</h3>
          <p>Build practical capability with {selectedNode[0]} through guided projects and applied learning.</p>
          <div>
            <small>APPLICATIONS &amp; SERVICES</small>
            <strong>Intelligent products · Automation · Business solutions</strong>
          </div>
        </article>
      </div>
    </div>
  );
}

const curriculum = [
  {
    title: 'Python, NumPy & Pandas',
    summary:
      'Use Python to explore, clean, transform, and communicate insights from structured data.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Jupyter'],
    topics: [
      'Python for Data Science',
      'NumPy arrays and operations',
      'Pandas Series and DataFrames',
      'Data Cleaning',
      'Data Manipulation',
      'Data Preprocessing',
      'Exploratory Data Analysis (EDA)',
      'Data Visualization',
    ],
    outcome:
      'Prepare analysis-ready datasets and build a repeatable exploratory analysis workflow.',
    Icon: Code2,
  },
  {
    title: 'SQL & Database Management',
    summary:
      'Learn how SQL is used to retrieve, filter, join, manage, and analyze data held in relational databases.',
    technologies: ['SQL', 'Relational databases', 'Python database connectors'],
    topics: [
      'Introduction to SQL and Relational Databases',
      'Database Fundamentals',
      'SQL Syntax and Data Types',
      'DDL, DML and DQL Commands',
      'SELECT Queries',
      'WHERE, ORDER BY and GROUP BY',
      'Aggregate Functions',
      'SQL Joins: INNER, LEFT, RIGHT and FULL',
      'Subqueries',
      'Common Table Expressions (CTEs)',
      'Window Functions',
      'INSERT, UPDATE and DELETE',
      'Primary Keys and Foreign Keys',
      'Data Filtering and Sorting',
      'Extracting and Analyzing Data Using SQL',
      'Connecting SQL Databases with Python',
    ],
    outcome:
      'Query related tables, shape analytical datasets, and connect database results to Python workflows.',
    Icon: Database,
  },
  {
    title: 'Machine Learning',
    summary:
      'Build a practical understanding of learning algorithms, training workflows, evaluation, and iteration.',
    technologies: ['Scikit-learn (Sklearn)', 'Python', 'Pandas', 'NumPy'],
    topics: [
      'Machine Learning Fundamentals',
      'Supervised Learning',
      'Unsupervised Learning',
      'Regression Algorithms',
      'Classification Algorithms',
      'Clustering Algorithms',
      'Model Training',
      'Model Evaluation',
      'Feature Engineering',
      'Model Optimization',
    ],
    outcome:
      'Train and evaluate baseline models, select useful features, and explain model behavior.',
    Icon: LineChart,
  },
  {
    title: 'Natural Language Processing',
    summary:
      'Prepare text data and introduce common approaches for extracting meaning from language.',
    technologies: ['NLP', 'Python', 'Text-processing libraries'],
    topics: [
      'Natural Language Processing (NLP)',
      'Text Preprocessing',
      'Tokenization',
      'Text Classification',
      'Sentiment Analysis',
    ],
    outcome: 'Build a text-analysis workflow and evaluate a simple text classification task.',
    Icon: MessageSquareText,
  },
  {
    title: 'Deep Learning',
    summary:
      'Explore the building blocks of neural-network-based approaches and their common terminology.',
    technologies: ['Deep Learning (DL)', 'Neural Networks', 'Artificial Neural Networks'],
    topics: [
      'Deep Learning (DL)',
      'Neural Networks',
      'Artificial Neural Networks',
      'Deep Learning Fundamentals',
    ],
    outcome: 'Describe a neural network and identify the stages in a basic deep-learning workflow.',
    Icon: BrainCircuit,
  },
  {
    title: 'Computer Vision',
    summary: 'Work with image data and understand foundational computer vision tasks.',
    technologies: ['Computer Vision (CV)', 'Image processing', 'Python'],
    topics: [
      'Computer Vision (CV)',
      'Image Processing',
      'Image Classification',
      'Object Detection',
    ],
    outcome: 'Prepare image data and compare classification and object-detection use cases.',
    Icon: Eye,
  },
  {
    title: 'Generative AI & Agentic AI',
    summary:
      'Understand language-model applications, retrieval grounding, and agent workflow concepts.',
    technologies: ['Generative AI (GenAI)', 'Large Language Models (LLMs)', 'RAG', 'AI agents'],
    topics: [
      'Generative AI (GenAI)',
      'Large Language Models (LLMs)',
      'Prompt Engineering',
      'Retrieval-Augmented Generation (RAG)',
      'AI Applications',
      'Agentic AI',
      'AI Agents',
      'Agent Workflows',
      'AI Automation',
    ],
    outcome: 'Prototype a grounded AI application and map the steps in a bounded agent workflow.',
    Icon: Network,
  },
  {
    title: 'Git, GitHub & GitLab',
    summary: 'Organize code changes and collaborate with a version-controlled project workflow.',
    technologies: ['Git', 'GitHub', 'GitLab'],
    topics: ['GitHub', 'GitLab', 'Git', 'Version Control', 'Project Collaboration'],
    outcome:
      'Track project changes and collaborate using branches, commits, and shared repositories.',
    Icon: GitBranch,
  },
];

const roadmap = [
  ['01', 'Prepare data', 'Python, SQL, cleaning, and preprocessing'],
  ['02', 'Explore patterns', 'Pandas, statistics, EDA, and visual analysis'],
  ['03', 'Build models', 'Features, machine learning, and evaluation'],
  ['04', 'Work with unstructured data', 'NLP, deep learning, and computer vision'],
  ['05', 'Create AI applications', 'LLMs, RAG, and agent workflows'],
  ['06', 'Share your work', 'Projects, Git, GitHub, and GitLab'],
];

const projects = [
  [
    'SQL-Based Data Analysis',
    'Design analytical queries on a sample relational dataset and explain the findings.',
    'SQL · CTEs · Window Functions · Python',
    'Retrieve, join, aggregate, and validate data for analysis.',
  ],
  [
    'Exploratory Data Analysis',
    'Investigate a public or sample dataset, document data quality, and communicate patterns.',
    'Python · Pandas · NumPy · Visualization',
    'Build an end-to-end EDA notebook with clear charts.',
  ],
  [
    'Sales Prediction Using Machine Learning',
    'Create a learning exercise for predicting a target from historical sample sales data.',
    'Python · Pandas · Scikit-learn',
    'Compare a baseline model with an evaluated regression workflow.',
  ],
  [
    'Customer Churn Prediction',
    'Explore a sample customer dataset and evaluate a classification approach.',
    'SQL · Python · Scikit-learn',
    'Use joined data, feature preparation, and model metrics.',
  ],
  [
    'Sentiment Analysis',
    'Classify sample text and review the effect of text preprocessing.',
    'Python · NLP · Scikit-learn',
    'Prepare text and assess a text-classification baseline.',
  ],
  [
    'Image Classification',
    'Build an introductory image-classification exercise with a labeled sample dataset.',
    'Python · Deep Learning',
    'Understand image preprocessing and classification evaluation.',
  ],
  [
    'Object Detection',
    'Explore detection concepts and evaluate predictions on sample images.',
    'Python · Computer Vision',
    'Compare image classification and object detection outputs.',
  ],
  [
    'Generative AI Chatbot',
    'Prototype a course-domain chatbot and assess its responses against sample questions.',
    'LLMs · Prompt Engineering',
    'Structure prompts and review response quality.',
  ],
  [
    'Retrieval-Augmented Generation App',
    'Connect a small document collection to an LLM-based question-answering workflow.',
    'Python · Embeddings · RAG',
    'Ground answers in retrieved context and inspect failure cases.',
  ],
  [
    'Agentic AI Automation',
    'Map a bounded multi-step workflow and add clear human review points.',
    'Agentic AI · Tool Workflows',
    'Design and evaluate a constrained automation flow.',
  ],
];

const roles = [
  ['Data Scientist', 'Explore data, test hypotheses, and develop predictive models.', Activity],
  ['Data Analyst', 'Query, analyze, and communicate useful business patterns.', LineChart],
  ['Machine Learning Engineer', 'Develop and evaluate machine-learning workflows.', BrainCircuit],
  ['AI Engineer', 'Build applications that use machine-learning capabilities.', Network],
  ['NLP Engineer', 'Work on language-processing and text-understanding tasks.', MessageSquareText],
  ['Deep Learning Engineer', 'Develop neural-network-based solutions for data tasks.', Layers3],
  ['Computer Vision Engineer', 'Build image and video analysis workflows.', Eye],
  ['Generative AI Developer', 'Prototype LLM-powered tools and retrieval applications.', Sparkles],
  ['AI Agent Developer', 'Design bounded agent workflows and automation.', GitBranch],
];

const faqItems = [
  [
    'What does the Data Science course cover?',
    'The curriculum is organized into Python data processing, SQL and databases, machine learning, NLP, deep learning, computer vision, Generative AI, Agentic AI, and version control.',
  ],
  [
    'Is SQL a dedicated part of the curriculum?',
    'Yes. SQL is a full module covering database fundamentals, querying, filtering, joins, aggregates, subqueries, CTEs, window functions, data changes, and connecting SQL with Python.',
  ],
  [
    'Do I need prior programming experience?',
    'Ask the course team about prerequisites and the current starting level before enrollment.',
  ],
  [
    'Are practical projects included?',
    'The site lists illustrative project exercises. The course team can confirm which projects and datasets are part of the current delivery.',
  ],
  [
    'Is an internship included?',
    'Internship availability, structure, duration, and eligibility must be confirmed by Nexavora before enrollment. No internship placement is promised here.',
  ],
  [
    'What does certification mean?',
    'Course completion and certificate issuance requirements should be confirmed with Nexavora before enrollment.',
  ],
  [
    'Does the course guarantee a job?',
    'No. Career support may include interview preparation, resume guidance, and job-search guidance, but employment outcomes are not guaranteed.',
  ],
];

function CurriculumCard({ module, index }) {
  const { title, summary, technologies, topics, outcome, Icon } = module;
  return (
    <details className="ds-module-card" open={index === 1}>
      <summary>
        <span className="ds-module-icon">
          <Icon size={22} />
        </span>
        <span className="ds-module-title">
          <small>MODULE {String(index + 1).padStart(2, '0')}</small>
          <b>{title}</b>
        </span>
        <span className="ds-module-toggle">+</span>
      </summary>
      <div className="ds-module-body">
        <p>{summary}</p>
        <h4>Topics covered</h4>
        <ul className="ds-topic-list">
          {topics.map((topic) => (
            <li key={topic}>
              <Check size={14} />
              {topic}
            </li>
          ))}
        </ul>
        <h4>Technologies</h4>
        <div className="ds-tech-list">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <p className="ds-outcome">
          <BookOpenCheck size={17} />
          <span>
            <b>Learning outcome</b>
            {outcome}
          </span>
        </p>
      </div>
    </details>
  );
}

export default function DataScienceSection() {
  return (
    <div className="ds-course">
      <section className="ds-hero" id="data-science">
        <div className="ds-hero-copy">
          <span className="eyebrow">
            <i /> NEXAVORA TECHNOLOGIES LLP · DHARWAD
          </span>
          <h1>
            Data Science &amp; Analytics Course in Dharwad with Internship, Certification &amp;
            Placement
          </h1>
          <p>
            Build practical skills to turn data into clear, confident decisions.
          </p>
          <ul className="hero-features">
            <li>
              <span>
                <Laptop />
              </span>
              <b>Immersive learning experience with state-of-the-art facilities.</b>
            </li>
            <li>
              <span>
                <BarChart3 />
              </span>
              <b>In-demand skills for a thriving data analytics career.</b>
            </li>
            <li>
              <span>
                <Users />
              </span>
              <b>Expert-led training with flexible schedules to accommodate everyone.</b>
            </li>
          </ul>
          <div className="ds-hero-actions">
            <a className="button primary" href="tel:9686712017">
              <Phone size={17} /> Call Us
            </a>
            <button className="button outline" onClick={downloadDataScienceSyllabus}>
              <Download size={17} /> Download Syllabus
            </button>
          </div>
          <small className="ds-disclaimer">
            Internship, certification, and course details are confirmed by the company before
            enrollment. No job outcome is guaranteed.
          </small>
        </div>
        <EcosystemHero />
      </section>

      <section className="ds-introduction" id="ds-intro">
        <div>
          <span className="eyebrow">A PRACTICAL LEARNING PATH</span>
          <h2>
            From raw data to <em>working applications.</em>
          </h2>
        </div>
        <p>
          The Data Science offering is separate from the Data Analytics course below. It brings data
          preparation, relational querying, modeling, language and image workflows, and AI
          application concepts into one navigable curriculum. Confirm current schedule, fees,
          delivery format, prerequisites, and internship details with Nexavora before enrollment.
        </p>
      </section>

      <section className="ds-why" id="ds-why-learn">
        <div className="ds-section-heading">
          <span className="eyebrow">WHY LEARN DATA SCIENCE</span>
          <h2>
            Build a toolkit for <em>data-driven work.</em>
          </h2>
          <p>
            Develop foundations, practice project workflows, and learn how to explain your
            decisions.
          </p>
        </div>
        <div className="ds-why-grid">
          <article>
            <Database />
            <b>Work with structured data</b>
            <p>Use SQL and Python to retrieve, prepare, and inspect information.</p>
          </article>
          <article>
            <Activity />
            <b>Evaluate analytical models</b>
            <p>Compare approaches with appropriate validation and evaluation measures.</p>
          </article>
          <article>
            <BrainCircuit />
            <b>Explore modern AI</b>
            <p>Study NLP, computer vision, LLM, RAG, and agent workflow concepts.</p>
          </article>
          <article>
            <GitBranch />
            <b>Collaborate on projects</b>
            <p>Use Git, GitHub, and GitLab concepts to track project changes.</p>
          </article>
        </div>
      </section>

      <section className="ds-roadmap" id="ds-roadmap">
        <div className="ds-section-heading centered">
          <span className="eyebrow">THE LEARNING ROADMAP</span>
          <h2>
            Progress from foundations <em>to applied work.</em>
          </h2>
        </div>
        <div className="ds-roadmap-grid">
          {roadmap.map(([number, title, description]) => (
            <article key={number}>
              <small>{number}</small>
              <b>{title}</b>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-curriculum" id="ds-curriculum">
        <div className="ds-section-heading">
          <span className="eyebrow">COMPLETE DATA SCIENCE CURRICULUM</span>
          <h2>
            Eight focused <em>learning modules.</em>
          </h2>
          <p>Expand a module to review its topics, technologies, and practical learning outcome.</p>
        </div>
        <div className="ds-module-grid">
          {curriculum.map((module, index) => (
            <CurriculumCard module={module} index={index} key={module.title} />
          ))}
        </div>
      </section>

      <section className="ds-skills" id="ds-skills">
        <div className="ds-section-heading">
          <span className="eyebrow">SKILLS YOU WILL LEARN</span>
          <h2>
            Technologies for a <em>complete workflow.</em>
          </h2>
          <p>
            Build familiarity with data tools, modeling approaches, AI concepts, and collaborative
            development practices.
          </p>
        </div>
        <div className="ds-skill-grid">
          {curriculum.map(({ title, technologies, Icon }) => (
            <article key={title}>
              <Icon />
              <b>{title}</b>
              <p>{technologies.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-project-section" id="ds-projects">
        <div className="ds-section-heading">
          <span className="eyebrow">PRACTICE PORTFOLIO</span>
          <h2>
            Project ideas for <em>hands-on learning.</em>
          </h2>
          <p>
            Examples are illustrative. Ask Nexavora which projects, tools, and datasets are included
            in the current course delivery.
          </p>
        </div>
        <div className="ds-project-grid">
          {projects.map(([title, description, tools, outcome], index) => (
            <article key={title}>
              <span className="ds-project-number">
                PROJECT / {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <small>{tools}</small>
              <div>
                <Check size={14} />
                {outcome}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-support" id="ds-support">
        <div className="ds-section-heading centered">
          <span className="eyebrow">LEARNING AND CAREER SUPPORT</span>
          <h2>
            Internship. Certification. <em>Career guidance.</em>
          </h2>
        </div>
        <div className="ds-support-grid">
          <article id="ds-internship">
            <span>01</span>
            <BriefcaseBusiness />
            <h3>Internship opportunities</h3>
            <p>
              Project-based practice is reflected in the curriculum. Internship availability,
              eligibility, duration, supervision, and deliverables are confirmed by Nexavora before
              enrollment.
            </p>
          </article>
          <article id="ds-certification">
            <span>02</span>
            <BookOpenCheck />
            <h3>Certification information</h3>
            <p>
              Ask Nexavora for the course completion criteria, certificate issuer, and any
              assessment requirements that apply to the current program.
            </p>
          </article>
          <article id="ds-placement">
            <span>03</span>
            <ArrowRight />
            <h3>Placement assistance</h3>
            <p>
              Enquire about resume guidance, interview practice, career counseling, and job
              application support. Assistance is not a job or placement guarantee.
            </p>
          </article>
        </div>
      </section>

      <section className="ds-careers" id="ds-careers">
        <div className="ds-section-heading">
          <span className="eyebrow">CAREER OPPORTUNITIES</span>
          <h2>
            Explore data and <em>AI job roles.</em>
          </h2>
          <p>Role responsibilities vary by employer, experience, and specialization.</p>
        </div>
        <div className="ds-role-grid">
          {roles.map(([title, description, Icon]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-method" id="ds-method">
        <div>
          <span className="eyebrow">TRAINING METHODOLOGY</span>
          <h2>
            Learn, apply, <em>review, improve.</em>
          </h2>
          <p>
            Course delivery and available support depend on the selected schedule. Ask the team to
            explain how lessons, exercises, project reviews, and assessments are arranged before
            enrolling.
          </p>
        </div>
        <ol>
          <li>
            <b>Understand</b>
            <span>Build core concepts and vocabulary.</span>
          </li>
          <li>
            <b>Practice</b>
            <span>Apply ideas to guided examples and datasets.</span>
          </li>
          <li>
            <b>Review</b>
            <span>Check assumptions, outputs, and evaluation.</span>
          </li>
          <li>
            <b>Present</b>
            <span>Document methods and communicate findings.</span>
          </li>
        </ol>
      </section>

      <section className="ds-faq" id="ds-faq">
        <div className="ds-section-heading">
          <span className="eyebrow">DATA SCIENCE FAQ</span>
          <h2>
            Before you <em>get started.</em>
          </h2>
        </div>
        <div className="ds-faq-list">
          {faqItems.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <b>{question}</b>
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ds-cta">
        <div>
          <span className="eyebrow">TWO DISTINCT COURSE OFFERINGS</span>
          <h2>
            Compare Data Science and <em>Data Analytics.</em>
          </h2>
          <p>
            Ask the team which course path best matches your current experience and learning goals.
          </p>
        </div>
        <a className="button primary" href="#advisor">
          Request course guidance <ArrowRight size={17} />
        </a>
      </section>
    </div>
  );
}
