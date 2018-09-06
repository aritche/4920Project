First, install npm (Google how)

Run: pip install virtualenv
Run: source venv/bin/activate

Run: ./run

If you encounter this python error: socket.error: [Errno 98] Address already in use
Then run: lsof -i :8080
to determine which processes are running.
Then run: kill XXXX
where XXXX is the process id (PID) for each process found using the lsof command.

Then run again: ./run
