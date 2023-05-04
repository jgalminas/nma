# Marine Aquarium Drawing Application

## Project Vision 

An intuitive drawing application which allows users to sketch their perception of what the National Marine Park is. The application will likely be used unsupervised and by people of various ages, therefore, it must have a simple interface and be easy to use.

### Scope 

A simple drawing application which works on various devices and input methods (touch, mouse). The application should contain a small selection of brushes (pen, pencil, crayon), colours and brush sizes.


### Out of Scope 

Features such as layers, rotating the drawing, colour gradients and a wide range of brushes are out of the scope of this project.

## System Structure

<p align="center">
  <img src="https://user-images.githubusercontent.com/63853949/235922311-cd8747a1-aead-4639-936a-cbaeb708b769.png" alt="System Component Diagram">
</p>

More information regarding each part of the project can be found in their repective Read Mes which are located in the root of the project folder.

### Web Drawing Application

The [web drawing application](/Source%20Code/Web%Drawing/) is a simple drawing application which would have been embedded within the National Marine Aquarium's website, however, development on it had to be paused due to the lack of time.

#### Languages, Tools & Frameworks

- TypeScript
- React
- Tailwind

### Admin Portal Application

The [admin portal application](/Source%20Code/Admin/) is a desktop application which acts a simple interface between the database and the user. It provides the ability to manage the project's data and score drawings produced by the drawing applications.

#### Languages, Tools & Frameworks

- TypeScript
- React
- Tailwind
- Electron

### Android Drawing Application

The [Android drawing application](/Source%20Code/Android/) is a native appliation built for older tablet devices. It provides a simple drawing interface and the capability to store them locally before uploading to the database for when they are used without internet connection.

#### Languages, Tools & Frameworks

- Java
- Android SDK

### Back-end

The back-end of this project consists of an [ASP.NET web service](/Source%20Code/API/) application and an [SQL Express database](/Source%20Code/SQL/).

#### Languages, Tools & Frameworks

- C#
- ASP.NET Core
- MS SQL

## Development Process

The project was developed incrementally following the Agile software development life cycle. Features were delivered in two week sprints.

The project backlog can be found [here](https://trello.com/b/fvRdA3Hu/group-project-plan).

### Project Documentation

All documentation related to this project can be found in the ["Project Docs"](/Project%20Docs/) folder.

This includes:

- Project Plan
- UML Diagrams
- Testing Documentation
- Research Documents

## Prototypes

- [Web prototype](https://ma-drawing.netlify.app/)
- [Prototype Video](https://youtu.be/kRf5EZ9j0PA)
