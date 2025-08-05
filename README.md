# Databricks Demo Template

A comprehensive template for creating sophisticated Databricks demos with AI assistance. This template generates production-ready projects with React-based Databricks Apps, synthetic data generation, and intelligent Cursor AI rules for guided development.

## 🎯 What This Template Creates

This template generates a complete Databricks demo project including:

- **🏗️ Databricks Asset Bundle (DAB)** - Complete infrastructure-as-code setup
- **⚛️ Modern React App** - Professional dashboard with shadcn/ui components  
- **🔄 Pure PySpark Data Generation** - Synthetic data tailored to your industry
- **🤖 Cursor AI Rules** - Expert guidance for extending and customizing your demo
- **📊 Interactive Visualizations** - Charts, KPIs, and analytics components
- **🎨 Databricks Design System** - Professional branding and responsive UI

## 🚀 Quick Start

### 1. Initialize Your Demo Project

```bash
# Create a new demo from this template
databricks bundle init https://github.com/briancline-db/sa-demo-template.git

# Follow the prompts to configure your demo:
# - project_name: retail_analytics (use underscores)  
# - demo_description: Be specific about what you want to build
# - industry: retail, finance, healthcare, etc.
# - complexity: simple, standard, or advanced
# - workspace_host: Your Databricks workspace URL
# - warehouse_id: Your SQL warehouse ID
```

### 2. Deploy Your Demo

```bash
cd your_demo_project

# Deploy the Databricks assets
databricks bundle deploy

# Run the data generation job
databricks bundle run data_generation_job

# Deploy the Databricks App  
databricks bundle run app_deployment
```

### 3. Start Local Development

```bash
# Navigate to the app directory
cd src/app

# Install dependencies
npm install

# Start development server
npm run start:dev
```

Your demo will be available at `http://localhost:3000` for local development and in your Databricks workspace as a Databricks App.

## 🎨 Template Configuration Options

When initializing the template, you'll be prompted for these key parameters:

| Parameter | Description | Examples |
|-----------|-------------|----------|
| **project_name** | Project identifier (use underscores) | `retail_analytics`, `supply_chain_ops` |
| **demo_description** | Detailed description of your demo needs | "A retail analytics dashboard showing customer segmentation, sales trends, and inventory management with real-time processing" |
| **industry** | Industry focus for realistic data/scenarios | `retail`, `finance`, `healthcare`, `manufacturing` |
| **complexity** | Demo sophistication level | `simple` (dashboards), `standard` (+OLTP), `advanced` (+LLM) |
| **data_scale** | Synthetic data volume | `small` (1K), `medium` (10K), `large` (100K) |

## 🤖 Working with Cursor AI

This template includes comprehensive Cursor AI rules to guide development. Here's how to effectively prompt Cursor AI:

### Essential Cursor AI Prompts

#### 🎯 **Building New Features**
```
@demo-requirements.md I need to add a new customer acquisition analysis page. 
Create an interactive component that shows:
- Customer acquisition funnel metrics
- CAC (Customer Acquisition Cost) trends  
- Attribution analysis by marketing channel
- Cohort retention visualization

Use the existing design system and follow the navigation patterns.
```

#### 📊 **Adding Data Sources**
```
@data-generation.md I want to add supplier performance data to my supply chain demo.
Generate realistic data including:
- Supplier on-time delivery rates
- Quality scores and defect rates  
- Cost per unit trends over time
- Geographic distribution of suppliers

Make sure it integrates with the existing data generation job.
```

#### 🎨 **UI/UX Improvements**
```
@react-styling.md @databricks-apps.md Improve the dashboard header to include:
- Real-time data refresh indicator
- User notification center with badge
- Advanced filtering dropdown
- Export functionality for reports

Maintain the professional Databricks design system and ensure mobile responsiveness.
```

#### 🚀 **Deployment & Infrastructure**
```
@databricks-apps.md I'm getting deployment errors. Help me troubleshoot and fix:
1. Check the databricks.yml configuration
2. Verify .databricksignore is working properly  
3. Ensure the app builds and deploys correctly
4. Test both local development and Databricks Apps deployment
```

### 🎯 Advanced Prompting Strategies

#### **Context-Aware Development**
```
@demo-requirements.md @navigation.js I need to add a new "Risk Management" section to my finance demo. This should include:

1. **Navigation Updates**: Add to both primary nav and mobile nav
2. **New Pages**: Credit risk dashboard, market risk analysis, operational risk monitoring  
3. **Data Integration**: Connect to the existing financial data generation
4. **Components**: Risk heatmaps, VaR calculations, stress testing results

Follow the established patterns and ensure consistency with the existing demo structure.
```

#### **Industry-Specific Customization**  
```
@industry @databricks-expert.md Transform this retail template into a healthcare analytics demo:

1. **Data Model**: Replace product/customer data with patient/treatment data
2. **Visualizations**: Add clinical outcomes tracking, resource utilization, readmission rates
3. **Compliance**: Ensure HIPAA-appropriate demo data (no real patient information)
4. **Workflows**: Add care pathway analysis and treatment effectiveness metrics

Maintain the same technical architecture but adapt all content for healthcare use cases.
```

#### **Performance & Scale Optimization**
```
@databricks-platform.md @data-generation.md My demo needs to handle larger datasets and more concurrent users:

1. **Data Generation**: Scale from medium to large dataset size
2. **Query Optimization**: Add proper indexing and partitioning strategies  
3. **Caching**: Implement Redis or memory caching for frequent queries
4. **Real-time**: Add streaming data simulation for live dashboard updates

Optimize for presentation performance during high-stakes demos.
```

## 📁 Generated Project Structure

Your generated project will have this structure:

```
your_demo_project/
├── databricks.yml              # Asset bundle configuration
├── demo-requirements.md        # Your specific demo requirements
├── .databricksignore          # Files to exclude from bundle
├── .gitignore                 # Git ignore patterns
├── pyproject.toml             # Python dependencies
├── README.md                  # Project-specific documentation
├── 
├── resources/                 # Databricks resources
│   ├── job.yml               # Data generation job
│   └── app.yml               # Databricks App config
├── 
├── src/
│   ├── {project_name}/       # Python data generation
│   │   └── main.py          # PySpark synthetic data generation
│   └── app/                 # React Databricks App
│       ├── src/             # React source code
│       │   ├── components/  # UI components
│       │   ├── pages/       # Page components  
│       │   ├── config/      # Navigation & settings
│       │   └── lib/         # Utilities
│       ├── public/          # Static assets
│       ├── app.js           # Express.js server
│       ├── package.json     # Node.js dependencies
│       └── vite.config.js   # Build configuration
├── 
├── .cursor/
│   └── rules/               # AI development guidance
│       ├── demo-builder.md        # Main implementation guide
│       ├── databricks-apps.md     # App development rules
│       ├── react-styling.md       # UI/UX guidelines  
│       ├── data-generation.md     # Data modeling guide
│       ├── databricks-expert.md   # Platform best practices
│       └── databricks-platform.md # Infrastructure patterns
└── 
└── docs/                    # Additional documentation
    ├── cursor-usage.md      # Cursor AI usage examples
    └── databricks-patterns.md # Common implementation patterns
```

## 🎯 Best Practices for Demo Success

### 1. **Start with Clear Requirements**
Be specific in your `demo_description` when initializing the template. The more detail you provide, the better Cursor AI can assist with building your demo.

**❌ Vague**: "A dashboard for sales data"  
**✅ Specific**: "A retail executive dashboard showing real-time sales KPIs, customer segmentation analysis, inventory turnover metrics, and predictive demand forecasting with drill-down capabilities"

### 2. **Use Progressive Enhancement**
Start with the generated foundation and progressively add features:

```bash
# 1. Get basic demo working
databricks bundle deploy && databricks bundle run

# 2. Customize with Cursor AI
# Use @demo-requirements.md to add industry-specific features

# 3. Enhance with advanced features  
# Use @databricks-apps.md for complex integrations
```

### 3. **Leverage the Cursor AI Rules**
The template includes expert rules for different aspects:

- **@demo-builder.md** - Overall architecture and patterns
- **@databricks-apps.md** - App development and deployment  
- **@react-styling.md** - UI/UX and component development
- **@data-generation.md** - Data modeling and generation
- **@databricks-expert.md** - Platform-specific best practices

### 4. **Maintain Design Consistency**
The template uses a professional Databricks design system. When adding features, reference existing components and maintain the established patterns.

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### **Data Generation Fails**
```bash
# Check job logs
databricks jobs list
databricks jobs get-run <run-id>

# Common fixes
# 1. Verify warehouse_id is correct
# 2. Check Unity Catalog permissions  
# 3. Ensure serverless compute is available
```

#### **App Deployment Issues**
```bash
# Debug deployment
databricks apps list
databricks apps logs <app-name>

# Common fixes  
# 1. Check .databricksignore excludes node_modules
# 2. Verify package.json scripts are correct
# 3. Ensure Express.js server binds to 0.0.0.0
```

#### **Local Development Problems**
```bash
# Reset and reinstall
cd src/app
rm -rf node_modules package-lock.json
npm install
npm run start:dev
```

### Getting Help

1. **Use Cursor AI**: Reference the appropriate rule file (`@databricks-apps.md`, etc.)
2. **Check Generated Documentation**: Your project's `README.md` has project-specific guidance
3. **Review Demo Requirements**: `demo-requirements.md` contains your specific goals
4. **Databricks Documentation**: [Apps Documentation](https://docs.databricks.com/en/dev-tools/databricks-apps/index.html)

## 🤝 Contributing

This template is designed to evolve with the Databricks platform and community needs. When contributing:

1. **Test Template Generation**: Ensure changes work across different configuration options
2. **Update Cursor Rules**: Keep AI guidance current with best practices  
3. **Maintain Documentation**: Update this README and project documentation
4. **Follow Patterns**: Maintain consistency with existing architecture decisions

## 📄 License

This template is provided under the same license terms as Databricks examples and documentation.

---

**Ready to build amazing Databricks demos?** Start with `databricks bundle init` and let Cursor AI guide you to success! 🚀