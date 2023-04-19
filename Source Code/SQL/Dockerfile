FROM mcr.microsoft.com/mssql/server:2022-latest

WORKDIR /sql
COPY . .

ENV MSSQL_SA_PASSWORD=COMP2003!
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Express

CMD /bin/bash ./entrypoint.sh