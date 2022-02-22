# TODO List

### About

This is a simple to-do list to practice building containers using Docker and Docker-Compose.

#### Used Structure:
- Database with *Mysql*
- Backend with *Flask* (python 3.9)
- Frontend with *React JS*

### Configuration

All services are configured with default values to use the system:
- MySQL user: `user`
- MySQL Password: `secret`
- MySQL Database: `todo`
- Backend Port: `5000`
- Frontend Port: `3000`

If you want to change any settings, just change the following files:
- `/config/db.env` to change *MySQL* configuration;
- `/config/back.env` and `/frontend/src/Connection/Server.js` to change *Backend* configuration;
- `docker-compose.yml` to change *Backend Port* and/or *Frontend Port*

#### Using:

```
   > docker-compose up
```
> The system'll start on `localhost:3000` by default.
