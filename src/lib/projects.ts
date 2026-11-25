// Every figure, number and claim here comes from Pratap's resume or the
// project's own public GitHub README. Nothing is estimated or invented.

export type Category = "AI/ML" | "Finance" | "Analytics" | "Research";

export type Figure = { src: string; alt: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  kicker: string; // one-line subject
  categories: Category[];
  metric: { value: string; label: string };
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  contribution: string;
  evidence: { value: string; label: string }[];
  outcome: string;
  figures: Figure[];
  cover?: string; // real figure used as the card image
  preview?: string; // animated preview on hover
  art?: "flight" | "breach" | "equity"; // original illustration when no public figure exists
  links: { label: string; href: string }[];
  note?: string;
};

const gh = (repo: string) => ({ label: "Code on GitHub", href: `https://github.com/PratapMahalingam/${repo}` });

export const projects: Project[] = [
  {
    slug: "fintech-fraud-monitor",
    title: "Fintech Fraud Monitor",
    kicker: "Real-time card-fraud detection",
    categories: ["AI/ML", "Finance"],
    metric: { value: "0.908", label: "F1 score" },
    summary: "A streaming monitor that scores every card transaction the moment it arrives.",
    problem:
      "Rule-based fraud alerts are easy to explain but flood analysts with false alarms. The monitor needed to keep readable reason codes while letting a model make the alert decision, fast enough to run on every transaction.",
    approach: [
      "Kept per-card state in SQLite so each transaction is scored on arrival.",
      "Ran three classic rules (velocity, impossible travel, unusual amount) to supply analyst-readable reason codes.",
      "Trained a gradient-boosting scorer on the same causal features to make the alert decision.",
      "Compiled the boosted trees into numpy arrays to keep scoring fast.",
    ],
    stack: ["Python", "Gradient boosting", "numpy", "SQLite"],
    contribution: "Designed and built the monitor, its features, the model and the evaluation.",
    evidence: [
      { value: "86.3%", label: "of fraud detected" },
      { value: "95.8%", label: "precision" },
      { value: "28,825 → 81", label: "false alarms against rules" },
      { value: "0.38 ms", label: "median scoring time" },
    ],
    outcome:
      "The model reached an F1 of 0.908, cutting false alarms from 28,825 to 81 compared with rules while still catching 86.3% of fraud.",
    cover: "/work/fraud/roc_pr_curves.webp",
    preview: "/work/fraud/fraud_stream.webp",
    figures: [
      { src: "/work/fraud/roc_pr_curves.webp", alt: "ROC and precision-recall curves", caption: "ROC and precision-recall curves." },
      { src: "/work/fraud/precision_recall_by_detector.webp", alt: "Precision and recall per detector", caption: "Precision and recall for each rule and for the model." },
      { src: "/work/fraud/confusion_matrix.webp", alt: "Confusion matrix", caption: "Confusion matrix." },
    ],
    links: [gh("fintech-fraud-monitor")],
  },
  {
    slug: "biomed-graphrag-evidence",
    title: "BioMed GraphRAG Evidence",
    kicker: "Biomedical evidence retrieval",
    categories: ["AI/ML", "Research"],
    metric: { value: "0.895", label: "nDCG@10" },
    summary: "Testing whether an entity graph really helps retrieval, or just the extra documents it brings.",
    problem:
      "GraphRAG systems usually report a gain over vector-only retrieval, but two things change at once: a graph is added and more documents reach the reader. The project separates the two on a biomedical fact-checking benchmark.",
    approach: [
      "Built MedCPT retrieval and reranking over SciFact, against a BM25 baseline.",
      "Compared graph expansion with a baseline given the same number of extra documents.",
      "Ran the same expansion over a degree-preserving rewired graph as a null model.",
      "Served the results through a FastAPI endpoint.",
    ],
    stack: ["Python", "MedCPT", "RAG", "FastAPI"],
    contribution: "Designed the controls, built the retrieval pipeline and ran the evaluation.",
    evidence: [
      { value: "0.799 → 0.895", label: "nDCG@10 over BM25" },
      { value: "0.684 → 0.783", label: "Recall@1" },
      { value: "+0.001", label: "nDCG@10 from the entity graph" },
    ],
    outcome:
      "Retrieval and reranking delivered the gain; the entity graph, tested fairly against budget-matched and rewired controls, added no measurable improvement.",
    cover: "/work/graphrag/pipeline.webp",
    figures: [
      { src: "/work/graphrag/pipeline.webp", alt: "Retrieval pipeline", caption: "The retrieval pipeline." },
      { src: "/work/graphrag/budget_curve.webp", alt: "Budget curve", caption: "Performance as the document budget grows." },
      { src: "/work/graphrag/stance.webp", alt: "Stance results", caption: "Results by claim stance." },
    ],
    links: [gh("biomed-graphrag-evidence")],
  },
  {
    slug: "spatial-transcriptomics-gnn",
    title: "Spatial Transcriptomics GNN",
    kicker: "Graph neural networks on brain tissue",
    categories: ["AI/ML", "Research"],
    metric: { value: "0.592", label: "macro-F1, unseen donors" },
    summary: "Does a spot's spatial neighbourhood improve cortical layer annotation, and is the gain real?",
    problem:
      "In 10x Visium sections of human dorsolateral prefrontal cortex, the question was whether giving a model each spot's spatial neighbourhood improves layer annotation over gene expression alone, and whether any gain comes from real tissue structure or just from extra edges.",
    approach: [
      "Trained GraphSAGE in PyTorch Geometric on 47,329 Visium spots.",
      "Evaluated on donors held out from training.",
      "Compared against a degree-preserving rewired graph with the same degrees.",
    ],
    stack: ["Python", "PyTorch Geometric", "GraphSAGE"],
    contribution: "Built the graph models, the rewired-graph null and the evaluation.",
    evidence: [
      { value: "0.551 → 0.592", label: "macro-F1 on unseen donors (p = 0.007)" },
      { value: "0.493", label: "macro-F1 with a rewired graph (p = 0.0005)" },
      { value: "47,329", label: "Visium spots" },
    ],
    outcome: "The spatial graph improved annotation, and the rewired-graph control showed the gain comes from real tissue structure.",
    cover: "/work/spatial-gnn/spatial_map_151673.webp",
    figures: [
      { src: "/work/spatial-gnn/spatial_map_151673.webp", alt: "Spatial maps, section 151673", caption: "Spatial maps of section 151673." },
      { src: "/work/spatial-gnn/per_section_macro_f1.webp", alt: "Per-section macro-F1", caption: "Macro-F1 for each section." },
      { src: "/work/spatial-gnn/boundary_vs_interior.webp", alt: "Boundary vs interior", caption: "Accuracy at layer boundaries and in layer interiors." },
    ],
    links: [gh("spatial-transcriptomics-gnn")],
  },
  {
    slug: "kepler-exoplanet-vetting",
    title: "Kepler Exoplanet Vetting",
    kicker: "Explainable machine learning on NASA data",
    categories: ["AI/ML", "Research"],
    metric: { value: "0.936", label: "ROC-AUC" },
    summary: "Do a model's feature importances agree with how astronomers vet planet candidates?",
    problem:
      "Most Kepler machine-learning projects train a classifier and report accuracy. Archive vetting flags alone reproduce 98.9% of labels, so a model that uses them looks accurate without learning anything. This project asks whether a leakage-free model reasons the way astronomers do.",
    approach: [
      "Trained LightGBM on 9,564 NASA Exoplanet Archive objects.",
      "Excluded the vetting flags and grouped cross-validation by host star.",
      "Compared SHAP attributions against NASA's four documented vetting flags.",
    ],
    stack: ["Python", "LightGBM", "SHAP", "scikit-learn"],
    contribution: "Designed the leakage-free setup, trained the model and ran the SHAP analysis.",
    evidence: [
      { value: "0.936", label: "ROC-AUC on physical parameters alone" },
      { value: "0.969", label: "ROC-AUC with centroid diagnostics" },
      { value: "66% → 95%", label: "centroid-offset false positives detected" },
    ],
    outcome: "The model's explanations line up with the astronomers' documented vetting criteria, without leaking the labels.",
    cover: "/work/kepler/shap_summary_physical.webp",
    figures: [
      { src: "/work/kepler/shap_summary_physical.webp", alt: "SHAP summary, physical model", caption: "SHAP summary for the physical-parameter model." },
      { src: "/work/kepler/top10_features.webp", alt: "Top-10 features", caption: "The ten most important features." },
      { src: "/work/kepler/confusion_matrix.webp", alt: "Confusion matrices", caption: "Confusion matrices." },
    ],
    links: [gh("kepler-exoplanet-detection")],
  },
  {
    slug: "proteingym-fitness-prediction",
    title: "ProteinGym Fitness Prediction",
    kicker: "Protein language models",
    categories: ["AI/ML", "Research"],
    metric: { value: "0.412", label: "Spearman ρ, from 0.203" },
    summary: "Predicting mutation effects on proteins the model has never seen.",
    problem:
      "A model fits a deep mutational scan easily when mutants of the same protein appear in training and test. The real question is whether it generalises to proteins held out entirely.",
    approach: [
      "Used ESM-2 embeddings and masked-marginal scores as features.",
      "Trained ridge regression with five-fold protein-held-out cross-validation.",
      "Evaluated across 201 ProteinGym assays.",
    ],
    stack: ["Python", "ESM-2", "Ridge regression"],
    contribution: "Built the held-out-protein evaluation and the models.",
    evidence: [
      { value: "0.203 → 0.412", label: "mean Spearman ρ" },
      { value: "201", label: "assays" },
      { value: "644,457", label: "mutants, 173 proteins" },
    ],
    outcome: "Mean Spearman ρ doubled on unseen proteins under a strict held-out split.",
    cover: "/work/proteingym/ridge_vs_zero_shot.webp",
    figures: [
      { src: "/work/proteingym/ridge_vs_zero_shot.webp", alt: "Ridge vs zero-shot per assay", caption: "Ridge regression against zero-shot scores, per assay." },
      { src: "/work/proteingym/spearman_distribution.webp", alt: "Per-assay Spearman by method", caption: "Per-assay Spearman by method." },
      { src: "/work/proteingym/spearman_vs_identity.webp", alt: "Spearman vs identity to training set", caption: "Spearman against sequence identity to the training set." },
    ],
    links: [gh("proteingym-fitness-prediction")],
  },
  {
    slug: "microns-connectome",
    title: "MICrONS Connectome",
    kicker: "Structure and function in mouse visual cortex",
    categories: ["Research"],
    metric: { value: "0.071", label: "r, against 0.053 null" },
    summary: "Do neurons joined by a synapse respond more alike than chance?",
    problem:
      "Connected neurons might respond alike simply because of the network's degree structure or because they sit close together. The test had to rule out both simpler explanations.",
    approach: [
      "Re-analysed 8,128 connected neuron pairs from the public MICrONS dataset.",
      "Compared against degree-preserving and proximity-matched shuffled networks.",
      "Used 1,000 shuffles for the null distribution.",
    ],
    stack: ["Python", "Permutation testing", "Network analysis"],
    contribution: "Designed the null models and ran the analysis.",
    evidence: [
      { value: "0.071 vs 0.053", label: "mean correlation vs proximity-matched null" },
      { value: "p ≤ 0.001", label: "1,000 shuffles" },
      { value: "8,128", label: "connected pairs" },
    ],
    outcome: "Synaptically connected neurons respond more similarly than chance, even after controlling for degree and proximity.",
    cover: "/work/microns/connectivity_graph.webp",
    figures: [
      { src: "/work/microns/connectivity_graph.webp", alt: "Connectivity graph", caption: "The connectivity graph." },
      { src: "/work/microns/null_mean_distributions.webp", alt: "Null of the mean", caption: "Observed mean against the null distributions." },
      { src: "/work/microns/similarity_distributions.webp", alt: "Similarity distributions", caption: "Response-similarity distributions." },
    ],
    links: [gh("microns-structure-function")],
  },
  {
    slug: "eeg-movement-decoding",
    title: "EEG Movement Decoding",
    kicker: "Cross-subject EEG classification",
    categories: ["AI/ML", "Research"],
    metric: { value: "68.7%", label: "accuracy, chance 49.7%" },
    summary: "Telling rest from hand movement in the EEG of people the model has never seen.",
    problem:
      "From a 3-second window of 64-channel EEG, the classifier has to tell whether a person is resting or opening and closing a fist, and it is tested only on people absent from training.",
    approach: [
      "Built an MNE-Python pipeline with 256 band-power features.",
      "Trained logistic regression with subject-wise cross-validation across 20 subjects.",
      "Checked significance with a permutation test.",
    ],
    stack: ["Python", "MNE-Python", "Logistic regression"],
    contribution: "Built the pipeline, features and evaluation.",
    evidence: [
      { value: "68.7%", label: "accuracy against 49.7% chance" },
      { value: "0.77", label: "ROC-AUC" },
      { value: "p ≈ 0.01", label: "permutation test" },
    ],
    outcome: "The decoder generalises to unseen subjects well above chance.",
    cover: "/work/eeg/results.webp",
    figures: [
      { src: "/work/eeg/results.webp", alt: "Per-subject accuracy, confusion matrix and mu-band topography", caption: "Per-subject accuracy, confusion matrix and mu-band topography." },
    ],
    links: [gh("neuro-eeg-classifier")],
  },
  {
    slug: "motor-cortex-spike-trains",
    title: "Motor Cortex Spike Trains",
    kicker: "Single-neuron analysis of motor planning",
    categories: ["Research"],
    metric: { value: "64%", label: "direction-selective, vs 4%" },
    summary: "Finding the plan for a movement in single neurons, before the movement happens.",
    problem:
      "In a delayed-response task, a mouse feels a pole, waits, then licks left or right on a go cue. The question is how many motor-cortex neurons already encode the choice during the wait.",
    approach: [
      "Analysed spike-sorted recordings from the DANDI Archive (DANDI:000006).",
      "Compared direction selectivity in the pre-movement delay against baseline.",
      "Pooled 26.8 hours of recordings across 53 sessions.",
    ],
    stack: ["Python", "DANDI Archive", "Spike-train analysis"],
    contribution: "Ran the single-neuron and population analysis.",
    evidence: [
      { value: "64%", label: "of 1,073 neurons selective in the delay" },
      { value: "4%", label: "selective at baseline" },
      { value: "26.8 h", label: "of recordings, 53 sessions" },
    ],
    outcome: "Most motor-cortex neurons carry the upcoming choice before any movement starts.",
    cover: "/work/motor-cortex/raster_psth.webp",
    figures: [
      { src: "/work/motor-cortex/raster_psth.webp", alt: "Spike raster and PSTH of one ALM neuron", caption: "Raster and PSTH of one neuron, split by lick direction." },
      { src: "/work/motor-cortex/population_selectivity.webp", alt: "Fraction of direction-selective units per epoch", caption: "Share of direction-selective units in each task epoch." },
      { src: "/work/motor-cortex/condition_comparison.webp", alt: "Delay vs baseline comparison", caption: "Delay against baseline, and selectivity over time." },
    ],
    links: [gh("neuro-dandi-spike-trains")],
  },
  {
    slug: "neuron-morphology",
    title: "Neuron Morphology",
    kicker: "Dendritic branching across brain regions",
    categories: ["Research", "Analytics"],
    metric: { value: "4–5×", label: "more branch points" },
    summary: "How differently neurons branch in the hippocampus, neocortex and cerebellum.",
    problem: "Neuron shapes differ by region, but the differences need measuring with corrected statistics rather than judging by eye.",
    approach: [
      "Pulled 3D reconstructions from NeuroMorpho.Org through its REST API.",
      "Sampled 40 neurons per region across labs with a fixed seed.",
      "Validated the measurements against NeuroMorpho's own L-Measure values.",
    ],
    stack: ["Python", "NeuroMorpho.Org REST API", "Hypothesis testing"],
    contribution: "Built the data pipeline, feature extraction and statistics.",
    evidence: [
      { value: "152.5", label: "median Purkinje branch points" },
      { value: "31.5–38", label: "median for pyramidal cells" },
      { value: "p < 0.001", label: "Holm-corrected" },
    ],
    outcome: "Purkinje cells have about 4–5 times more branch points than pyramidal cells, across 118 reconstructions.",
    cover: "/work/neuron-morphology/hero_gallery.webp",
    figures: [
      { src: "/work/neuron-morphology/hero_gallery.webp", alt: "Dendritic arbors drawn on a common micrometre scale", caption: "Dendritic arbors of CA1 pyramidal, neocortical pyramidal and Purkinje cells, to scale." },
      { src: "/work/neuron-morphology/feature_violins.webp", alt: "Violin plots of four dendritic features", caption: "Four dendritic features by region." },
      { src: "/work/neuron-morphology/sholl.webp", alt: "Sholl profiles by region", caption: "Sholl profiles by region." },
    ],
    links: [gh("neuro-neuromorpho-analysis")],
  },
  {
    slug: "allen-brain-atlas",
    title: "Allen Brain Atlas Gene Expression",
    kicker: "Regional gene expression in the human brain",
    categories: ["Research", "Analytics"],
    metric: { value: "+0.78", label: "log2 hippocampal BDNF" },
    summary: "Where three memory- and disease-related genes are expressed in the adult human brain.",
    problem: "Gene expression varies by brain region, and any difference has to be tested against variation between donors.",
    approach: [
      "Accessed 3,702 Allen Human Brain Atlas microarray samples through the Allen SDK.",
      "Mapped BDNF, APOE and GRIN2A across 17 brain regions.",
      "Tested regional differences across six donors.",
    ],
    stack: ["Python", "Allen SDK", "Statistics"],
    contribution: "Ran the exploratory analysis and statistics.",
    evidence: [
      { value: "+0.78", label: "log2 units of hippocampal BDNF over neocortex" },
      { value: "p = 0.014", label: "six donors" },
      { value: "17", label: "brain regions" },
    ],
    outcome: "BDNF expression is higher in the hippocampus than the neocortical average.",
    cover: "/work/allen-brain-atlas/heatmap_gene_by_region.webp",
    figures: [
      { src: "/work/allen-brain-atlas/heatmap_gene_by_region.webp", alt: "Heatmap of BDNF, APOE and GRIN2A expression across 17 brain regions", caption: "BDNF, APOE and GRIN2A across 17 regions." },
      { src: "/work/allen-brain-atlas/bar_bdnf_by_region.webp", alt: "BDNF expression by region", caption: "BDNF expression by region." },
    ],
    links: [gh("neuro-allen-brain-atlas")],
  },
  {
    slug: "flightguard-ai",
    title: "FlightGuard AI",
    kicker: "Aviation data analytics and reporting",
    categories: ["Analytics", "AI/ML"],
    metric: { value: "3,000+", label: "incident records" },
    summary: "Exploring aviation incident patterns with dashboards and a live API.",
    problem: "Aviation incident records are numerous and varied, which makes trends hard to see in the raw data.",
    approach: [
      "Cleaned and analysed 3,000+ incident records across 15 variables.",
      "Combined Dataiku-based analysis with interactive dashboards.",
      "Developed a live REST API and assessed predictive indicators.",
    ],
    stack: ["Dataiku", "Dashboards", "REST API"],
    contribution: "Built the analysis, dashboards and API.",
    evidence: [
      { value: "3,000+", label: "incident records" },
      { value: "15", label: "variables" },
    ],
    outcome: "Interpretable incident patterns presented through dashboards, with model findings and limitations reported.",
    art: "flight",
    figures: [],
    links: [{ label: "Watch the demo", href: "https://youtu.be/nUHpNds2YQ0" }],
  },
  {
    slug: "economics-of-cybercrime",
    title: "Economics of Cybercrime",
    kicker: "MBA dissertation",
    categories: ["Finance", "Analytics"],
    metric: { value: "22,000+", label: "breach records" },
    summary: "What drives the financial cost of data breaches.",
    problem: "Cybercrime creates financial exposure for organisations, and the drivers of breach cost are not clear from headline figures.",
    approach: [
      "Validated 22,000+ published breach records through cleaning and consistency checks.",
      "Applied regression, forecasting and cost-driver analysis.",
      "Compared financial risk factors.",
    ],
    stack: ["Regression", "Forecasting", "Cost-driver analysis"],
    contribution: "Sole author of the dissertation.",
    evidence: [{ value: "22,000+", label: "breach records validated" }],
    outcome: "Business insights on economic impact, limitations and risk-mitigation priorities.",
    art: "breach",
    figures: [],
    links: [],
    note: "MBA dissertation at Middlesex University Dubai, not a published paper.",
  },
  {
    slug: "sony-equity-research",
    title: "Sony Group Equity Research",
    kicker: "Academic equity research and pitch",
    categories: ["Finance"],
    metric: { value: "≈0.95", label: "estimated beta" },
    summary: "An academic investment case on Sony Group.",
    problem: "Deciding whether an equity is attractive means weighing its financials and valuation against market risk.",
    approach: [
      "Analysed financial ratios and valuation assumptions.",
      "Benchmarked Sony against the Nikkei 225 and sector context.",
      "Applied CAPM with an estimated beta of about 0.95.",
    ],
    stack: ["CAPM", "Ratio analysis", "Benchmarking"],
    contribution: "Prepared the research, valuation and presentation.",
    evidence: [{ value: "≈0.95", label: "estimated beta" }],
    outcome: "A supported academic buy recommendation and presentation.",
    art: "equity",
    figures: [],
    links: [],
    note: "Academic exercise, not investment advice.",
  },
];

export const categories: ("All" | Category)[] = ["All", "AI/ML", "Finance", "Analytics", "Research"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
