--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-19 09:39:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 52165)
-- Name: experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experience (
    id character varying(255) NOT NULL,
    worker_id character varying(255) NOT NULL,
    company character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    description character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.experience OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 52173)
-- Name: hire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hire (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    message_destination character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.hire OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 52202)
-- Name: image_portofolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_portofolio (
    id character varying(255) NOT NULL,
    portofolio_id character varying(255) NOT NULL,
    image character varying(255)
);


ALTER TABLE public.image_portofolio OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 52195)
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role integer NOT NULL,
    verify_token character varying(255),
    is_verified integer,
    is_active integer
);


ALTER TABLE public.login OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 52156)
-- Name: portofolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portofolio (
    id character varying NOT NULL,
    worker_id character varying(255) NOT NULL,
    app_name character varying(255) NOT NULL,
    link_repository character varying(255) NOT NULL,
    type_portofolio character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.portofolio OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 52218)
-- Name: recruiter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recruiter (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    company character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    phone_number character varying(50) NOT NULL,
    company_field character varying(255),
    city character varying(255),
    description character varying(255),
    instagram character varying(255),
    linkedin character varying(255),
    photo character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.recruiter OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 52187)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id character varying(255) NOT NULL,
    worker_id character varying(255) NOT NULL,
    skill_name character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 52209)
-- Name: worker; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.worker (
    id character varying(255) NOT NULL,
    nama character varying(255) NOT NULL,
    phone_number character varying(50) NOT NULL,
    job_desk character varying(255),
    job_status character varying(255),
    domicile character varying(255),
    work_place character varying(255),
    description character varying(255),
    instagram character varying(255),
    github character varying(255),
    gitlab character varying(255),
    linkedin character varying(255),
    photo character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.worker OWNER TO postgres;

--
-- TOC entry 3353 (class 0 OID 52165)
-- Dependencies: 210
-- Data for Name: experience; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3354 (class 0 OID 52173)
-- Dependencies: 211
-- Data for Name: hire; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3357 (class 0 OID 52202)
-- Dependencies: 214
-- Data for Name: image_portofolio; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3356 (class 0 OID 52195)
-- Dependencies: 213
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3352 (class 0 OID 52156)
-- Dependencies: 209
-- Data for Name: portofolio; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3359 (class 0 OID 52218)
-- Dependencies: 216
-- Data for Name: recruiter; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3355 (class 0 OID 52187)
-- Dependencies: 212
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3358 (class 0 OID 52209)
-- Dependencies: 215
-- Data for Name: worker; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3200 (class 2606 OID 52172)
-- Name: experience experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience
    ADD CONSTRAINT experience_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 52180)
-- Name: hire hire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hire
    ADD CONSTRAINT hire_pkey PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 52208)
-- Name: image_portofolio images_portofolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_portofolio
    ADD CONSTRAINT images_portofolio_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 52201)
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 52162)
-- Name: portofolio portofolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portofolio
    ADD CONSTRAINT portofolio_pkey PRIMARY KEY (id);


--
-- TOC entry 3212 (class 2606 OID 52225)
-- Name: recruiter recruiter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 52194)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 52216)
-- Name: worker worker_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_pkey PRIMARY KEY (id);


-- Completed on 2022-05-19 09:39:47

--
-- PostgreSQL database dump complete
--

