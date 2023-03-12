FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /api
COPY . .
RUN dotnet restore './API.csproj' --disable-parallel
RUN dotnet publish './API.csproj' -o /published -c release --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS runtime
WORKDIR /api
COPY --from=build /published .
EXPOSE 5000
ENTRYPOINT ["dotnet", "API.dll"]