# How to run project

1. clone project
2. install node modules in `pdt-marinehelper-client` and `pdt-marinehelper-server` folders
3. go to [OSM](https://www.openstreetmap.org/) select and download some coastal area (e.g. croatia)
4. prepare PostgreSQL database: install [PostGIS extension](http://postgis.net/install/) and create database with name `gis`
5. install [osm2pgsql](http://wiki.openstreetmap.org/wiki/Osm2pgsql) tool
6. run `osm2pgsql -m -d gis -U postgres -H localhost map.osm --keep-coastlines ` with configurations from `osm2pgsql` folder
7. run `npm start` in server folder
8. run `npm start` in client folder
