# API

This part of the project implements a web API allowing programmatic access to the SQL database.

It is built in C# using the Entity Framework Core ORM and the ASP.NET web framework.

## Usage


The API can be run with the following:

```
docker-compose up api sql_db
```

The API is then accessible at `http://localhost:5233/api`, with the Swagger documentation at `/swagger/index.html`.

The API can be run locally with the following (making sure to still run the `sql_db` docker container):

```
dotnet run --project Implementation/API.csproj
```

## Tests

The API implements unit testing coverage using the MSTest framework. These can be run with:

```
dotnet test Tests/Test.csproj
```

## Architecture

The API follows an MVC architecture:

- Model: The `Models/` directory contains ORM datatypes.

- View: The `Controllers/` directory implements API endpoints, allowing access to the database records.

- Controller: the `Services/` directory contains classes for interfacing with with the database, including operations like get, create, update, and delete.