# Accessibility Dashboard - Pa11y

This is a clone of [Pa11y Dashboard](https://github.com/pa11y/pa11y-dashboard), but has been refactored with a cleaner code structure and uses [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/).

## Getting Started

To get started with the dashboard, you simply need to:

* Clone this repo
* Install the dependencies with `yarn`
* In your terminal, navigate to the repo and run `gulp dev` to build and watch the assets
* Open another tab in your terminal, navigate to the repo and run `npm run dev` to run the dashboard in development mode.
* Navigate to `localhost:4000` to see the dashboard.

## Development vs Production

In `development` mode you are able to add/delete URLs to the dashboard and manually run tasks against them.

In `production` mode you are unable to add/delete URLs and run any tasks.

The idea behind this is that when you push your dashboard up to production, it will run in `production` mode to prevent random visitors from messing up the dashboard by deleting URLs you have added etc.

## Configurations

The configurations for the Dashboard are the same as the in Pa11y docs. Look at the `development` JSON file in the repo for example usage.

* **port** - The port to run the application on
* **noindex** - When true, the dashboard will not be indexed by search engines
* **readonly** - When true, users will not be able to add, delete or run URLs
* **siteMessage** - Display

## Development Mode Config

The config for `development` mode is located in `_config/development.json` and is yours to edit how you see fit.

## Production Mode Config

All the configuration for `production` mode should be set up using environment variables on Heroku.

List of environment variables:

* `NOINDEX`
* `READONLY`

## MongoDB Setup

In order for the dashboard to work it has to connect to a MongoDB database where your URLs and tasks will be stored.

The setup for linking MongoDB to the dashboard is pretty straight forward. Rather than having to install MongoDB locally, There will be a MongoDB set up for each team using mLab, a cloud database service.

Once the MongoDB has been setup, all you need to do is point the dashboard to your MongoDB database. In `development` mode this can be done by changing the database path in `_config/development.json`. in `production` mode this can be set in using an environment variable on Heroku called `WEBSERVICE_DB`.

The path to your MongoDB database should look something like `mongodb://<dbuser>:<dbpassword>@ds125388.mlab.com:25388/<dbname>`.
