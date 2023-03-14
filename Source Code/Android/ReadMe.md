# Android Drawing Application

This is the main drawing application which will be used on the tablets during events.

## Purpose

The application has two main uses:
- To provide event visitors with the capability of creating simple drawings based on their
  perception of the National Marine Park.
- To allow event managers to collect these drawings and save them to a database which are later
  reviewed and scored.

## How it works

To use it the event manager first needs to create an event on the admin portal, then they just
need to enter the event ID when starting the application and all the drawings produced for that
event will be saved locally on the device.

At the end of the event, the event manager can then upload all the drawings to the remote
database using the same application.

## Implementation

### Architecture
The project follows the [MVVM architecture](https://www.digitalocean.com/community/tutorials/android-mvvm-design-pattern). The application is split into three main layers:
- Model - this layer contains the models and the logic of data sources and repositories.
- View - this layer contains the views
- ViewModel - this layer contains the logic that is responsible for loading data through
repositories and preparing them for the Views

### Tools & Technologies
The application is built using Android SDK and Java

#### Libraries Used
- [Room](https://developer.android.com/jetpack/androidx/releases/room)
- [Retrofit](https://square.github.io/retrofit/)
- [Android Navigation Component](https://developer.android.com/guide/navigation/navigation-getting-started)

### Drawing Storing

Because the application is likely to be used where there is no internet connection available
the drawings produced during events must be stored locally and then uploaded online once the
tablets are connected to the internet. When the drawings are uploaded to the remote database
they are deleted from the local database.

## Testing
The application is tested via Unit and Instrumentation testing, as well as some manual testing.