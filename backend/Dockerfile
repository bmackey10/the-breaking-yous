# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV NLS_LANG=AMERICAN_AMERICA.AL32UTF8
ENV NLS_DATE_FORMAT="YYYY-MM-DD HH24:MI:SS"


# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN apt-get update && apt-get install -y libaio1 && \
    pip install --no-cache-dir -r requirements.txt

# Copy Oracle Instant Client files into the container
COPY xe /xe

# Set LD_LIBRARY_PATH to include the Oracle Instant Client directory
# Set Oracle Instant Client environment variables
ENV ORACLE_HOME /xe
ENV LD_LIBRARY_PATH $ORACLE_HOME/lib


#ENV LD_LIBRARY_PATH=xe/lib:$LD_LIBRARY_PATH

# Expose port 5000 to the outside world
EXPOSE 5000

# Define the command to run your Flask application
CMD ["python", "app.py"]
