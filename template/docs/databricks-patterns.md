# Databricks Patterns & Best Practices

## 🏛️ Unity Catalog Standards

### Naming Conventions
```sql
-- Always use three-part naming
catalog.schema.table

-- Examples:
dev_retail_demo.customer_analytics.customers
dev_retail_demo.customer_analytics.transactions
dev_retail_demo.customer_analytics.products
```

### Catalog Structure
```
dev_{industry}_demo/
├── {project_name}/
│   ├── customers
│   ├── products
│   ├── transactions
│   └── views/
│       ├── customer_segments
│       ├── sales_trends
│       └── kpi_summary
```

### Permissions
```sql
-- Grant appropriate permissions
GRANT SELECT ON TABLE dev_retail_demo.customer_analytics.customers TO `analysts`;
GRANT SELECT ON TABLE dev_retail_demo.customer_analytics.transactions TO `analysts`;
GRANT ALL PRIVILEGES ON TABLE dev_retail_demo.customer_analytics.* TO `data_engineers`;
```

## 🔄 Asset Bundle Patterns

### Configuration Structure
```yaml
# databricks.yml
bundle:
  name: my_demo

targets:
  dev:
    default: true
    workspace:
      host: https://your-workspace.cloud.databricks.com
    resources:
      jobs:
        my_demo_job:
          name: my_demo_job
          tasks:
            - task_key: generate_data
              notebook_task:
                notebook_path: ./src/my_demo/main
                source: WORKSPACE
      apps:
        my_demo_app:
          name: my_demo_app
          type: web
          source: ./src/app
```

### Environment Variables
```yaml
# Use variables for environment-specific values
targets:
  dev:
    variables:
      catalog: dev_retail_demo
      warehouse_id: abc123def456
  prod:
    variables:
      catalog: prod_retail_demo
      warehouse_id: xyz789ghi012
```

## 📊 Data Generation Excellence

### Realistic Data Patterns
```python
# Use appropriate distributions for realistic data
customers_df = dg.DataGenerator(
    spark,
    rows=10000,
    partitions=4
).withColumn("income", "decimal(10,2)", 
             minValue=20000, maxValue=500000, 
             distribution="lognormal")  # Realistic income distribution
```

### Referential Integrity
```python
# Ensure foreign keys are valid
customer_ids = [row.customer_id for row in customers_df.select("customer_id").collect()]
transactions_df = dg.DataGenerator(
    spark,
    rows=50000,
    partitions=8
).withColumn("customer_id", "string", values=customer_ids)  # Use existing customer IDs
```

### Data Quality Checks
```python
def validate_data_quality(df, table_name):
    """Validate data quality for generated table"""
    total_rows = df.count()
    
    # Check for nulls in critical fields
    for column in ['customer_id', 'created_date']:
        null_count = df.filter(f"{column} IS NULL").count()
        if null_count > 0:
            print(f"Warning: {null_count} null values in {column}")
    
    # Check data types
    print(f"Schema for {table_name}:")
    df.printSchema()
    
    return df
```

## 🚀 Model Serving & Agents

### MLflow Model Registration
```python
# Register models with proper versioning
import mlflow

mlflow.set_tracking_uri("databricks")
mlflow.set_experiment("/Shared/retail_analytics")

with mlflow.start_run():
    # Train model
    model = train_model(training_data)
    
    # Log model
    mlflow.sklearn.log_model(
        model, 
        "customer_segmentation_model",
        registered_model_name="customer_segmentation"
    )
```

### Agent Framework Integration
```python
# Mosaic AI Agent Framework
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.vectorsearch import VectorSearchIndex

client = WorkspaceClient()

# Create vector search index for RAG
index = VectorSearchIndex(
    name="retail_knowledge_base",
    endpoint_name="retail_endpoint",
    source_table_name="dev_retail_demo.customer_analytics.knowledge_base"
)
```

## 🔒 Security & Governance

### Service Principals
```bash
# Create service principal for production
databricks service-principal create \
  --display-name "demo-factory-sp" \
  --workspace-id 123456789
```

### Secrets Management
```python
# Use Databricks secrets for credentials
from databricks.sdk import WorkspaceClient
import os

client = WorkspaceClient()

# Store secrets
client.secrets.put_secret(
    scope="demo-factory",
    key="database_password",
    string_value=os.environ["DB_PASSWORD"]
)

# Retrieve secrets
password = client.secrets.get_secret(
    scope="demo-factory",
    key="database_password"
)
```

### Audit Logging
```sql
-- Enable audit logging
ALTER CATALOG dev_retail_demo SET TBLPROPERTIES (
  'audit.enabled' = 'true',
  'audit.log.level' = 'INFO'
);
```

## ⚡ Performance Optimization

### Delta Lake Optimizations
```sql
-- Z-ordering for query performance
OPTIMIZE dev_retail_demo.customer_analytics.transactions
ZORDER BY (customer_id, transaction_date);

-- Vacuum to remove old files
VACUUM dev_retail_demo.customer_analytics.transactions
RETAIN 168 HOURS;
```

### Partitioning Strategy
```python
# Partition by date for time-series data
transactions_df.write \
    .format("delta") \
    .partitionBy("transaction_date") \
    .mode("overwrite") \
    .saveAsTable("dev_retail_demo.customer_analytics.transactions")
```

### Caching Strategy
```sql
-- Cache frequently accessed data
CACHE TABLE dev_retail_demo.customer_analytics.customer_segments;
CACHE TABLE dev_retail_demo.customer_analytics.kpi_summary;
```

## 🎯 Demo-Specific Patterns

### Real-time Data Integration
```python
# Lakebase OLTP integration
from databricks.connect import DatabricksConnect

client = DatabricksConnect()

# Real-time transaction processing
def process_transaction(transaction_data):
    # Insert into OLTP
    client.sql("""
        INSERT INTO lakebase.transactions 
        VALUES (?, ?, ?, ?)
    """, transaction_data)
    
    # Trigger real-time dashboard update
    broadcast_update('transaction_created', transaction_data)
```

### Interactive Dashboards
```javascript
// Real-time data updates
const eventSource = new EventSource('/api/events');
eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    updateDashboard(data);
};
```

### Predictive Analytics
```python
# ML model serving for predictions
def get_customer_predictions(customer_id):
    model_uri = "models:/customer_segmentation/Production"
    
    predictions = mlflow.pyfunc.load_model(model_uri).predict(
        get_customer_features(customer_id)
    )
    
    return predictions
```

## 📈 Monitoring & Observability

### Query Performance Monitoring
```sql
-- Monitor query performance
SELECT 
    query_text,
    execution_time,
    rows_produced,
    bytes_read
FROM system.query_history 
WHERE start_time > date_sub(current_date(), 7)
ORDER BY execution_time DESC;
```

### Data Quality Monitoring
```python
# Data quality checks
def monitor_data_quality():
    # Check for data freshness
    latest_data = spark.sql("""
        SELECT MAX(transaction_date) as latest_date
        FROM dev_retail_demo.customer_analytics.transactions
    """).collect()[0].latest_date
    
    # Alert if data is stale
    if latest_data < datetime.now() - timedelta(hours=1):
        send_alert("Data is stale")
```

### Model Performance Monitoring
```python
# Model performance tracking
def log_model_metrics(predictions, actuals):
    mlflow.log_metric("accuracy", accuracy_score(actuals, predictions))
    mlflow.log_metric("precision", precision_score(actuals, predictions))
    mlflow.log_metric("recall", recall_score(actuals, predictions))
```

## 🔄 CI/CD Patterns

### Automated Testing
```yaml
# .github/workflows/test.yml
name: Test Demo
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Data Quality Tests
        run: |
          databricks bundle run test_data_quality --target dev
      - name: Run Dashboard Tests
        run: |
          databricks bundle run test_dashboard --target dev
```

### Deployment Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Demo
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Dev
        run: |
          databricks bundle deploy --target dev
      - name: Deploy to Prod
        if: github.ref == 'refs/heads/main'
        run: |
          databricks bundle deploy --target prod
```

## 💡 Best Practices Summary

### Data Management
- ✅ Use Unity Catalog for governance
- ✅ Implement proper naming conventions
- ✅ Ensure referential integrity
- ✅ Monitor data quality
- ✅ Optimize for performance

### Security
- ✅ Use service principals for production
- ✅ Store secrets in Databricks secrets
- ✅ Enable audit logging
- ✅ Implement least-privilege access
- ✅ Follow data classification guidelines

### Performance
- ✅ Use Delta Lake optimizations
- ✅ Implement proper partitioning
- ✅ Cache frequently accessed data
- ✅ Monitor query performance
- ✅ Optimize Spark configurations

### Demo Quality
- ✅ Focus on visual impact
- ✅ Tell compelling business stories
- ✅ Enable interactive exploration
- ✅ Provide real-time insights
- ✅ Ensure professional presentation

Remember: These patterns ensure your demos are not only impressive but also follow Databricks best practices for production readiness. 