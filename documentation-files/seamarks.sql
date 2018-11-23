--get to know the data
SELECT "seamark:type", count(*)
FROM planet_osm_polygon
GROUP BY "seamark:type"
ORDER BY "seamark:type";

SELECT "seamark:type", count(*)
FROM planet_osm_line
GROUP BY "seamark:type"
ORDER BY "seamark:type";

SELECT "seamark:type", count(*)
FROM planet_osm_point
GROUP BY "seamark:type"
ORDER BY "seamark:type";
------------------------------------------

create index index_polygons_on_seamark_type on planet_osm_polygon("seamark:type");
create index index_points_on_seamark_type on planet_osm_point("seamark:type");
create index index_lines_on_seamark_type on planet_osm_line("seamark:type");

create index index_polygons_on_natural on planet_osm_polygon("natural");
create index index_lines_on_natural on planet_osm_line("natural");

create index index_point_on_way on planet_osm_point USING GIST (way);
create index index_line_on_way on planet_osm_line USING GIST (way);
create index index_polygon_on_way on planet_osm_polygon USING GIST (way);

--HARBOURS
WITH harbour_with_facilities AS (
	WITH harbours AS (
		SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_Transform(ST_Buffer(ST_Transform(way, 4326)::geography, 100)::geometry, 3857) AS way
		FROM planet_osm_polygon
		WHERE "seamark:type" = 'harbour'
		UNION
		SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_Transform(ST_Buffer(ST_Transform(way, 4326)::geography, 100)::geometry, 3857) AS way
		FROM planet_osm_point
		WHERE "seamark:type" = 'harbour'
	), facilities AS (
		SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way
		FROM planet_osm_point
		WHERE "seamark:type" = 'small_craft_facility'
		UNION
		SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way
		FROM planet_osm_line
		WHERE "seamark:type" = 'small_craft_facility'
		UNION
		SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way
		FROM planet_osm_polygon
		WHERE "seamark:type" = 'small_craft_facility'
	)
	SELECT h."osm_id", h."seamark:type", h."seamark:name", h."seamark:harbour:category", h."name", h.way, string_agg(distinct "seamark:small_craft_facility:category", ';') AS harbourFacilities
	FROM harbours AS h
	LEFT JOIN facilities AS f
	ON ST_Contains(h.way, f.way) 
	GROUP BY h."osm_id", h."seamark:type", h."seamark:name", h."seamark:harbour:category", h."name", h.way
)
SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_Transform(ST_Centroid(way), 4326), harbourFacilities
FROM harbour_with_facilities
WHERE 
	(
		harbourFacilities LIKE all(array[
			'%toilets%'
			--'%showers%', 
			--'%electricity%', 
			--'%fuel_station%',
			--'%chandler%',
			--'%laundrette%',
			--'%boatyard%',
			--'%slipway%',
			--'%boat_hoist%'
			--'%visitor_berth%',
			])
	);
----------------------------------------------------------------

--COVES
--ANCHORAGES
WITH pos AS (
	SELECT ST_SetSRID(ST_MakePoint(13.9403774, 44.7759001004881), 4326)::geography AS pos
)
SELECT osm_id, "seamark:type", "seamark:name", "seamark:anchorage:category", ST_AsGeoJSON(ST_Transform(way, 4326)) AS geojson, 
	ST_Distance(pos.pos, ST_Transform(way, 4326)) 
FROM planet_osm_point, pos
WHERE "seamark:type" = 'anchorage' AND 
	ST_DWithin(ST_Transform(way, 4326), pos.pos, 40000);
																									   
--CABLES, PIPELINES																									  
WITH pos AS (
	SELECT ST_SetSRID(ST_MakePoint(13.9403774, 44.7759001004881), 4326)::geography AS pos
)
SELECT osm_id, "seamark:type", "seamark:name", ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson
	 , ST_Distance(pos.pos, ST_Transform(way, 4326)), ST_Transform(way, 4326)
FROM planet_osm_line, pos
WHERE "seamark:type" = 'pipeline_submarine' OR "seamark:type" = 'cable_submarine' AND 
	ST_DWithin(ST_Transform(way, 4326), pos.pos, 4000);
																		 
--MOORINGS
WITH pos AS (
	SELECT ST_SetSRID(ST_MakePoint(13.9403774, 44.7759001004881), 4326)::geography AS pos
)
SELECT osm_id, "seamark:type", "seamark:name", ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson, 
	ST_Distance(pos.pos, ST_Transform(way, 4326)) 
FROM planet_osm_point, pos pos
WHERE "seamark:type" = 'mooring' AND 
	ST_DWithin(ST_Transform(way, 4326), pos.pos, 36491);
--------------------------------------------------
																									  																			  
--DANGERS
--isolated dangers
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		1000)::geometry, 3857) AS buffer
)
SELECT osm_id, "seamark:type", "seamark:name", "seamark:light:height", "seamark:light:colour", "seamark:light:range", "seamark:light:group", "seamark:light:period", ST_AsGeoJSON(way, 4326)
FROM planet_osm_point, buffer bu
WHERE "seamark:type" like '%_isolated_danger' AND ST_Intersects(bu.buffer, way);

-- lateral signs
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		1000)::geometry, 3857) AS buffer
)
SELECT osm_id, "seamark:type", "seamark:name", "seamark:light:colour", "seamark:light:range", "seamark:light:group", "seamark:light:period", ST_AsGeoJSON(way, 4326)
FROM planet_osm_point, buffer bu
WHERE "seamark:type" LIKE '%_lateral' AND ST_Intersects(bu.buffer, way);

--wreck
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		1000)::geometry, 3857) AS buffer
)
SELECT osm_id,  name, "seamark:type", "seamark:name", "seamark:wreck:category", "sport", ST_AsGeoJSON(way, 4326)
FROM planet_osm_point, buffer bu
WHERE "seamark:type" = 'wreck' AND ST_Intersects(bu.buffer, way);

--rock
WITH rocks AS (
	SELECT osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", way, ST_AsGeoJSON(ST_Transform(way, 4326)) as center
	FROM planet_osm_point
	WHERE "seamark:type" = 'rock'
	UNION
	SELECT osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", way, ST_AsGeoJSON(ST_Transform(ST_Centroid(way), 4326)) as center
	FROM planet_osm_line
	WHERE "seamark:type" = 'rock'
), buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		10000)::geometry, 3857) AS buffer
)
SELECT  osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", center
FROM rocks, buffer bu
WHERE ST_Intersects(bu.buffer, way);

--cardinal signs --beacon_cardinal:category?
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		1000)::geometry, 3857) AS buffer
)
SELECT 
	osm_id, "seamark:type", "seamark:name", "seamark:buoy_cardinal:category", 
	"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", 
	ST_AsGeoJSON(way, 4326), way
FROM planet_osm_point, buffer bu
WHERE "seamark:type" like '%_cardinal' AND ST_Intersects(bu.buffer, way);

--lateral
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		10000)::geometry, 3857) AS buffer
)
SELECT 
	osm_id, "seamark:type", "seamark:name",
	"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", 
	ST_AsGeoJSON(way, 4326)
FROM planet_osm_point, buffer bu
WHERE "seamark:type" like '%_lateral' AND ST_Intersects(bu.buffer, way);

--special purpose
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		10000)::geometry, 3857) AS buffer
)
SELECT 
	osm_id, "seamark:type", "seamark:name", 
	"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", 
	ST_AsGeoJSON(way, 4326)
FROM planet_osm_point, buffer bu
WHERE "seamark:type" like '%_special_purpose' AND ST_Intersects(bu.buffer, way);

--lights
WITH buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		1000)::geometry, 3857) AS buffer
)
SELECT 
	osm_id, "seamark:type", "seamark:name",
	"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", 
	"seamark:light:sector_start", "seamark:light:sector_end", "seamark:light:category", "seamark:light:visibility", "seamark:light:exhibition", 
	ST_AsGeoJSON(way, 4326), ST_Transform(way,4326)
FROM planet_osm_point p, buffer bu
WHERE "seamark:type" like 'light_%' AND ST_Intersects(bu.buffer, way);
																								 
--coastlines
WITH coastlines AS (
	SELECT osm_id, "natural", way
	FROM planet_osm_line
	WHERE "natural" = 'coastline'
	UNION
	SELECT osm_id, "natural", way
	FROM planet_osm_polygon
	WHERE "natural" = 'coastline'
), buffer AS (
	SELECT ST_Transform(ST_Buffer(
		ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[13.9403774,44.7759001004881],[16.4306572,43.5313993005418]]}')::geography,
		50)::geometry, 3857) AS buffer
)
SELECT cl.osm_id, cl."natural", ST_AsGeoJSON(ST_Transform(ST_Intersection(cl.way, bu.buffer), 4326)) as geojson, way
FROM coastlines AS cl, buffer AS bu
WHERE ST_Intersects(cl.way, buffer);


