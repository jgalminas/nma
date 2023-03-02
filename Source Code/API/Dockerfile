
# prod config
# FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
# WORKDIR /api
# COPY . .
# RUN dotnet restore --disable-parallel
# RUN dotnet publish -o /published -c release --no-restore

# FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS runtime
# WORKDIR /api
# COPY --from=build /published /api
# EXPOSE 5000
# ENTRYPOINT [ "dotnet", "API.dll" ]


FROM mcr.microsoft.com/dotnet/sdk:6.0

ENV DOTNET_USE_POLLING_FILE_WATCHER 1

WORKDIR /api
COPY . .
ENTRYPOINT dotnet watch run --urls http://0.0.0.0:80