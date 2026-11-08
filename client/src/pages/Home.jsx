import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  Download,
  FileSpreadsheet,
  GraduationCap,
  Laptop,
  Layers3,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
  X,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { submitForm } from '../services/api';
import { emailDisplay, emailHref, mapsHref, phoneDisplay, phoneHref, whatsappHref } from '../utils/contact';
import { downloadSyllabus } from '../utils/syllabus';
const DataScienceSection = lazy(() => import('../sections/DataScienceSection'));

const sections = [
  ['data-science', 'Data Science'],
  ['data-analytics', 'Data Analytics'],
  ['curriculum', 'Curriculum'],
  ['skills', 'Skills & Tools'],
  ['placement', 'Placement'],
  ['why-us', 'Why Choose Us'],
  ['faq', 'FAQ'],
  ['advisor', 'Talk to Advisor'],
  ['demo', 'Book Free Demo'],
];
const benefits = [
  ['Course & Curriculum Details', FileSpreadsheet],
  ['Flexible Learning Options', Activity],
  ['Affordable Learning', Layers3],
  ['Enrollment Process', ClipboardCheck],
  ['Career Guidance', BriefcaseBusiness],
  ['Internship Opportunities', GraduationCap],
  ['General Communication', MessageCircle],
  ['Certification Benefits', ShieldCheck],
];
const milestones = [
  [
    'Basics of Data Analytics',
    'Understand data, its lifecycle, and the questions analytics can answer.',
    BarChart3,
  ],
  [
    'Data Wrangling & Preprocessing',
    'Prepare reliable datasets and handle inconsistent values.',
    Database,
  ],
  ['Exploratory Data Analysis', 'Find patterns and useful signals in real datasets.', Activity],
  ['Data Visualization', 'Choose clear charts and communicate findings.', BarChart3],
  ['Programming for Analytics', 'Use Python to explore and analyze data.', Code2],
  [
    'Statistical Analysis & Modeling',
    'Apply practical statistical methods to support decisions.',
    Layers3,
  ],
  ['Projects & Case Studies', 'Build a portfolio through guided analytics work.', Laptop],
  ['Advanced Analytics', 'Explore predictive methods and model evaluation.', Sparkles],
  [
    'Master Certificate',
    'Complete the learning journey and demonstrate your skills.',
    GraduationCap,
  ],
];
const careers = [
  'Business Intelligence Analyst',
  'Data Visualization Specialist',
  'Python Data Analyst',
  'Data Analyst',
  'Machine Learning Engineer',
  'Statistical Analyst',
  'SQL Analyst',
  'Power BI Developer',
  'Advanced Excel Specialist',
];
const skills = [
  ['Big Data Technologies', 'Concepts behind large-scale data storage and processing.', Database],
  [
    'Business Intelligence',
    'Turn business questions into useful metrics and reporting.',
    BarChart3,
  ],
  ['Cloud Platforms', 'Understand cloud data workflows and platform fundamentals.', Cloud],
  [
    'Communication & Storytelling',
    'Present findings clearly to different audiences.',
    MessageCircle,
  ],
  ['Data Cleaning & Preparation', 'Build reliable, analysis-ready datasets.', ClipboardCheck],
  ['Data Manipulation', 'Filter, join, transform, and summarize datasets.', Layers3],
  ['Data Visualization', 'Select effective visual forms for different data.', Activity],
  ['Machine Learning', 'Explore supervised learning concepts and workflows.', Sparkles],
  ['Microsoft Excel', 'Use formulas, pivots, and charts for structured analysis.', FileSpreadsheet],
  ['SQL', 'Query relational data with joins and aggregation.', Database],
  ['Python', 'Use Python for analysis and automation.', Code2],
  ['Power BI', 'Create interactive reports and data models.', BarChart3],
  ['Tableau', 'Build visual analysis and dashboards.', Layers3],
  ['Statistics', 'Apply descriptive statistics and probability fundamentals.', Activity],
  ['Predictive Modeling', 'Understand model training and evaluation.', Sparkles],
  ['Data Modeling', 'Organize data for consistent reporting.', TableProperties],
];
const modules = [
  [
    'Introduction to Data Analytics',
    'Analytics lifecycle, data types, business questions, and analyst workflow.',
    '1 week',
  ],
  [
    'Excel for Data Analysis',
    'Formulas, lookup functions, pivot tables, charts, and reporting.',
    '2 weeks',
  ],
  [
    'SQL & Database Management',
    'Queries, joins, aggregation, subqueries, and database concepts.',
    '2 weeks',
  ],
  ['Python Programming', 'Python syntax, control flow, functions, and data structures.', '2 weeks'],
  ['NumPy & Pandas', 'Arrays, DataFrames, indexing, transformations, and analysis.', '2 weeks'],
  [
    'Data Cleaning & Preparation',
    'Missing values, duplicates, data types, outliers, and repeatable cleaning.',
    '1 week',
  ],
  [
    'Exploratory Data Analysis',
    'Summary analysis, distributions, relationships, and hypothesis exploration.',
    '1 week',
  ],
  [
    'Statistics & Probability',
    'Descriptive statistics, probability, sampling, and testing basics.',
    '2 weeks',
  ],
  [
    'Data Visualization',
    'Chart selection, visual hierarchy, dashboards, and storytelling.',
    '1 week',
  ],
  ['Power BI', 'Data import, Power Query, relationships, measures, and reports.', '2 weeks'],
  ['Tableau', 'Connect data, build visualizations, and publish dashboards.', '1 week'],
  [
    'Machine Learning Fundamentals',
    'Regression, classification, training data, and evaluation basics.',
    '2 weeks',
  ],
  ['Capstone Projects', 'Apply the course workflow to practical sample scenarios.', '2 weeks'],
  [
    'Interview Preparation',
    'Portfolio walkthroughs, technical topics, and practice interviews.',
    '1 week',
  ],
];
const projects = [
  [
    'Sales Performance Dashboard',
    'Excel · SQL · Power BI',
    'Explore sales trends, category performance, and regional results.',
  ],
  [
    'Customer Segmentation Analysis',
    'Python · Pandas · Tableau',
    'Explore meaningful audience groups in sample customer data.',
  ],
  [
    'E-commerce Data Analysis',
    'SQL · Python · Power BI',
    'Analyze a sample store dataset across products and order behavior.',
  ],
  [
    'Financial Data Visualization',
    'Excel · Tableau',
    'Present key movements in a sample financial dataset.',
  ],
  [
    'Employee Attrition Analysis',
    'Python · Statistics · Power BI',
    'Investigate patterns in a sample workforce dataset.',
  ],
  [
    'Predictive Sales Modeling',
    'Python · Pandas · scikit-learn',
    'Evaluate a learning exercise using sample sales data.',
  ],
];
const reasons = [
  ['Industry-oriented curriculum', 'Connect foundational concepts with practical tools.', Layers3],
  ['Experienced trainers', 'Learn with guided instruction and time for questions.', Users],
  ['Hands-on learning', 'Reinforce topics with exercises and practical examples.', Laptop],
  ['Flexible schedules', 'Ask an advisor about available schedules and modes.', CalendarDays],
  ['Practical projects', 'Apply skills to clearly labeled sample scenarios.', BarChart3],
  ['Career guidance', 'Get support with planning your next steps.', BriefcaseBusiness],
  ['Interview preparation', 'Practice explaining your process and decisions.', MessageCircle],
  ['Certification support', 'Understand course completion requirements.', GraduationCap],
];
const faqs = [
  [
    'What is Data Analytics?',
    'Data analytics examines and interprets data to answer questions, identify patterns, and support decisions.',
  ],
  [
    'Who can enroll in this course?',
    'The course is designed for learners who want to build practical analytics skills. An advisor can help assess fit with your experience and goals.',
  ],
  [
    'Do I need programming experience?',
    'No prior programming experience is required to begin. Programming concepts are introduced as part of the learning path.',
  ],
  [
    'What tools will I learn?',
    'The curriculum covers Excel, SQL, Python and its data libraries, Power BI, Tableau, and analytics fundamentals.',
  ],
  [
    'How long does the course take?',
    'Estimated module durations are shown in the curriculum. Your overall timeline depends on schedule and pace.',
  ],
  [
    'Is the course available online?',
    'Online and classroom modes may be available. Ask the course team to confirm current options.',
  ],
  [
    'Will I receive a certificate?',
    'Certificate details and completion requirements can be confirmed with an advisor before enrollment.',
  ],
  [
    'Does the course include placement assistance?',
    'Career support topics include resume guidance, interview practice, counseling, and job application guidance. No job outcome is guaranteed.',
  ],
  [
    'Can I download the syllabus?',
    'Yes. Any Download Syllabus button generates a PDF with the modules and estimated durations.',
  ],
  [
    'How do I book a free demo?',
    'Select Book Free Demo, enter your details and preferred time, then submit your request.',
  ],
];
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '').slice(-10));

function Header({ onCallback }) {
  const [open, setOpen] = useState(false);
  const utility = [
    ['Data Science', '#data-science'],
    ['Data Analytics', '#data-analytics'],
    ['Internship', '#ds-internship'],
    ['Certification', '#ds-certification'],
    ['Placement support', '#ds-placement'],
    ['Careers', '#ds-careers'],
    ['Contact us', '#contact'],
  ];
  const closeMenu = () => setOpen(false);
  return (
    <>
      <div className="utility-bar">
        <div className="utility-links">
          {utility.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <header className="main-header">
        <a className="brand" href="#home" aria-label="Nexavora Technologies LLP home">
          <span className="brand-mark">
            <BarChart3 />
          </span>
          <span className="brand-wordmark">
            <b>Nexavora</b>
            <small>TECHNOLOGIES LLP</small>
          </span>
        </a>
        <button
          className="icon-button mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a className="course-nav-link" href="#data-science" onClick={closeMenu}>
            Data Science
          </a>
          <a className="course-nav-link" href="#data-analytics" onClick={closeMenu}>
            Data Analytics
          </a>
          <details className="nav-dropdown">
            <summary>
              Course Topics <ChevronDown size={14} />
            </summary>
            <div className="dropdown-panel">
              <a href="#ds-curriculum" onClick={closeMenu}>
                Data Science Curriculum
              </a>
              <a href="#curriculum" onClick={closeMenu}>
                Data Analytics Curriculum
              </a>
              <a href="#ds-projects" onClick={closeMenu}>
                Practical Projects
              </a>
            </div>
          </details>
          <a href="#placement" onClick={closeMenu}>
            Career Support
          </a>
          <button
            className="button primary header-cta"
            onClick={() => {
              closeMenu();
              onCallback();
            }}
          >
            Request Callback
          </button>
        </nav>
      </header>
    </>
  );
}

function SectionNav() {
  const [active, setActive] = useState('advisor');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const item = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (item) setActive(item.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="section-nav" aria-label="Course sections">
      {sections.map(([id, label]) => (
        <a
          className={`${active === id ? 'active ' : ''}${id === 'demo' ? 'demo-nav-link' : ''}`}
          key={id}
          href={`#${id}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function Hero() {
  const data = [
    { n: 'Jan', v: 32 },
    { n: 'Feb', v: 46 },
    { n: 'Mar', v: 40 },
    { n: 'Apr', v: 61 },
    { n: 'May', v: 54 },
    { n: 'Jun', v: 78 },
  ];
  return (
    <section className="hero" id="data-analytics">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">
            <i /> PRACTICAL, CAREER-FOCUSED LEARNING
          </span>
          <h1>
            Data Analytics Course in Dharwad
          </h1>
          <p className="hero-intro">
            Build practical skills in data analysis, visualization and SQL to transform raw data
            into meaningful business insights.
          </p>
        </div>
        <div className="hero-art">
          <div className="dash-card">
            <div className="dash-top">
              <span>
                <i /> ILLUSTRATIVE ANALYTICS DASHBOARD
              </span>
              <small>Sample dataset</small>
            </div>
            <div className="dash-metrics">
              <div>
                <small>Sample revenue</small>
                <b>$84,254</b>
                <span>
                  ↗ 12.8% <i>sample trend</i>
                </span>
              </div>
              <div>
                <small>Sample users</small>
                <b>24,891</b>
                <span className="blue">
                  ↗ 8.2% <i>sample trend</i>
                </span>
              </div>
            </div>
            <div className="chart-title">
              Performance <small>Illustrative data</small>
            </div>
            <div className="chart" role="img" aria-label="Illustrative monthly revenue trend chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#ffffff14" vertical={false} />
                  <XAxis
                    dataKey="n"
                    tick={{ fill: '#85858c', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: '#171719',
                      border: '1px solid #494949',
                      borderRadius: 8,
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#ff6900"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#ff6900' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="dash-foot">
              <span>▰ Revenue</span>
              <span>▰ Previous period</span>
            </div>
          </div>
          <div className="floating-stat">
            <Activity />
            <span>
              <small>DATA INSIGHT</small>
              <b>Patterns reveal opportunity</b>
            </span>
            <ArrowRight />
          </div>
        </div>
      </div>
      <button
        className="scroll-down"
        aria-label="Scroll to advisor section"
        onClick={() => document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown />
      </button>
    </section>
  );
}

function LeadForm() {
  const [message, setMessage] = useState(null);
  const submissionId = useRef(crypto.randomUUID());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      course: 'Data Science',
      message: '',
      website: '',
    },
  });
  const submit = async (data) => {
    if (data.website) return;
    try {
      const result = await submitForm('/leads', { ...data, submissionId: submissionId.current });
      setMessage([
        'success',
        result.message || 'Request received. Our advisor will contact you soon.',
      ]);
      reset();
      submissionId.current = crypto.randomUUID();
    } catch (e) {
      setMessage(['error', e.message]);
    }
  };
  return (
    <form className="lead-form" onSubmit={handleSubmit(submit)} noValidate>
      <h3>Request Call Back</h3>
      <p>Share your details and our course team will get in touch.</p>
      {[
        ['name', 'Your name', 'text', (v) => v.trim().length >= 2 || 'Enter your name.'],
        [
          'email',
          'Your email address',
          'email',
          (v) => emailOk(v) || 'Enter a valid email address.',
        ],
        [
          'phone',
          '10-digit mobile number',
          'tel',
          (v) => phoneOk(v) || 'Enter a valid Indian mobile number.',
        ],
      ].map(([name, placeholder, type, validate]) => (
        <div key={name}>
          <label className="field">
            <input
              type={type}
              placeholder={placeholder}
              autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
              inputMode={name === 'phone' ? 'numeric' : undefined}
              {...register(name, { required: 'This field is required.', validate })}
            />
          </label>
          {errors[name] && <small className="error">{errors[name].message}</small>}
        </div>
      ))}
      <label className="field">
        <select {...register('course', { required: 'Choose a course.' })}>
          <option value="Data Science">Data Science</option>
          <option value="Data Analytics">Data Analytics</option>
        </select>
        <ChevronDown size={16} />
      </label>
      <label className="lead-message">
        Message <span>(optional)</span>
        <textarea
          rows="3"
          maxLength="1000"
          placeholder="What would you like to learn about?"
          {...register('message', { maxLength: 1000 })}
        />
      </label>
      <label className="honeypot">
        Website
        <input tabIndex={-1} autoComplete="off" {...register('website')} />
      </label>
      {message && (
        <div className={`notice ${message[0]}`} role="status">
          {message[1]}
        </div>
      )}
      <button className="button primary full" disabled={isSubmitting}>
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            Submit Request <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}

function Advisor() {
  return (
    <section className="section advisor" id="advisor">
      <div className="advisor-copy">
        <span className="eyebrow">A CONVERSATION IS A GOOD PLACE TO START</span>
        <h2>
          <em>Consult with</em>
          <br />
          our advisors
        </h2>
        <p>Get clear answers before you choose your learning path.</p>
        <div className="benefits">
          {benefits.map(([label, Icon]) => (
            <div key={label}>
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <small className="privacy">
          <ShieldCheck /> Your details are used only to respond to this course enquiry.
        </small>
      </div>
      <LeadForm />
    </section>
  );
}

function Learning() {
  return (
    <section className="section learning">
      <div className="heading centered">
        <span className="eyebrow">A CLEAR PATH FROM FOUNDATIONS TO PRACTICE</span>
        <h2>
          Learning curve for <em>Data Analytics</em>
        </h2>
        <p>Build knowledge step by step, with practical work along the way.</p>
      </div>
      <div className="milestones">
        {milestones.map(([title, desc, Icon], i) => (
          <article key={title} className={i % 2 ? 'milestone down' : 'milestone'}>
            <div className="milestone-icon">
              <small>{String(i + 1).padStart(2, '0')}</small>
              <Icon />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="section careers" id="careers">
      <div className="heading centered">
        <span className="eyebrow">CAREER PATHWAYS</span>
        <h2>
          <em>Master in</em> Data Analytics <em>Course</em>
        </h2>
        <h3>
          One course. <em>Multiple roles.</em>
        </h3>
        <p>Empower your career with in-demand data skills and open doors to new opportunities.</p>
      </div>
      <div className="career-grid">
        {careers.map((name, i) => (
          <a className="career-card" href="#demo" key={name}>
            <small>0{i + 1}</small>
            <b>{name}</b>
            <ArrowRight />
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="heading">
        <span className="eyebrow">THE TOOLKIT</span>
        <h2>
          Skills &amp; tools <em>you&apos;ll learn</em>
        </h2>
        <p>Explore the concepts and technologies covered across the learning path.</p>
      </div>
      <div className="skill-grid">
        {skills.map(([name, desc, Icon], i) => (
          <details className="skill-card" key={name}>
            <summary>
              <span className="skill-icon">
                <Icon />
              </span>
              <small>0{i + 1}</small>
              <b>{name}</b>
              <ChevronDown />
            </summary>
            <p>{desc}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section className="section curriculum" id="curriculum">
      <div className="curriculum-head">
        <div className="heading">
          <span className="eyebrow">THE LEARNING PLAN</span>
          <h2>
            Course <em>curriculum</em>
          </h2>
          <p>
            A practical sequence from analytics fundamentals through portfolio and interview
            preparation.
          </p>
        </div>
        <button className="button outline" onClick={downloadSyllabus}>
          <Download /> Download Syllabus
        </button>
      </div>
      <div className="modules">
        {modules.map(([name, topics, duration], i) => (
          <details className="module" key={name}>
            <summary>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <b>{name}</b>
              <span>{duration}</span>
              <ChevronDown />
            </summary>
            <p>{topics}</p>
            <small className="gained">
              <Check /> Skills gained: practical application, analysis, and clear communication
            </small>
          </details>
        ))}
      </div>
    </section>
  );
}

function Placement() {
  const support = [
    'Placement assistance',
    'Resume building',
    'Mock interviews',
    'Technical interview preparation',
    'Career counseling',
    'Internship guidance',
    'Job application support',
  ];
  return (
    <section className="section placement" id="placement">
      <div className="placement-copy">
        <span className="eyebrow">CAREER SUPPORT</span>
        <h2>
          Prepare for your <em>next step.</em>
        </h2>
        <p>
          Structured guidance to help you present your skills and approach your job search with
          clarity. Support is educational and does not guarantee employment.
        </p>
        <ul>
          {support.map((item) => (
            <li key={item}>
              <Check />
              {item}
            </li>
          ))}
        </ul>
        <a className="button primary" href="#demo">
          Discuss career support <ArrowRight />
        </a>
      </div>
      <div className="project-head">
        <div>
          <span className="eyebrow">PRACTICE PORTFOLIO</span>
          <h3>Sample analytics projects</h3>
        </div>
        <small>Illustrative exercises</small>
      </div>
      <div className="projects">
        {projects.map(([name, tools, desc], i) => (
          <article className="project" key={name}>
            <div className={`project-art art-${i + 1}`}>
              <small>PROJECT / 0{i + 1}</small>
              <div className="fake-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div>
              <small>{tools}</small>
              <h4>{name}</h4>
              <p>{desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section why" id="why-us">
      <div className="heading centered">
        <span className="eyebrow">LEARN WITH PURPOSE</span>
        <h2>
          Why choose <em>Nexavora Technologies LLP?</em>
        </h2>
        <p>A learning experience built around useful skills, practice, and guidance.</p>
      </div>
      <div className="why-grid">
        {reasons.map(([title, desc, Icon], i) => (
          <article key={title}>
            <small>0{i + 1}</small>
            <span>
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="faq-copy">
        <span className="eyebrow">GOOD QUESTIONS</span>
        <h2>
          Answers before <em>you begin.</em>
        </h2>
        <p>Still have a question? Talk to the course team and get the details you need.</p>
        <a href="#contact">
          Contact the team <ArrowRight />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], i) => (
          <details key={question}>
            <summary>
              <small>0{i + 1}</small>
              <b>{question}</b>
              <ChevronDown />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function DemoModal({ open, close }) {
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      course: 'Data Science',
      preferredDate: '',
      preferredTime: '',
      learningMode: 'Online',
      message: '',
      website: '',
    },
  });
  useEffect(() => {
    if (!open) return;
    const esc = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', esc);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.classList.remove('modal-open');
    };
  }, [open, close]);
  if (!open) return null;
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const submit = async (data) => {
    if (data.website) return;
    try {
      const result = await submitForm('/demo-bookings', data);
      setMessage([
        'success',
        result.message || 'Demo request received. The team will confirm your session.',
      ]);
      reset();
    } catch (e) {
      setMessage(['error', e.message]);
    }
  };
  return (
    <div
      className="backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button className="close" onClick={close} aria-label="Close">
          <X />
        </button>
        <span className="eyebrow">A FIRST LOOK AT THE COURSE</span>
        <h2 id="demo-title">
          Book a free <em>demo.</em>
        </h2>
        <p>
          Choose your preferred time and learning mode. The team will follow up to confirm
          availability.
        </p>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <label>
            Full name
            <input
              placeholder="Your name"
              autoComplete="name"
              {...register('name', { required: 'Enter your name.', minLength: 2 })}
            />
          </label>
          {errors.name && <small className="error">Enter your name.</small>}
          <label>
            Email address
            <input
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Enter your email.',
                validate: (v) => emailOk(v) || 'Enter a valid email.',
              })}
            />
          </label>
          {errors.email && <small className="error">{errors.email.message}</small>}
          <label>
            Phone number
            <input
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              {...register('phone', {
                required: 'Enter your phone.',
                validate: (v) => phoneOk(v) || 'Enter a valid Indian mobile number.',
              })}
            />
          </label>
          {errors.phone && <small className="error">{errors.phone.message}</small>}
          <label>
            Course
            <select {...register('course', { required: 'Choose a course.' })}>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
          </label>
          <div className="two-col">
            <label>
              Preferred date
              <input
                type="date"
                min={minDate}
                {...register('preferredDate', { required: true, validate: (v) => v >= minDate })}
              />
            </label>
            <label>
              Preferred time
              <select {...register('preferredTime', { required: true })}>
                <option value="">Select time</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
                <option>06:00 PM</option>
              </select>
            </label>
          </div>
          {(errors.preferredDate || errors.preferredTime) && (
            <small className="error">Choose a future date and available time.</small>
          )}
          <label>
            Learning mode
            <select {...register('learningMode')}>
              <option>Online</option>
              <option>Classroom</option>
            </select>
          </label>
          <label>
            Message <i>Optional</i>
            <textarea
              rows="3"
              placeholder="Anything you'd like us to know?"
              {...register('message', { maxLength: 500 })}
            />
          </label>
          <label className="honeypot">
            Website
            <input tabIndex={-1} {...register('website')} />
          </label>
          {message && (
            <div className={`notice ${message[0]}`} role="status">
              {message[1]}
            </div>
          )}
          <button className="button primary full" disabled={isSubmitting}>
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Request my demo <ArrowRight />
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

function Footer() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const send = async (data) => {
    try {
      const result = await submitForm('/contact', data);
      setStatus(result.message || 'Message sent. The team will get back to you.');
      reset();
    } catch (error) {
      setStatus(error.message);
    }
  };
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div>
          <a className="brand" href="#home">
            <span className="brand-mark">
              <BarChart3 />
            </span>
            <span className="brand-wordmark">
              <b>Nexavora</b>
              <small>TECHNOLOGIES LLP</small>
            </span>
          </a>
          <p>Practical learning for people ready to make more of data.</p>
          <a className="footer-phone" href={phoneHref}>
            <Phone /> {phoneDisplay}
          </a>
          <a className="footer-phone" href="tel:8792781059">
            <Phone /> 8792781059
          </a>
          <a className="footer-phone" href={emailHref}>
            {emailDisplay}
          </a>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#ds-careers">Data Science careers</a>
          <a href="#careers">Data Analytics roles</a>
          <a href="#skills">Skills &amp; tools</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#placement">Career support</a>
        </div>
        <div className="footer-links">
          <h3>Course</h3>
          <a href="#data-science">Data Science course</a>
          <a href="#data-analytics">Data Analytics course</a>
          <a href="#advisor">Talk to an advisor</a>
          <a href="#demo">Book a free demo</a>
          <a href="#faq">Frequently asked questions</a>
        </div>
        <div id="contact">
          <h3>Send a message</h3>
          <form className="contact-form" onSubmit={handleSubmit(send)}>
            <input
              required
              placeholder="Your name"
              autoComplete="name"
              {...register('name', { required: true, minLength: 2 })}
            />
            <input
              required
              type="email"
              placeholder="Email address"
              autoComplete="email"
              {...register('email', { required: true, validate: emailOk })}
            />
            <input required placeholder="Subject" {...register('subject', { required: true })} />
            <input type="tel" placeholder="Phone (optional)" {...register('phone')} />
            <textarea
              required
              placeholder="Message"
              rows="3"
              {...register('message', { required: true, minLength: 5 })}
            />
            <label className="honeypot">
              Website
              <input tabIndex={-1} autoComplete="off" {...register('website')} />
            </label>
            {status && <small role="status">{status}</small>}
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send message <Send />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Nexavora Technologies LLP. Course details are subject to
          confirmation.
        </span>
        <div>
          <a href="/privacy.html">Privacy policy</a>
          <a href="/terms.html">Terms &amp; conditions</a>
        </div>
      </div>
    </footer>
  );
}

function Widgets({ callback }) {
  const [chat, setChat] = useState(false);
  const [draft, setDraft] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi there! Ask about either course, the curriculum, or career support.',
    },
  ]);
  const [chatError, setChatError] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const sendChatMessage = async (value) => {
    const text = value.trim();
    if (!text || chatLoading) return;
    const userMessage = { id: `${Date.now()}-user`, sender: 'user', text };
    const nextMessages = [...chatMessages, userMessage];
    setChatMessages(nextMessages);
    setDraft('');
    setChatError('');
    setChatLoading(true);
    try {
      const result = await submitForm('/chat', {
        messages: nextMessages.map(({ sender, text: message }) => ({
          role: sender === 'user' ? 'user' : 'assistant',
          content: message,
        })),
      });
      setChatMessages((messages) => [
        ...messages,
        { id: `${Date.now()}-assistant`, sender: 'assistant', text: result.message },
      ]);
    } catch (error) {
      setChatError(error.message);
    } finally {
      setChatLoading(false);
    }
  };
  const submitChat = (event) => {
    event.preventDefault();
    sendChatMessage(draft);
  };
  return (
    <>
      <a className="job-ribbon" href="#ds-placement" aria-label="Career support information">
        <span>
          <Play size={12} fill="currentColor" />
        </span>
        Career
        <br />
        <b>Support</b>
      </a>
      {mapsHref && (
        <a className="location-link" href={mapsHref} target="_blank" rel="noreferrer">
          We Are Here
        </a>
      )}
      <button
        className="chat-launch"
        onClick={() => setChat(!chat)}
        aria-expanded={chat}
        aria-label={chat ? 'Close course chat' : 'Open course chat'}
      >
        {chat ? <X /> : <MessageCircle />}
        <small>We Are Here!</small>
      </button>
      {chat && (
        <aside className="chat-box">
          <header>
            <b>Nexavora course information</b>
            <button onClick={() => setChat(false)} aria-label="Close chat">
              <X />
            </button>
            <small>Automated course information</small>
          </header>
          <div className="chat-content" role="log" aria-live="polite" aria-relevant="additions">
            {chatMessages.map((message) => (
              <p
                className={message.sender === 'user' ? 'chat-reply' : 'chat-answer'}
                key={message.id}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="chat-options">
            <button type="button" onClick={() => sendChatMessage('Tell me about Data Science')}>
              Data Science <ChevronRight />
            </button>
            <button type="button" onClick={() => sendChatMessage('Tell me about Data Analytics')}>
              Data Analytics <ChevronRight />
            </button>
            <button type="button" onClick={() => sendChatMessage('Tell me about SQL')}>
              SQL curriculum <ChevronRight />
            </button>
          </div>
          <div className="chat-actions">
            <a href={phoneHref}>
              <Phone size={15} /> Call {phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => {
                setChat(false);
                callback();
              }}
            >
              Request callback <ArrowRight size={15} />
            </button>
          </div>
          <form className="chat-composer" onSubmit={submitChat}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a course question..."
              aria-label="Type a course question"
              maxLength={500}
            />
            <button type="submit" disabled={!draft.trim()} aria-label="Send message">
              {chatLoading ? '...' : <Send size={17} />}
            </button>
          </form>
          {chatError && <small className="notice error">{chatError}</small>}
          <small className="chat-disclaimer">
            For confirmed fees, schedules, or availability, contact the course team.
          </small>
        </aside>
      )}
      <div className={whatsappHref ? 'contact-orbit' : 'contact-orbit phone-only'}>
        <a href={phoneHref} aria-label="Call Nexavora Technologies LLP">
          <Phone />
        </a>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp course enquiry"
          >
            <MessageCircle />
          </a>
        )}
      </div>
    </>
  );
}

export default function Home() {
  const [demo, setDemo] = useState(false);
  const callback = () => document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="site" id="home">
      <Header onCallback={callback} />
      <main>
        <SectionNav />
        <Suspense
          fallback={
            <div className="ds-loading" role="status">
              Loading Data Science course...
            </div>
          }
        >
          <DataScienceSection />
        </Suspense>
        <Hero />
        <Advisor />
        <Learning />
        <Careers />
        <Skills />
        <Curriculum />
        <Placement />
        <WhyUs />
        <FAQ />
        <section className="demo-cta" id="demo">
          <div>
            <span className="eyebrow">SEE HOW YOU&apos;LL LEARN</span>
            <h2>
              Make your next move <em>with clarity.</em>
            </h2>
            <p>Book a free demo and ask about the course, schedule, and learning options.</p>
          </div>
          <button className="button primary" onClick={() => setDemo(true)}>
            Book Free Demo <CalendarDays />
          </button>
        </section>
      </main>
      <Footer />
      <Widgets callback={callback} />
      <DemoModal open={demo} close={() => setDemo(false)} />
    </div>
  );
}
