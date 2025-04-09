#seprator
import pandas as pd

# Load the Excel file (first sheet by default)
df = pd.read_excel('Copy of commands-classification-csv(1).xlsx', engine='openpyxl')

# Split the single column into id, command, and classification
split_data = df.iloc[:, 0].str.split(',', n=2, expand=True)
split_data.columns = ['id', 'command', 'classification']

# Save to cleaned CSV
split_data.to_csv('commands-classification-cleaned.csv', index=False)
