import subprocess
import os
import dotenv
dotenv.load_dotenv()

port = os.getenv('PORT', '5000')
if os.uname().sysname == 'Darwin':  # macOS
    subprocess.run(f"lsof -ti :{port} | xargs kill -9", shell=True)
elif os.uname().sysname == 'Linux':  # Assuming Ubuntu
    subprocess.run(['fuser', '-kvn', 'tcp', port])
else:
    print(f"OS {os.uname().sysname} is not supported for stopping the process on port {port}.")
