import pandas as pd

# Read the JSON file into a DataFrame
df = pd.read_json('pnl_productwise.json')

# Define the keys for which you want to print unique values
keys_to_print = ["itm", "primaryITM", "office", "name", "hireDate", "currency", "eclipseProductCode", 
                 "eclipseExchange", "contractType", "optionType", "hgProductID", "hgProductName", 
                 "hgExchange", "ttProductID", "ttProductCode", "assetClass", "subAssetClass"]

# Create an empty dictionary to store unique values for each key
unique_values = {}

# Iterate through each key and get unique values
for key in keys_to_print:
    unique_values[key] = df[key].unique()

# # Print the unique values for each key
# for key, values in unique_values.items():
#     print(f"Unique values for key '{key}': {values}")





def print_unique_ttProductCode_for_group(primaryITM_list, df):
    # Initialize a dictionary to store unique ttProductCode values for each primaryITM
    unique_ttProductCode_dict = {}
    unique_eclipeProductCode_dict = {}
    
    # Iterate over each primaryITM in the list
    for primaryITM in primaryITM_list:
        # Filter the DataFrame based on the current primaryITM
        filtered_df = df[df['primaryITM'] == primaryITM]
        
        # Get unique ttProductCode values for the current primaryITM
        unique_ttProductCode = filtered_df['ttProductCode'].unique()
        unique_eclipseProductCode = filtered_df['eclipseProductCode'].unique()
        
        # Store the unique ttProductCode values in the dictionary
        unique_ttProductCode_dict[primaryITM] = unique_ttProductCode
        unique_eclipeProductCode_dict[primaryITM] = unique_eclipseProductCode
    
    # Print unique ttProductCode values for each primaryITM
    for primaryITM, unique_ttProductCode in unique_ttProductCode_dict.items():
        print(f"Unique ttProductCode for primaryITM '{primaryITM}': {unique_ttProductCode}")
        print(f"Unique eclipseProductCode for primaryITM '{primaryITM}': {unique_eclipeProductCode_dict[primaryITM]}")


# Specify the group of primaryITM for which you want to print unique ttProductCode
primaryITM_group_to_print = ['ALR', 'NSH', 'ACY', 'NSY' ,'NDE', 'SFY']

# Call the function to print unique ttProductCode for the specified group of primaryITM
print_unique_ttProductCode_for_group(primaryITM_group_to_print, df)




# def filter_and_select_data(start_date, end_date, primaryITM, df):
#     # Convert start_date and end_date to datetime objects
#     start_date = pd.to_datetime(start_date)
#     end_date = pd.to_datetime(end_date)
    
#     # Convert the 'reportDate' column to datetime format
#     df['reportDate'] = pd.to_datetime(df['reportDate'])
    
#     # Filter the DataFrame based on the specified range of dates and primaryITM
#     filtered_df = df[(df['reportDate'] >= start_date) & (df['reportDate'] <= end_date) & (df['primaryITM'] == primaryITM)]
    
#     # Select only the desired columns
#     selected_columns = ["reportDate","name","ttProductCode","currency","commission", "grossPnL", "netPnL", "realisedPnL"]
#     filtered_and_selected_df = filtered_df[selected_columns]
    
#     return filtered_and_selected_df



# # Define the parameters
# start_date = '2023-03-01'
# end_date = '2024-03-31'
# primaryITM = 'SFY'

# # Call the function to filter and select data
# filtered_and_selected_data = filter_and_select_data(start_date, end_date, primaryITM, df)

# # # Print the filtered and selected data
# # print(filtered_and_selected_data)
# # # Define the filename for the Excel file
# excel_filename = 'filtered_data.xlsx'
# # Write the filtered and selected data to an Excel file
# filtered_and_selected_data.to_excel(excel_filename, index=False)





