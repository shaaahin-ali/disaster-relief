import os

env_path = 'backend/.env'
if os.path.exists(env_path):
    with open(env_path, 'r') as f:
        content = f.read()
    
    # Fix database URL if truncated
    if 'DATABASE_URL=sqlite:///./di' in content and 'disaster.db' not in content:
        content = content.replace('DATABASE_URL=sqlite:///./di', 'DATABASE_URL=sqlite:///./disaster.db')
        print("Fixed DATABASE_URL")
    
    # Ensure it ends with a newline
    if not content.endswith('\n'):
        content += '\n'
        
    with open(env_path, 'w') as f:
        f.write(content)
    print(".env check/fix completed")
else:
    print(".env not found")
