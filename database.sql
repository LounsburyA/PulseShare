
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
	"injury_level" VARCHAR (255) DEFAULT '',
	"aisa_level" VARCHAR (255) DEFAULT '',
	"time_since_injury" VARCHAR (255) DEFAULT '',
	"baseline" VARCHAR (255) DEFAULT '',
	"improvements" VARCHAR (255) DEFAULT '',
	"location" VARCHAR (255) DEFAULT '',
	"job_title" VARCHAR (255) DEFAULT '',
	"company" VARCHAR (255) DEFAULT '',
	"about_me" VARCHAR (255) DEFAULT '',
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
	"title" VARCHAR (100),
	"post" VARCHAR (2000),
	"media" VARCHAR (2000),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"outcome_id" INT REFERENCES "outcomes"
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"time" TIME DEFAULT NOW(),
	"comment" VARCHAR (300),
	"media" VARCHAR (2000),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"post_id" INT REFERENCES "posts" ON DELETE CASCADE
);