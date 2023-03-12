for i in {1..60};
do
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P COMP2003! -d master -i init_db_query.sql
    if [ $? -eq 0 ]
    then
        echo "Database populated"
        break
    else
        sleep 1
    fi
done