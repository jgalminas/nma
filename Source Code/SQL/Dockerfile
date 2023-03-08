FROM mcr.microsoft.com/mssql/server:2022-latest

WORKDIR /sql
COPY . .

ENV MSSQL_SA_PASSWORD=COMP2003!
ENV ACCEPT_EULA=Y

CMD /bin/bash ./entrypoint.sh