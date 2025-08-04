# Using Cursor AI with the Databricks Demo Factory Template

## 🎯 Overview

This template is designed to work seamlessly with Cursor AI to create sophisticated Databricks demos. The AI assistant will read the `demo-requirements.md` file and implement the demo based on your natural language description.

## 🚀 Quick Start

### 1. Initialize the Template
```bash
# Create a new demo project
mkdir my-retail-demo
cd my-retail-demo

# Copy the template files
cp -r template/* .

# Initialize with your demo requirements
# Edit demo-requirements.md with your specific requirements
```

### 2. Open in Cursor
```bash
cursor .
```

### 3. Let Cursor AI Build Your Demo
The AI will:
1. **Read** `demo-requirements.md` to understand your requirements
2. **Generate** industry-specific synthetic data
3. **Build** a professional React dashboard
4. **Implement** API endpoints and data connections
5. **Add** advanced features based on complexity level

## 📋 Writing Effective Demo Requirements

### Structure Your Requirements
```markdown
## 📋 Detailed Requirements
A comprehensive retail analytics platform showing customer behavior, inventory optimization, and sales forecasting. Include real-time transaction monitoring, customer segmentation with ML, and predictive analytics for demand planning. Create an executive dashboard with KPIs and drill-down capabilities.

## 🎨 Design Requirements
- Professional Databricks branding and design system
- Modern, executive-ready dashboard interface  
- Interactive visualizations with drill-down capabilities
- Responsive design optimized for presentations
- Real-time data updates and live metrics
```

### Be Specific About:
- **Industry focus** (retail, supply_chain, finance, etc.)
- **Key metrics** you want to showcase
- **Visualizations** needed (charts, maps, tables)
- **Interactivity** requirements (filters, drill-downs)
- **Advanced features** (OLTP, LLM agents, real-time updates)

## 🤖 Working with Cursor AI

### The AI Will Ask Questions
When you start implementation, the AI may ask clarifying questions:

```
I see you want a retail analytics platform. Let me implement this step by step:

1. First, I'll enhance the data generation with realistic retail data
2. Then build the dashboard with customer segmentation  
3. Add the real-time transaction monitoring
4. Implement the predictive analytics features
5. Create the executive KPI dashboard

Questions:
- Do you want geographic visualizations for store locations?
- Should I include inventory management features?
- What time period should the data cover?
```

### Provide Feedback
- **Clarify requirements** if the AI misunderstands
- **Suggest improvements** based on your needs
- **Ask for specific features** you want to see
- **Request modifications** to the implementation

### Example Interaction
```
User: "I want to add a customer lifetime value analysis section"

AI: "I'll add a CLV analysis component to the dashboard. This will include:
- Customer segmentation by value tiers
- CLV trend analysis over time
- Predictive CLV modeling
- Customer churn risk indicators

Should I also add customer acquisition cost analysis to complement the CLV metrics?"
```

## 🎨 Customizing the Implementation

### Data Generation
The AI will enhance `src/{project_name}/main.py` with:
- Industry-specific data schemas
- Realistic data distributions
- Proper referential integrity
- Scalable data volumes

### Dashboard Components
The AI will create:
- KPI cards with trends
- Interactive charts and visualizations
- Data tables with filtering
- Real-time update components

### API Endpoints
The AI will implement:
- Health check endpoints
- KPI data endpoints
- Chart data endpoints
- Real-time transaction endpoints (if OLTP)
- Chat endpoints (if advanced)

## 🔧 Advanced Customization

### Adding Custom Components
```jsx
// The AI can create custom components for your specific needs
function CustomAnalyticsCard({ data, title }) {
  return (
    <DatabricksCard
      title={title}
      value={formatValue(data.value)}
      trend={calculateTrend(data)}
      icon={AnalyticsIcon}
    />
  );
}
```

### Custom Data Queries
```python
# The AI can add custom data generation patterns
def generate_custom_metrics(spark):
    return spark.sql("""
        SELECT 
            customer_segment,
            AVG(lifetime_value) as avg_clv,
            COUNT(*) as customer_count
        FROM customers 
        GROUP BY customer_segment
    """)
```

## 🚀 Deployment Workflow

### 1. Data Generation
```bash
# The AI will set up the data generation job
databricks bundle run {project_name}_job --target dev
```

### 2. Dashboard Deployment
```bash
# The AI will configure the dashboard deployment
databricks bundle deploy --target dev
```

### 3. Testing
```bash
# Test the deployed dashboard
open https://your-workspace.cloud.databricks.com/apps/{project_name}_app
```

## 💡 Best Practices

### For Solution Architects:
1. **Be specific** in your requirements
2. **Include business context** in your descriptions
3. **Specify complexity level** (simple/standard/advanced)
4. **Mention key metrics** you want to showcase
5. **Describe the target audience** (executives, technical, etc.)

### For AI Implementation:
1. **Start with MVP** - basic dashboard first
2. **Iterate incrementally** - add features step by step
3. **Test thoroughly** - ensure all components work
4. **Optimize performance** - fast load times
5. **Polish presentation** - professional appearance

## 🎯 Success Criteria

A successful demo implementation should:
- ✅ **Load quickly** (< 3 seconds)
- ✅ **Look professional** (Databricks branding)
- ✅ **Tell a story** (clear business narrative)
- ✅ **Be interactive** (filters, drill-downs)
- ✅ **Show real value** (actionable insights)
- ✅ **Deploy easily** (5-minute setup)

## 🔄 Iteration Process

1. **Initial implementation** - AI builds based on requirements
2. **Review and feedback** - You provide input and suggestions
3. **Refinement** - AI improves based on feedback
4. **Testing** - Validate functionality and performance
5. **Deployment** - Deploy to Databricks workspace
6. **Presentation** - Use for customer demos

Remember: The AI is your partner in building amazing demos. The more specific and detailed your requirements, the better the final result will be! 