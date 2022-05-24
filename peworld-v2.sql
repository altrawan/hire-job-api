--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-24 04:14:08

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
-- TOC entry 214 (class 1259 OID 52202)
-- Name: portofolio_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portofolio_image (
    id character varying(255) NOT NULL,
    portofolio_id character varying(255) NOT NULL,
    image character varying(255)
);


ALTER TABLE public.portofolio_image OWNER TO postgres;

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
    name character varying(255) NOT NULL,
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

INSERT INTO public.experience (id, worker_id, company, "position", start_date, end_date, description, is_active, created_at, updated_at, deleted_at) VALUES ('0283bf3d-76e9-4709-b98c-9400b47cad6b', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'PT Harus Bisa', 'Web Developer', '2022-03-02', '2022-06-10', 'Lorem ipsum...', 1, '2022-05-20 13:41:03.862817', NULL, NULL);
INSERT INTO public.experience (id, worker_id, company, "position", start_date, end_date, description, is_active, created_at, updated_at, deleted_at) VALUES ('e9f254e5-518c-42c8-95ec-5fde8c1df3d4', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'PT Harus Bisa', 'Web Developer', '2022-03-02', '2022-06-10', 'Lorem ipsum...', 1, '2022-05-20 13:41:53.934653', NULL, NULL);
INSERT INTO public.experience (id, worker_id, company, "position", start_date, end_date, description, is_active, created_at, updated_at, deleted_at) VALUES ('d5f90835-e36c-4c78-a65e-1fbf52bdd752', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'PT Harus Bisa', 'Backend Developer', '2022-03-02', '2022-06-10', 'Lorem ipsum', 1, '2022-05-20 14:17:43.780977', '2022-05-20 14:19:36.579', NULL);
INSERT INTO public.experience (id, worker_id, company, "position", start_date, end_date, description, is_active, created_at, updated_at, deleted_at) VALUES ('78ab931d-554b-4970-bcbc-621ad2940ddd', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'PT Harus Bisa', 'Web Developer', '2022-03-02', '2022-06-10', 'Lorem ipsum...', 1, '2022-05-20 14:19:48.484253', NULL, NULL);


--
-- TOC entry 3354 (class 0 OID 52173)
-- Dependencies: 211
-- Data for Name: hire; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3356 (class 0 OID 52195)
-- Dependencies: 213
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('a5e14a03-ea72-42e7-a99c-9f5bad7ae6e9', '4a552468-4b6e-4abd-96ff-e551c55d4bf4', 'ranunadea@gmail.com', '$2b$10$OEPOsw2/MCIAXwbvHRTlR.BdDbvgSd83ArG.WMBDbf2N.DfCI.Kk.', 0, '611548f9332b01b65631278054d9d2ae41c8f644a57f0e506952c24154ed', 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('6394f464-a627-4d25-812d-182704de3c2a', '87e40b7f-429e-40de-8693-447bef0e4297', 'zonanime123@gmail.com', '$2b$10$Az2.AUpGt1PI/d/B16lMxu1nJuQcXrM4vomoBoZ79nNUNdY74W47i', 1, NULL, 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('c7dc699e-5dfc-4b63-ab05-dfe6d8c7bf24', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'masterprogrammer123@gmail.com', '$2b$10$bZXVJNfmDfEMxQH7FArfDeyaHihn6e/2WuFpP2TsLWMWh4svy3eg6', 0, NULL, 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('13edc04c-8ecf-4fb1-9c82-ef6ee1e53863', '87c62b3a-0c8e-4510-b3f1-3577c971c87a', 'rizkiselipratama@gmail.com', '$2b$10$V829cD8BiDG6iRvfzV6lXewAdPTClNIzDmCiwjRqd1ankqI.7vnkm', 0, '4d20a714327b61ce1d289189b41c93848e092b7127c4943915d85cb17422', 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('c655e849-5014-4469-b950-c6ada40320f1', '2d93bba9-3561-452f-86c8-3d7e12d93232', 'satriagw06@gmail.com', '$2b$10$xSXdBCOAg5nnEpwPcgSZBOpOeIy.oXfnatp.FnDwn1JhTIQRqyeAy', 0, '78939c738b746fb236247ac6304139795d24f2f276a0ab7c3bd204c2eb4e', 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('71aa39bb-5891-48ef-b736-f1b5e79299b9', 'c03e2344-bd44-48a9-883a-c0091f367467', 'kurdimanaryprasetia@gmail.com', '$2b$10$CeisFif7ACGG2R2kLh5Ya.cNkRLPEFKKqLtfO324kNcN9.EjsupnO', 0, '5c00c5fe8434addffbb98aed9119a865438c4531be1c2fdbc7633f37e361', 1, 1);
INSERT INTO public.login (id, user_id, email, password, role, verify_token, is_verified, is_active) VALUES ('73ba2454-8594-481c-a68c-befe25391a44', 'f2b62265-7465-4a4c-bdcb-dfe90d9fa392', 'ayisolahudin@gmail.com', '$2b$10$QOsfcJSo0xFcI2ik2vd/rewekAvX6T13ek9vW1cDN7plrDwYTkhsy', 0, '73d6bded2883f4c498cf5d931e625d17ac56f8c5e7bd90928f1f042eb285', 1, 1);


--
-- TOC entry 3352 (class 0 OID 52156)
-- Dependencies: 209
-- Data for Name: portofolio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('47dd490e-820b-4025-85af-8ee3a5561dad', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'Mama Recipe', 'github.com/altrawan/mama-recipe-app/', '1', 1, '2022-05-20 15:41:40.216542', NULL, NULL);
INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('7daf0ed6-1d23-4b75-bc36-78452172d70b', '9b5907fe-ea3a-45fb-ae34-879de3acd22c', 'Mama Recipe', 'github.com/altrawan/mama-recipe-app/', '1', 1, '2022-05-20 15:42:23.504726', NULL, NULL);
INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('b1876c3b-df9b-4378-88fd-93a271f8bbb7', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Mama Recipe.', 'github.com', '1', 1, '2022-05-20 17:06:51.722638', '2022-05-20 17:30:04.435', NULL);
INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('5a7f1436-5192-4635-9a42-971a34457d02', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Mama Recipe', 'github.com/altrawan/mama-recipe-app/', '1', 1, '2022-05-20 17:30:12.955839', NULL, NULL);
INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('91a43a9b-255b-4ae4-83cf-926485330247', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Mama Recipe.', 'github.com', '1', 1, '2022-05-20 17:28:21.578727', '2022-05-20 17:33:45.191', NULL);
INSERT INTO public.portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active, created_at, updated_at, deleted_at) VALUES ('ab92fbaa-20a9-4a4f-a1af-59bd373230d7', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Mama Recipe.', 'github.com', '1', 1, '2022-05-20 17:34:55.605921', '2022-05-20 17:37:12.975', NULL);


--
-- TOC entry 3357 (class 0 OID 52202)
-- Dependencies: 214
-- Data for Name: portofolio_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.portofolio_image (id, portofolio_id, image) VALUES ('53ab2544-b9a4-4e16-82b8-5dc817fa0070', '7daf0ed6-1d23-4b75-bc36-78452172d70b', '1653036143182.png');
INSERT INTO public.portofolio_image (id, portofolio_id, image) VALUES ('d26a8cd4-d478-493c-81b5-d11eff48c5f8', 'b1876c3b-df9b-4378-88fd-93a271f8bbb7', '1653041211390.png');
INSERT INTO public.portofolio_image (id, portofolio_id, image) VALUES ('d6f7362a-972c-4e00-a368-60257210ad1d', '91a43a9b-255b-4ae4-83cf-926485330247', '1653042501011.png');
INSERT INTO public.portofolio_image (id, portofolio_id, image) VALUES ('c61fbfd9-73ad-43fd-8f4c-a58a55f6c0b5', '5a7f1436-5192-4635-9a42-971a34457d02', '1653042612831.png');
INSERT INTO public.portofolio_image (id, portofolio_id, image) VALUES ('adaa9013-c354-4da1-8159-79c98ce866ad', 'ab92fbaa-20a9-4a4f-a1af-59bd373230d7', '1653042894484.png');


--
-- TOC entry 3359 (class 0 OID 52218)
-- Dependencies: 216
-- Data for Name: recruiter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recruiter (id, name, company, "position", phone_number, company_field, city, description, instagram, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('87e40b7f-429e-40de-8693-447bef0e4297', 'Zonanime', 'PT Maju Mundur', 'Staff HRD', '081282541621', NULL, NULL, NULL, NULL, NULL, 'profile-default.png', '2022-05-19 11:54:36.673327', NULL, NULL);


--
-- TOC entry 3355 (class 0 OID 52187)
-- Dependencies: 212
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.skills (id, worker_id, skill_name, is_active, created_at, updated_at, deleted_at) VALUES ('05c574da-c492-4ef3-8ff3-b97d7b68b96a', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Vue.js', 1, '2022-05-20 09:55:30.66756', NULL, NULL);
INSERT INTO public.skills (id, worker_id, skill_name, is_active, created_at, updated_at, deleted_at) VALUES ('1d6f362a-9f54-4f0e-8a21-f50dbf8fd506', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Angular.js', 1, '2022-05-20 09:55:30.702173', NULL, NULL);
INSERT INTO public.skills (id, worker_id, skill_name, is_active, created_at, updated_at, deleted_at) VALUES ('451c05df-13e7-4b8e-a524-d59183d6f8f0', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'CSS', 1, '2022-05-20 09:55:30.663755', NULL, NULL);
INSERT INTO public.skills (id, worker_id, skill_name, is_active, created_at, updated_at, deleted_at) VALUES ('ae7e400f-7445-4da8-93e7-514d356faefb', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'React', 1, '2022-05-20 09:55:30.665963', NULL, NULL);
INSERT INTO public.skills (id, worker_id, skill_name, is_active, created_at, updated_at, deleted_at) VALUES ('bbffa6ec-3202-45b9-9d78-f3dc0c394ce9', 'b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Javascript', 1, '2022-05-20 09:55:30.129525', NULL, NULL);


--
-- TOC entry 3358 (class 0 OID 52209)
-- Dependencies: 215
-- Data for Name: worker; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('f2b62265-7465-4a4c-bdcb-dfe90d9fa392', 'Ayi Solahudin', '084231236524', 'Dev Ops', 'Fulltime', 'Ciamis, Jawa Barat', NULL, NULL, '@ayisolahudin', '@ayisolahudin', '@ayisolahudin', NULL, 'profile-default.png', '2022-05-23 16:42:11.22372', NULL, NULL);
INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('2d93bba9-3561-452f-86c8-3d7e12d93232', 'Satria Gumelar Wibawa', '085241271234', 'Web Developer', 'Freelance', 'Bekasi, Jawa Barat', NULL, NULL, '@satriagw06', '@satriagw06', '@satriagw06', NULL, 'profile-default.png', '2022-05-23 16:41:06.861738', NULL, NULL);
INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('4a552468-4b6e-4abd-96ff-e551c55d4bf4', 'Ranu Nadea', '081725165232', 'Backend Developer', 'Freelance', 'Bandung, Jawa Barat', NULL, NULL, '@ranunadea', '@ranunadea', '@ranunadea', NULL, 'profile-default.png', '2022-05-23 16:42:40.528938', NULL, NULL);
INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('87c62b3a-0c8e-4510-b3f1-3577c971c87a', 'Rizki Seli Pratama', '081352127642', 'Frontend Developer', 'Fulltime', 'Bogor, Jawa Barat', NULL, NULL, '@riziselipratama', '@rizkiselipratama', '@rizkiselipratama', NULL, 'profile-default.png', '2022-05-23 16:40:13.832775', NULL, NULL);
INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('b91be4f4-7b1b-41b7-9c6d-05f7a8d4b89b', 'Master Programmer', '081241237153', 'Fullstack Developer', 'Fulltime', 'Jakarta Pusat, DKI Jakarta', NULL, NULL, '@masterprogrammer', '@masterprogrammer', '@masterprogrammer', NULL, 'profile-default.png', '2022-05-20 16:39:29.018284', NULL, NULL);
INSERT INTO public.worker (id, name, phone_number, job_desk, job_status, domicile, work_place, description, instagram, github, gitlab, linkedin, photo, created_at, updated_at, deleted_at) VALUES ('c03e2344-bd44-48a9-883a-c0091f367467', 'Kurdiman Ary Prasetiawa', '082316357613', 'UI/UX Designer', 'Fulltime', 'Tasikmalaya, Jawa Barat', NULL, NULL, '@kurdimanaryprasetia', '@kurdimanaryprasetia', '@kurdimanaryprasetia', NULL, 'profile-default.png', '2022-05-23 16:41:48.2979', NULL, NULL);


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
-- Name: portofolio_image images_portofolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portofolio_image
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


-- Completed on 2022-05-24 04:14:16

--
-- PostgreSQL database dump complete
--

