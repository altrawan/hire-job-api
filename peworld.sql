--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-18 22:19:35

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
-- TOC entry 211 (class 1259 OID 52165)
-- Name: experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experience (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
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
-- TOC entry 212 (class 1259 OID 52173)
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
-- TOC entry 210 (class 1259 OID 52156)
-- Name: portofolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portofolio (
    id character varying NOT NULL,
    user_id character varying(255) NOT NULL,
    app_name character varying(255) NOT NULL,
    link_repository character varying(255) NOT NULL,
    type_portofolio character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.portofolio OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 52148)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    company character varying(255),
    type character varying(255),
    job_desk character varying(255),
    job_status character varying(255),
    domisili character varying(255),
    description character varying(255),
    photo character varying(255),
    skills character varying(255),
    linkedin character varying(255),
    instagram character varying(255),
    github character varying(255),
    gitlab character varying(255),
    role integer,
    verify_token character varying(255),
    is_verified integer,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3328 (class 0 OID 52165)
-- Dependencies: 211
-- Data for Name: experience; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3329 (class 0 OID 52173)
-- Dependencies: 212
-- Data for Name: hire; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3327 (class 0 OID 52156)
-- Dependencies: 210
-- Data for Name: portofolio; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3326 (class 0 OID 52148)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3184 (class 2606 OID 52172)
-- Name: experience experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience
    ADD CONSTRAINT experience_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 52180)
-- Name: hire hire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hire
    ADD CONSTRAINT hire_pkey PRIMARY KEY (id);


--
-- TOC entry 3182 (class 2606 OID 52162)
-- Name: portofolio portofolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portofolio
    ADD CONSTRAINT portofolio_pkey PRIMARY KEY (id);


--
-- TOC entry 3180 (class 2606 OID 52154)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2022-05-18 22:19:39

--
-- PostgreSQL database dump complete
--

