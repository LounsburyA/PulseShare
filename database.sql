
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Database name is spinal_stim, otherwise update pool with new DB name
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255) UNIQUE NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "profiles" (
	"id" SERIAL PRIMARY KEY,
    "pronouns" VARCHAR (50) DEFAULT '',
	"profile_picture" VARCHAR (2000) DEFAULT '',
	"device" VARCHAR (255) DEFAULT '',
	"device_settings" VARCHAR (255) DEFAULT '',
	"injury_level" VARCHAR (1000) DEFAULT '',
	"aisa_level" VARCHAR (255) DEFAULT '',
	"time_since_injury" VARCHAR (255) DEFAULT '',
	"baseline" VARCHAR (1000) DEFAULT '',
	"improvements" VARCHAR (1000) DEFAULT '',
	"location" VARCHAR (255) DEFAULT '',
	"job_title" VARCHAR (255) DEFAULT '',
	"company" VARCHAR (255) DEFAULT '',
	"about_me" VARCHAR (2000) DEFAULT '',
	"contact" BOOLEAN DEFAULT FALSE,
	"public" INT DEFAULT 2,
	"biological_gender" VARCHAR (255) DEFAULT '',
	"age" VARCHAR (255) DEFAULT '',
	"height" VARCHAR (255) DEFAULT '',
	"weight" VARCHAR (255) DEFAULT '',
	"medical_conditions" VARCHAR (2000) DEFAULT '',
	"user_id" INT REFERENCES "user" ON DELETE CASCADE
);
	
CREATE TABLE "outcomes" (
	"id" SERIAL PRIMARY KEY,
	"outcome" VARCHAR (255)
);
		
CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"time" TIME DEFAULT NOW(),
	"title" VARCHAR (100) NOT NULL,
	"post" VARCHAR (2000) NOT NULL,
	"image" VARCHAR (2000),
	"video" VARCHAR (2000),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"outcome_id" INT REFERENCES "outcomes"
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"time" TIME DEFAULT NOW(),
	"comment" VARCHAR (2000) NOT NULL,
	"image" VARCHAR (2000),
	"video" VARCHAR (2000),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"post_id" INT REFERENCES "posts" ON DELETE CASCADE
);

INSERT INTO "outcomes" ("outcome")
VALUES ('Legs'), ('Arms'), ('Trunk/Core'), ('Sensation'), ('Blood Pressure'), ('Bladder'), ('Bowel'), ('Sexual Function'), 
('Sleep'), ('Spasticity'), ('Pain'), ('Proprioception/Spatial Awareness'), ('Cardiovascular'), ('Breathing'), ('Sweating'),
('Temperature Regulation'), ('Thinking/IQ'), ('Mood'), ('Other');

-- temp data
INSERT INTO "posts" ("date", "time", "title", "post", "user_id", "outcome_id")
VALUES ('05/06/2022', '15:00', 'Looking for a good setting for low blood ressure', 'Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 12, 1), 
('05/07/2022', '15:30', 'I reduced my leg pain with these settings', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 13, 2), 
('05/06/2022', '15:00', 'Trying to increase arm mobility', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 12, 3), 
('05/08/2022', '17:00', 'Tips for improving sensation?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 13, 4), ('05/010/2022', '21:00', 'Best pain relief settings?', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 12, 5);
