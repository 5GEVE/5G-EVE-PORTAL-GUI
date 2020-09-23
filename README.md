# EveCatalogueGui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Environment setup

### Install nodejs

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v

```

### Install Angular CLI

```
sudo npm install -g @angular/cli
```

### Install Angular Material & hammerjs

```
npm install --save @angular/material @angular/cdk @angular/animations
npm install --save hammerjs
```

## Development server (starting the application)

Run `cd eve-catalogue-gui`.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
Run `ng serve --open` for a dev server and opening the default browser.
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# 5GEVE Portal Catalogue 

Catalogue capable of storing and  versioning:

- Vertical Service Blueprints (VSBs)
- Context Blueprints (CBs)
- Testcase Blueprints (TCBs)
- Experiment Blueprints and Descriptors (ExpBs and ExpDs)

## Getting Started

### Prerequisites

* [Oracle-Java8] - Oracle version 8 is preferred, otherwise [OpenJDK-8] + [OpenJFX]
* [Maven] - version 3.3.9 is required
* [PostgresSQL] - as internal DB 


### Used Libraries (should be manually installed)

| Lib | REPOSITORY |
| ------ | ------ |
| NFV IFA LIBS -- feat-librefactor -- | [README](https://github.com/nextworks-it/nfv-ifa-libs/tree/feat-librefactor) |
| SLICER IDENTITY MANAGEMENT | [README](https://github.com/nextworks-it/slicer-identity-mgmt) |


### Configuration
For properly configuring the 5GEVE Portal Catalogue, the [application.properties](https://github.com/nextworks-it/slicer-catalogue/blob/5geve-release/EVE_CATALOGUE_APP/src/main/resources/application.properties) file has to be modified according to the environment where the catalogue is deployed. See instructions at [HOWTOCONFIGURE](https://github.com/nextworks-it/slicer-catalogue/blob/5geve-release/HOWTOCONFIGURE.md

### Installing
In the root folder of the repository:
```
$ mvn clean install 
```

### Running

In the root folder of the repository run the 5GEVE Portal application:

```
$ java -jar EVE_CATALOGUE_APP/target/EveCatalogueApp-0.0.2-SNAPSHOT.jar
```

## Versioning

For the versions available, see tags on this repository. 

## Authors

**Giada Landi**, **Juan Brenes**, **Francesca Moscatelli**. **Pietro Giardina**, **Gino Carrozzo**   [Nextworks S.r.l.](http://www.nextworks.it)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

