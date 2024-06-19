Построение Rest API с Express

1. В папке с проектом присутствует коллекция Postman с "ручками" для данного проекта - Custom API.postman_collection.json
2. Дополнительно, ради интереса, произведена попытка реализовать шифрование паролей при регистрации с помощью bcrypt.
3. Также попытка сделать сессии с помощью токенов и библиотеки JWT.
4. В проекте используется следующее:

```json
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.12.0",
    "pg-pool": "^3.6.2"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/body-parser": "^1.19.5",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.14.5",
    "@types/pg": "^8.11.6",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }
```

5. Локально развернута PostgreSQL, созданы таблички users, tasks, task_ratings, comments.

```sql
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
)

CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    input_example text COLLATE pg_catalog."default",
    output_example text COLLATE pg_catalog."default",
    difficulty character varying(50) COLLATE pg_catalog."default",
    tags text[] COLLATE pg_catalog."default",
    additional_materials text[] COLLATE pg_catalog."default",
    created_by integer,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.task_ratings
(
    id integer NOT NULL DEFAULT nextval('task_ratings_id_seq'::regclass),
    task_id integer,
    user_id integer,
    rating integer,
    CONSTRAINT task_ratings_pkey PRIMARY KEY (id),
    CONSTRAINT task_ratings_task_id_fkey FOREIGN KEY (task_id)
        REFERENCES public.tasks (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT task_ratings_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT task_ratings_rating_check CHECK (rating >= 1 AND rating <= 5)
)

CREATE TABLE IF NOT EXISTS public.comments
(
    id integer NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    content text COLLATE pg_catalog."default" NOT NULL,
    task_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_task_id_fkey FOREIGN KEY (task_id)
        REFERENCES public.tasks (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
```
