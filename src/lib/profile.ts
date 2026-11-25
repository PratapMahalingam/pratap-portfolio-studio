// Sourced from Pratap's resume. Dates and titles are as written there.
export const profile = {
  name: "Pratap Mahalingam",
  focus: "Finance × Data Analytics × AI",
  headline: ["I connect", "finance, data", "& intelligence."],
  intro:
    "Exploring how finance, analytics and artificial intelligence transform complex information into meaningful decisions.",
  location: "Dubai",
  email: "pratapmvc@gmail.com",
  linkedin: "https://www.linkedin.com/in/pratap-mahalingam-1b5180281/",
  github: "https://github.com/PratapMahalingam",
  resume: "/Pratap_Mahalingam_Resume.pdf",
  roles: ["Data Analyst", "Business Analyst", "Financial Analyst", "Research Analyst", "Risk Analyst", "Junior AI Analyst"],
  about:
    "I'm an early-career finance, data and AI professional with an MBA in Artificial Intelligence & Business Analytics. Several of my projects test a claim against a fair control: whether an entity graph really helps retrieval, whether a leakage-free model agrees with astronomers' vetting criteria, and whether a fraud model beats the rules analysts already use.",
};

export const experience = [
  {
    when: "Oct 2026 – Present",
    role: "AI Research Contributor, Project Odin",
    org: "Mercor",
    points: [
      "Evaluate AI-generated research for factual accuracy, clarity and consistency; flag unsupported statements and gaps in reasoning.",
      "Validate source-backed findings against quality criteria and write structured documentation for reviewers.",
    ],
  },
  {
    when: "Sep 2026 – Present",
    role: "Data Science & AI Trainee",
    org: "Matsuo-Iwasawa Lab, University of Tokyo (GCI World)",
    points: [
      "Prepare and clean analytical datasets, checking completeness and suitability for modelling.",
      "Apply statistical reasoning and model assessment, and explain findings and limitations clearly.",
    ],
  },
  {
    when: "Jul 2023",
    role: "Investment Banking Virtual Experience",
    org: "J.P. Morgan via Forage",
    points: [
      "Built an Excel three-statement financial model linking operating assumptions, forecasts and scenario analysis.",
      "Prepared investment research materials presenting the key assumptions and analysis.",
    ],
  },
  {
    when: "Jun – Jul 2023",
    role: "Product Management Training Programme",
    org: "Internshala",
    points: ["Researched users and competitors, mapped user journeys and documented requirements."],
  },
];

export const education = [
  { when: "2026", title: "MBA, Artificial Intelligence & Business Analytics", org: "Middlesex University Dubai", detail: "Merit" },
  { when: "", title: "BBA, Finance & Business Analytics", org: "SRM Institute of Science and Technology", detail: "GPA 7.91/10" },
  { when: "2024", title: "Graduate coursework, Health Informatics", org: "Michigan Technological University", detail: "One semester, GPA 4.0/4.0, degree not completed" },
  { when: "May 2026", title: "Machine Learning & Core Designer Practitioner", org: "Dataiku", detail: "Certification" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Finance & business", items: ["Three-statement modelling", "Forecasting", "Scenario analysis", "CAPM", "Competitor research", "KPI reporting", "Process mapping"] },
  { group: "Data & AI", items: ["Python", "SQL", "Excel", "Power BI", "Tableau", "Dataiku", "Regression", "Dashboards", "Model evaluation"] },
  { group: "Machine learning", items: ["Gradient boosting", "LightGBM", "scikit-learn", "GraphSAGE", "RAG", "SHAP", "Grouped cross-validation", "Leakage prevention"] },
  { group: "Research", items: ["Hypothesis testing", "Permutation testing", "EEG analysis", "Spike trains", "Connectomics", "Gene expression", "MNE-Python", "Allen SDK"] },
];
